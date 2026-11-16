# Kernstra PDF Web SDK: Vue example

View, annotate, edit and fill PDFs in a Vue app with the
[Kernstra PDF Web SDK](https://kernstra.com/web-sdk) (`@kernstra/pdf-web-sdk` on npm). The document is rendered and changed entirely in
the browser; nothing you open leaves it.

New to the SDK? The [get-started guide](https://kernstra.com/web-sdk/get-started) goes from
`npm install` to a first PDF, and the [playground](https://kernstra.com/playground) opens your own
PDF without installing anything.

<p>
  <img src="screenshots/landing.png" width="49%" alt="The Vue example's landing page: the Kernstra and Vue logos above a drop zone for a PDF">
  <img src="screenshots/viewer.png" width="49%" alt="A PDF open in the Kernstra PDF Web SDK viewer inside the Vue example, with the bar toolbar and page thumbnails">
</p>

Built with Vue 3.5 and Vite 8.

## What it shows

- Starting the SDK once, from one module (`src/lib/kernstra.ts`)
- A Kernstra-branded landing page that takes a PDF from the file picker or a drop; the file stays in the browser
- A `DocumentViewer` component that opens the file in `onMounted` and releases it in `onBeforeUnmount`, including a document that finishes opening after the component is gone
- Loading the viewer with `defineAsyncComponent`: its chunk, and the SDK with it, loads when the first PDF is chosen

## Requirements

- Node.js 20.19 or later (or 22.12+)
- A Kernstra license key

## 1. Get a license key

The SDK does not start without a license key. Sign in to the
[Kernstra console](https://console.kernstra.com) and copy a **development key**: it
runs on any host, `localhost` included, and watermarks every page. A **production
key** renders clean pages and runs only on the domains it names.

The key is not a secret. It ships to the browser by design: the SDK verifies it
there. See [Licensing](https://kernstra.com/docs/web-sdk/guides/licensing).

## 2. Run it

```bash
npm install
cp .env.example .env.local   # then paste your key after KERNSTRA_LICENSE=
npm run dev
```

Open http://localhost:5173 and drop a PDF on the page, or choose one: the SDK loads once you do.

## Where the SDK is wired in

| File | What it does |
| --- | --- |
| `src/lib/kernstra.ts` | Owns the SDK options and calls `Kernstra.init()` with your key |
| `src/components/PdfDropzone.vue` | The landing page: file picker and drop target |
| `src/components/DocumentViewer.vue` | Opens the file with `PDFDocument.fromFile()`, builds the `PDFViewer`, destroys both on unmount |
| `src/App.vue` | Holds the chosen file: the landing page without one, the header and `DocumentViewer` with one |
| `vite.config.ts` | `envPrefix: ['VITE_', 'KERNSTRA_']` lets browser code read `KERNSTRA_LICENSE` |
| `src/app.css` | The page layout; `.viewer` gives the container its height |

## Build for production

```bash
npm run build
npm run preview
```

`npm run preview` serves the build at http://localhost:4173.

Serve it over HTTPS: the license check needs the browser's Web Crypto API, which
exists only in a secure context (`localhost` counts as one).

## Learn more

- [Kernstra PDF Web SDK](https://kernstra.com/web-sdk): what the SDK does, the tools it ships and pricing
- [Get started](https://kernstra.com/web-sdk/get-started): from `npm install` to an embedded PDF viewer
- [Vue integration guide](https://kernstra.com/docs/web-sdk/guides/integrations#s-vue-3): the component this example is built from
- [Documentation](https://kernstra.com/docs/web-sdk): every configuration option, the programmatic API, events and errors
- [`@kernstra/pdf-web-sdk` on npm](https://www.npmjs.com/package/@kernstra/pdf-web-sdk)
- Support: [support@kernstra.com](mailto:support@kernstra.com)

## Other frameworks

The same page, built with:

- [Vanilla TypeScript](https://github.com/kernstra/pdf-web-sdk-example-vanilla)
- [React](https://github.com/kernstra/pdf-web-sdk-example-react)
- [Next.js](https://github.com/kernstra/pdf-web-sdk-example-nextjs)
- [Nuxt](https://github.com/kernstra/pdf-web-sdk-example-nuxt)
- [Angular](https://github.com/kernstra/pdf-web-sdk-example-angular)
- [Svelte](https://github.com/kernstra/pdf-web-sdk-example-svelte)
- [SvelteKit](https://github.com/kernstra/pdf-web-sdk-example-sveltekit)

## License

The example code is released under the [MIT License](LICENSE). The Kernstra PDF Web
SDK it uses is commercial software, governed by its
[license agreement](https://kernstra.com/legal/web-sdk-license-terms).

Built and maintained by [Kernstra](https://kernstra.com/).
