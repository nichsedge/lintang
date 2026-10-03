# Lintang Studio Peta Diri

> Interactive numerology and self-discovery blueprint platform featuring Life Path calculations, Lo Shu visualizers, and reflection card generation.

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deployed%20to-Cloudflare%20Pages-f38020?logo=cloudflarepages&logoColor=white)](https://lintang.pages.dev)
[![Live Site](https://img.shields.io/badge/Live%20Site-lintang.pages.dev-blue)](https://lintang.pages.dev)

## 🌐 Live URL
- **Production URL**: [https://lintang.pages.dev](https://lintang.pages.dev)

## 🛠️ Tech Stack
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Icons & Animation**: [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/)
- **Exporting**: [html-to-image](https://github.com/bubkoo/html-to-image), [jspdf](https://github.com/parallax/jsPDF)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/) via Wrangler

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (v1.2+)

### Installation
```bash
bun install
```

### Development
```bash
bun run dev
```

### Build
```bash
bun run build
```

### Deploy to Cloudflare Pages
```bash
bunx wrangler pages deploy dist --project-name=lintang --branch=main
```
