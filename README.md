# Alla Krishna Sai Reddy — Engineering Portfolio

A high-performance, production-ready personal engineering portfolio built for **Alla Krishna Sai Reddy** (AI/ML Engineer · Generative AI · Full Stack Developer). 

Designed around a bespoke **automotive engineering creative direction**: cockpit telemetry HUD, interactive ignition sequence splash intro, driver's-seat rocker switch navigation, engine-bay architecture diagram, racing livery dividers, and fine carbon-fibre texture.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Static Site Generation / SSG, Server & Client Components)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with custom dark carbon palette, gunmetal borders, and burnt-amber telemetry accents
- **Image Optimization**: `next/image` with direct local imports and automatic responsive sizing
- **Motion & Interactions**: [Framer Motion](https://www.framer.com/motion/) and CSS hardware-accelerated transforms
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**:
  - **Headings & Display**: [Clash Display](https://www.fontshare.com/fonts/clash-display) (Bold, modern grotesk)
  - **Body & Editorial**: [General Sans](https://www.fontshare.com/fonts/general-sans) (Clean humanist neutral)
  - **Telemetry & Technical Specs**: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (Engineered monospace)

---

## 📂 Project Structure

```
Krishna_Portfolio/
├── .env                              # Local environment variables (git-ignored)
├── .env.example                      # Template for all environment variables
├── data/
│   └── photos/                       # Root data folder for direct image imports
│       ├── photo-01.jpg              # Plate 01 (16:9)
│       ├── photo-02.jpg              # Plate 02 (4:3)
│       ├── photo-03.jpg              # Plate 03 (16:9)
│       ├── photo-04.jpg              # Plate 04 (1:1)
│       └── photo-05.jpg              # Plate 05 (4:3)
├── public/
│   ├── favicon.ico
│   └── resume.pdf                    # Default downloadable resume spec sheet
├── src/
│   ├── app/
│   │   ├── globals.css               # Base styles, fine carbon-fibre weave, animations
│   │   ├── layout.tsx                # Font loading, windshield framing, cursor HUD, SEO metadata
│   │   ├── not-found.tsx             # 404 recovery page
│   │   └── page.tsx                  # Main page assembling all cockpit sections & dividers
│   ├── components/
│   │   ├── AutoMarquee.tsx           # Subtle automotive typography background strip
│   │   ├── Detour.tsx                # Photography carousel with direct @/data/photos/ imports
│   │   ├── DoorBadge.tsx             # Racing door number badge ("00", "01", etc.) with checkered flag
│   │   ├── EngineBayDiagram.tsx      # Interactive engine-bay system architecture diagram
│   │   ├── Footer.tsx                # Minimal sign-off with telemetry details
│   │   ├── GearHeading.tsx           # Gear-engage heading transition
│   │   ├── Ignition.tsx              # Hero section: Name, titles, CTAs, and Resume [PDF] download
│   │   ├── LiveryDivider.tsx         # Racing livery stripe divider band between sections
│   │   ├── Navigation.tsx            # Driver's-seat rocker-switch navigation header
│   │   ├── PitStop.tsx               # Contact Me section (comms, direct email/phone, social links)
│   │   ├── RouteTrackLine.tsx        # Scroll-rail route track with interactive coupe icon
│   │   ├── RpmGauge.tsx              # Dynamic SVG tachometer gauge with redline & needle
│   │   ├── RpmGaugeHUD.tsx           # Persistent viewport corner tachometer HUD
│   │   ├── SplashIntro.tsx           # Fullscreen ignition sequence splash screen
│   │   ├── TachometerCursor.tsx      # Desktop tachometer needle cursor accent
│   │   ├── TheDriver.tsx             # About section: Driver profile, punchy summary, education
│   │   ├── TheGarage.tsx             # Projects section: Builds with metrics, stack, and live/repo links
│   │   ├── TrackRecord.tsx           # Experience timeline: Freelance client projects & tech stack
│   │   ├── UnderTheHood.tsx          # Skills section wrapper hosting EngineBayDiagram
│   │   ├── UnfoldingProse.tsx        # Sequential clause-reveal text animation
│   │   └── WindshieldFraming.tsx     # Ambient cockpit windshield vignette and A-pillars
│   ├── data/
│   │   ├── photos/                   # Direct photo imports mirror directory
│   │   └── resume.ts                 # Single source of truth reading env variables & content
│   ├── lib/
│   │   └── utils.ts                  # Tailwind class merging utility
│   └── types/
│       └── index.ts                  # Shared TypeScript interfaces & types
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## ⚙️ Environment Variables Setup

Every external link that may change between environments or is currently a placeholder is managed via environment variables.

### 1. Create your `.env` file

Copy the provided template to `.env` at the project root:

```bash
cp .env.example .env
```

### 2. Available Variables

All client-accessible variables in Next.js use the `NEXT_PUBLIC_` prefix:

| Variable | Description | Default / Example Value |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn profile link | `https://linkedin.com/in/krishnasai2004` |
| `NEXT_PUBLIC_GITHUB_URL` | GitHub profile link | `https://github.com/krishnasai2004` |
| `NEXT_PUBLIC_HUGGINGFACE_URL` | Hugging Face profile link | `https://huggingface.co/krishnasai2004` |
| `NEXT_PUBLIC_RESUME_URL` | Path to resume PDF file or external Google Drive / Dropbox link | `/resume.pdf` |
| `NEXT_PUBLIC_KLERK_LIVE_URL` | Live demo URL for Klerk AI | `https://klerk-ai.example.com` (or `#`) |
| `NEXT_PUBLIC_KLERK_GITHUB_URL` | GitHub repository URL for Klerk AI | `https://github.com/your-username/klerk-ai` (or `#`) |
| `NEXT_PUBLIC_JOBJUTSU_LIVE_URL` | Live demo URL for JobJutsu AI (e.g. Hugging Face Space) | `https://huggingface.co/spaces/your-username/jobjutsu-ai` (or `#`) |
| `NEXT_PUBLIC_JOBJUTSU_GITHUB_URL` | GitHub repository URL for JobJutsu AI | `https://github.com/your-username/jobjutsu-ai` (or `#`) |
| `NEXT_PUBLIC_RETINOPATHY_LIVE_URL` | Live demo URL for Diabetic Retinopathy classifier | `https://retinopathy.example.com` (or `#`) |
| `NEXT_PUBLIC_RETINOPATHY_GITHUB_URL` | GitHub repository URL for Diabetic Retinopathy classifier | `https://github.com/your-username/diabetic-retinopathy` (or `#`) |
| `NEXT_PUBLIC_RETINOPATHY_PUBLICATION_URL` | Research paper publication link (IRJET) | `https://www.irjet.net` |

> [!NOTE]
> Verified client URLs (`https://manoharorganicspices.com` and `https://sai-manikanta-tours.pages.dev/en`) as well as direct contact details (email and phone) are maintained in `src/data/resume.ts`.

---

## 📷 Photography Showcase (`/data/photos/`)

The **Detour** section showcases field photography in a responsive, clean grid:
- **Desktop**: 4 columns × 2 rows
- **Tablet**: 2 columns × 4 rows
- **Mobile**: 1 column × 8 rows

Each photo features smooth hover/tap zoom scaling (`scale-[1.07]`), contained cleanly within each rounded cell.

### Interactive Lightbox
Clicking or tapping any photo opens it full-size in a distraction-free dark lightbox overlay with keyboard navigation (`Left`, `Right`, `Esc`), prev/next controls, and backdrop dismissal.

### How to Replace Images
1. Open the `/data/photos/` directory (mirrored in real-time to `src/data/photos/`).
2. Drop in your photos with the exact sequential filenames:
   - `photo-01.jpg` through `photo-08.jpg`
3. Next.js and `sharp` automatically optimize and serve the images with zero layout shift.

---

## 📄 Resume Download

A dedicated **Resume [PDF]** CTA button is located in the hero section (**Ignition**).

- By default, it links to `/resume.pdf`, serving the file from the `public/` directory with a download trigger (`download="Alla_Krishna_Sai_Reddy_Resume.pdf"`).
- To update your resume:
  1. Replace `public/resume.pdf` with your new PDF document.
  2. Alternatively, set `NEXT_PUBLIC_RESUME_URL` in your `.env` file to any hosted URL (e.g., Google Drive direct download, AWS S3, Dropbox).

---

## 💻 Local Development

### Prerequisites

- Node.js 18.17+ or later
- npm, yarn, or pnpm

### Step-by-Step

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/krishna-portfolio.git
   cd krishna-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Preview the production build**:
   ```bash
   npm run start
   ```

---

## 🚀 Deployment (GitHub → Vercel)

The site is built on Next.js 14 and is natively optimized for one-click deployment on [Vercel](https://vercel.com/).

### Step 1: Push to GitHub

Ensure all your code changes are committed and pushed to your GitHub repository:

```bash
git add .
git commit -m "feat: production-readiness, env links, direct photos, resume download"
git push origin main
```

### Step 2: Import into Vercel

1. Log in to [vercel.com](https://vercel.com/).
2. Click **Add New...** → **Project**.
3. Select your GitHub repository (`krishna-portfolio`).
4. Vercel will automatically detect **Next.js** as the framework preset and configure the root directory.

### Step 3: Add Environment Variables in Vercel

Under **Environment Variables**, add each of the variables from your `.env.example`:

- `NEXT_PUBLIC_LINKEDIN_URL`
- `NEXT_PUBLIC_GITHUB_URL`
- `NEXT_PUBLIC_HUGGINGFACE_URL`
- `NEXT_PUBLIC_RESUME_URL`
- `NEXT_PUBLIC_KLERK_LIVE_URL`
- `NEXT_PUBLIC_KLERK_GITHUB_URL`
- `NEXT_PUBLIC_JOBJUTSU_LIVE_URL`
- `NEXT_PUBLIC_JOBJUTSU_GITHUB_URL`
- `NEXT_PUBLIC_RETINOPATHY_LIVE_URL`
- `NEXT_PUBLIC_RETINOPATHY_GITHUB_URL`
- `NEXT_PUBLIC_RETINOPATHY_PUBLICATION_URL`

Select all environments (**Production**, **Preview**, **Development**).

### Step 4: Deploy

Click **Deploy**. Vercel will run `npm run build`, bundle the optimized static pages and assets, and assign a production URL (with automatic SSL and global CDN distribution).

Whenever you push commits to `main`, Vercel will automatically rebuild and deploy your updates.
