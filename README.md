# Lintang Studio Peta Diri

> Interactive numerology and self-discovery blueprint platform featuring Life Path calculations, Lo Shu visualizers, and reflection card generation.

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deployed%20to-Cloudflare%20Pages-f38020?logo=cloudflarepages&logoColor=white)](https://lintang.pages.dev)
[![Live Site](https://img.shields.io/badge/Live%20Site-lintang.pages.dev-blue)](https://lintang.pages.dev)

## 📌 Master Plan & Requirements
Detailed brand philosophy, service catalog, legal privacy compliance, and architecture guidelines are documented in [MASTER_PLAN.md](MASTER_PLAN.md).

## 🌐 Live URL
- **Production URL**: [https://lintang.pages.dev](https://lintang.pages.dev)

## 🛠️ Tech Stack
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Icons & Animation**: [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/)
- **Exporting**: [html-to-image](https://github.com/bubkoo/html-to-image), [jspdf](https://github.com/parallax/jsPDF)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)

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

### Deployment to Cloudflare Pages

#### 1. Automatic Git Deployment (Vercel-style, No GitHub Actions needed)
Connect the repository directly in the Cloudflare Dashboard:
1. Open [Cloudflare Dashboard](https://dash.cloudflare.com/) $\to$ **Workers & Pages** $\to$ **Create application** $\to$ **Pages** $\to$ **Connect to Git**.
2. Select repository `nichsedge/lintang`.
3. Set Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `bun run build` (or `npm run build`)
   - **Build output directory**: `dist`
4. Every `git push origin main` will automatically trigger Cloudflare to build and deploy to `https://lintang.pages.dev` with zero GitHub Actions required.

#### 2. Manual CLI Deployment
```bash
bun run build
bunx wrangler pages deploy dist --project-name=lintang --branch=main
```
