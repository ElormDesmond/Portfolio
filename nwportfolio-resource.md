# nwportfolio - Resource Document

## 📋 Project Introduction
`nwportfolio` is a premium, custom-scaffolded personal portfolio for Desmond Elorm Honu. It integrates his dual professional identities—Web Developer & Cybersecurity Specialist—into a single web application. Recruiters can toggle views to inspect relevant credentials (including custom CV files per role), technical capabilities, and project exhibits. It also features a fully functional simulated browser shell terminal, allowing recruiters to audit commands and run threat scans.

## 🛠️ Frameworks & UI
*   **Core Library:** React 19 (Strict Mode)
*   **Bundler & Dev Server:** Vite 8
*   **Language:** TypeScript 5+ (Strict verification, type-only exports)
*   **Styling:** Tailwind CSS 4.0 (CSS-based variables, custom theme extensions)
*   **Animations:** Framer Motion 11 (Hardware-accelerated layouts, tab-switching transitions)
*   **Icons:** Lucide React & custom inline SVGs (for dependency safety and performance)

## 📁 Step-by-Step Structure
1.  **Scaffolding & Boilerplate Setup**
    *   Scaffolded a React 19 + Vite 8 + TypeScript project in the `nwportfolio` directory.
    *   Installed Dev dependencies for Tailwind CSS 4.0 and runtime dependencies for Framer Motion and Lucide.
2.  **Visual Language Definition**
    *   Defined a 3-color palette in `src/index.css`: Midnight Obsidian background (`#08090C`), Cyber Mint indicators (`#00FF87`), and Glacial Silver text (`#ECF0F1`).
    *   Imported geometric-sans (`Plus Jakarta Sans`) and system-mono (`JetBrains Mono`) typography.
    *   Implemented custom CSS utilities for terminal glassmorphism panels and pixel-scanline overlay effects.
3.  **Core Interface Design**
    *   Constructed a bottom-floating glassmorphic navigation dock using spring-animated highlights.
    *   Developed the Hero console with responsive columns (terminal panel vs branding card).
    *   Laid out a Bento Box exhibition grid for project items.
4.  **Feature Integration**
    *   **Dual Identity Engine:** Programmed state switchers swapping between Web Developer and Cybersecurity profiles.
    *   **Interactive Terminal:** Coded input sanitization and command logs supporting `help`, `about`, `skills`, `projects`, `contact`, `clear`, and `scan-network` (with a simulated Nmap scanning animation on a mock network).
    *   **SVG Flow Models:** Created inline vectors that draw flow paths dynamically when hovering over key cards, utilizing modern web framework definitions rather than specific Go layouts.
    *   **Uplink Contact Console:** Built a transmission form mimicking secure TLS handshake logs.
5.  **Build Verification**
    *   Resolved compilation warnings (unused modules, type-only exports under `verbatimModuleSyntax`).
    *   Successfully executed production bundle checks.
