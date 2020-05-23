const core = require("@actions/core")
const github = require("@actions/github")
const axios = require("axios")

const sleep = (seconds) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000))

async function waitForUrl(url) {
  while (true) {
    try {
      await axios.get(url)
      return
    } catch (e) {
      console.log("Url unavailable, retrying...")
      await sleep(2)
    }
  }
}

async function waitForTimeout(url, timeout) {
  await sleep(timeout)
  throw new Error(`Timeout reached: Unable to connect to ${url}`)
}

;(async () => {
  try {
    console.log(github.context.payload)

    const commit = github.context.payload.head
    const siteName = core.getInput("site_name", { required: true })

    const url = `https://${commit}--${siteName}.netlify.com`
    console.log(`Waiting for a 200 from: ${url}`)
    core.setOutput("url", url)

    await Promise.race([
      waitForUrl(url),
      waitForTimeout(url, +core.getInput("max_timeout") || 60),
    ])
  } catch (err) {
    core.setFailed(err.message)
  }
})()
