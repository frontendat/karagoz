# Karagöz Docs

This is the (nuxt-based)[https://nuxt.com/docs/getting-started/introduction] documentation site for Karagöz - the interactive code demonstration and education tools.

To view the documentation, please head to [karagoz.dev](https://karagoz.dev).

## WebContainer Specific Configuration

To be able to work with WebContainer locally, crossOriginIsolated must enabled in the browser. 
For that to happen, the following is needed:

Generate a certificate:

```bash
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

Use it in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  devServer: {
    https: import.meta.dev
      ? {
        key: fs.readFileSync(
          path.resolve(__dirname, 'localhost.key'),
          'utf-8',
        ),
        cert: fs.readFileSync(
          path.resolve(__dirname, 'localhost.crt'),
          'utf-8',
        ),
      }
      : {},
  },
})
```

Configure the headers needed by the WebContainer API:

```typescript
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '**': {
        headers: {
          'Cross-Origin-Embedder-Policy': 'require-corp',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      },
    },
  },
})
```

To be able to use Nuxt DevTools, additional configuration is needed:

```typescript
export default defineNuxtConfig({
  hooks: {
    // This helped enable crossOriginIsolated for the WebContainer API and get Nuxt DevTools working simultaneously
    'vite:serverCreated': (server) => {
      server.middlewares.use((_req, res, next) => {
        res.setHeader('Cross-Origin-Resource-Policy', 'same-origin')
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
        res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000')
        next()
      })
    },
  },
})
```

## Commands

### Setup

Make sure to install the dependencies:

```bash
pnpm install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

### Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```
