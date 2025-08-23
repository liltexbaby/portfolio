# portfolio-v2

[![CI](https://github.com/liltexbaby/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/liltexbaby/portfolio/actions/workflows/ci.yml)

Live: https://jonathanpinto.net

A personal portfolio site built with Next.js (App Router) showcasing web and design work.

Summary
- Modern Next.js portfolio using the App Router (src/app)
- Built with React, TypeScript, Tailwind CSS, and Three.js for web visuals
- Deploys via DigitalOcean App Platform (auto-deploy on push to main)

Quickstart (local)
1. Clone the repository
   git clone https://github.com/liltexbaby/portfolio.git
   cd portfolio/portfolio-v2

2. Install dependencies
   npm ci

3. Run development server
   npm run dev
   Open http://localhost:3000

4. Build for production
   npm run build
   npm start

What CI runs
- Lint (next lint)
- Build (next build)
- Smoke test that starts the built app and hits the root endpoint

Tech stack
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Three.js / @react-three/fiber for 3D models
- GitHub Actions for CI
- DigitalOcean App Platform for hosting & deployments

Repository structure (high-level)
- src/              - Next.js app source (app router)
- src/components/   - React components
- public/           - Static assets (images, models, fonts)
- .github/workflows - CI workflows (GitHub Actions)
- package.json
- next.config.ts
- tsconfig.json

Notes and recommendations
- Some large media files live in public/img/. Consider moving large video assets to an external CDN or object storage to reduce repo size.
- Main branch should be protected and require CI checks before merge.
- Add screenshots/GIFs to the README to better showcase the work (omitted for now per request).

License
This repository is licensed under the MIT License. See LICENSE for details.

Contact
Jonathan Pinto — https://jonathanpinto.net
