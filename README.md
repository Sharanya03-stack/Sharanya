# Sharanya — Freelance Full-Stack Developer & AI Solutions Portfolio

A production-quality personal portfolio website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, backed by an optional **FastAPI** Python microservice.

---

## 🚀 Quick Start (Run Locally)

### 1. Frontend (Next.js)

```bash
# Install dependencies (already installed)
npm install

# Start development server
npm run dev
# -> Opens on http://localhost:3000

# Build optimized production bundle
npm run build

# Run production server
npm run start
```

### 2. Backend (Optional FastAPI Microservice)

```bash
cd backend

# Create virtual environment (optional)
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run FastAPI with auto-reload
uvicorn main:app --reload --port 8000
# -> Interactive Swagger documentation at: http://localhost:8000/docs
```

---

## 📂 Project Architecture

```
├── public/
│   ├── images/                <- Place your portrait image here (sharanya-portrait.png)
│   ├── projects/              <- 5 active project screenshots (auto-linked)
│   │   ├── acs-energy.png
│   │   ├── cascadeflow-triage.png
│   │   ├── househunt.png
│   │   ├── nexbasket.png
│   │   └── zerodegree.png
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts  <- Complete server-side contact & inquiry API endpoint
│   │   ├── globals.css           <- Custom scrollbars, cyan glows, glassmorphism
│   │   ├── layout.tsx            <- SEO metadata, Open Graph, accessibility
│   │   ├── page.tsx              <- Master assembly of all 6 sections in exact order
│   │   └── sitemap.ts            <- Automated XML sitemap
│   ├── components/
│   │   ├── Navbar.tsx            <- Sticky blur navbar, active tracker, mobile drawer
│   │   ├── Hero.tsx              <- Section 1: Business value proposition, availability badge, portrait
│   │   ├── TechStack.tsx         <- Section 2: Bento grid categorized by engineering discipline
│   │   ├── Services.tsx          <- Section 3: 5 core freelance services with problem-solving focus
│   │   ├── Projects.tsx          <- Section 4: Filterable case studies showcase
│   │   ├── CaseStudyModal.tsx    <- 11-point comprehensive case study deep-dive modal
│   │   ├── Testimonials.tsx      <- Section 5: Verified milestones, trust principles, empty state
│   │   ├── Contact.tsx           <- Section 6: High-conversion project inquiry form
│   │   ├── CallbackDrawer.tsx    <- Quick discovery drawer triggerable from any CTA
│   │   └── Footer.tsx            <- Dynamic year, social links, back-to-top
│   ├── data/
│   │   ├── siteConfig.ts         <- Centralized developer profile, email, socials, copy
│   │   ├── technologies.ts       <- Categorized technologies with icons and descriptions
│   │   ├── services.ts           <- Detailed client solutions, business problems solved
│   │   ├── projects.ts           <- Complete project data with 11-step case study fields
│   │   └── testimonials.ts       <- Verified milestones and client endorsement registry
│   └── lib/
│       └── utils.ts              <- Tailwind class merger helper (cn)
├── backend/
│   ├── main.py                   <- FastAPI asynchronous microservice
│   └── requirements.txt
├── .env.example                  <- Environment variables template
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🎨 How to Personalize & Update Content

All content is kept completely separated from presentation in clean TypeScript files under `src/data/`:

1. **Profile, Email & Socials**:
   Edit [`src/data/siteConfig.ts`](file:///src/data/siteConfig.ts):
   - `contactEmail`: Replace with your actual email.
   - `socialLinks`: Update GitHub, LinkedIn, and X URLs.
   - `availability`: Adjust current intake status.

2. **Personal Photograph**:
   - Save your portrait photo as `public/images/sharanya-portrait.png`.
   - The hero card is automatically configured to display it. If the image is not present or loading fails, it falls back to a clean architectural badge.

3. **Project Screenshots & Details**:
   - The 5 uploaded project screenshots have already been processed and placed into `public/projects/`.
   - To update project text, links, or metrics, edit [`src/data/projects.ts`](file:///src/data/projects.ts).
   - Each project includes all 11 required case study points.

4. **Client Testimonials & Milestones**:
   - Edit [`src/data/testimonials.ts`](file:///src/data/testimonials.ts).
   - Add new client reviews to the `testimonials` array as you receive them. When empty, it displays an ethical trust statement and verified engineering metrics.

---

## 🌐 Deployment to Vercel

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial freelance portfolio build"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Next.js App Router will be detected automatically.
5. (Optional) Set `CONTACT_WEBHOOK_URL` in the Vercel Environment Variables.
6. Click **Deploy**. Your portfolio will be live worldwide on Vercel's Edge Network with sub-second loading speeds.
