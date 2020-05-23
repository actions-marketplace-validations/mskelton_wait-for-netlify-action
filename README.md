# Wait for Netlify Action ⏱

> GitHub Action to wait for a Netlify Preview Deployment.

## Options

### `site_name`

**Required** The name of the Netlify site to reach `https://{site_name}.netlify.com`

### `max_timeout`

Optional — The amount of time to spend waiting on Netlify. Defaults to `60` seconds

## Outputs

### `url`

The netlify deploy preview url that was deployed.

## Usage

Basic:

```yaml
steps:
  - name: Wait for Netlify Deploy
    uses: mskelton/wait-for-netlify-action@v1
    with:
      site_name: YOUR_SITE_NAME
```

Use the deploy url in another step:

```yaml
steps:
  - name: Waiting for Netlify deploy
    uses: mskelton/wait-for-netlify-action@v1
    id: wait-for-netflify
    with:
      site_name: YOUR_SITE_NAME
  - run: npm test
    env:
      DEPLOY_URL: ${{ steps.wait-for-netflify.outputs.url }}
```
