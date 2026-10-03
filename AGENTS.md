# Agent Guidelines & Engineering Standards: Lintang Studio Peta Diri

## 1. Master Plan & Specifications
* Always align features, color palettes, typography, and copywriting with [MASTER_PLAN.md](file:///home/al/Projects/lintang/MASTER_PLAN.md).
* Brand positioning: *"Peta, bukan ramalan"* — emphasize empowerment, clarity, and rigorous data privacy (UU No. 27/2022 PDP).

## 2. Modern Standards & Clean Architecture
* **Strict "No Backward Compatibility"**: Always target modern language standards (React 19, TypeScript 5+, Tailwind CSS v4, Bun).
* **Package Management**: Use `bun` exclusively (`bun install`, `bun run build`, `bunx`).
* **Design System & Contrast**:
  * Biru Malam: `#1F2A44`
  * Krem Pasir: `#F4EDE1`
  * Terakota: `#C2673F` (or `#A8512C` for high-contrast white text)
  * Emas Redup: `#C9A45C`
  * Hijau Sage: `#8A9A7B`
* **Zero Modal Redundancy**: Modals have exactly one integrated close button in the top-right header, plus `Escape` key and backdrop dismiss. Do not add redundant secondary close buttons in the bottom action footer.
* **Proactive Documentation Sync**: Whenever tools, scripts, CLI entry points, or dependencies are added, modified, or removed, immediately update both `README.md` and `AGENTS.md` in the same turn.

## 3. Deployment & CI/CD
* **Platform**: Cloudflare Pages (`lintang.pages.dev`).
* **Git Auto-Deploy (Vercel-style)**: Connect GitHub repository `nichsedge/lintang` via Cloudflare Pages Dashboard (Workers & Pages > Connect to Git) for zero-config CI builds without GitHub Actions.
* **Direct Deploy CLI**: `bun run build && bunx wrangler pages deploy dist --project-name=lintang --branch=main`.
