# nwportfolio | Desmond Elorm Honu Portfolio

A premium, interactive web portfolio built from scratch. Features a dual-profile switch layout, an interactive terminal command parser, custom SVG animated flow diagrams, and a bottom-floating glassmorphic navigation dock.

## 🚀 Key Features

*   **Dual Identity Switcher:** Instantly swap between Software Architect and Cyber Sentinel views, changing highlighted skills, experiences, and project grids.
*   **Interactive Browser Shell:** Fully functional CLI terminal parsing commands (`help`, `about`, `skills`, `projects`, `scan-network`, `contact`, `clear`).
*   **Secure Uplink Interface:** Form transmissions displaying simulated cryptographic network handshakes.
*   **Aesthetic Theme:** Midnight Obsidian base, glowing Cyber Mint highlights, and Glacial Silver typography.

---

## 🛠️ Frameworks & Libraries

*   **Core:** React 19, TypeScript
*   **Tooling:** Vite 8
*   **Styles:** Tailwind CSS 4.0
*   **Animations:** Framer Motion 11
*   **Icons:** Lucide React & Custom Inline SVGs

---

## 💻 How to Run Locally

### Prerequisites

Make sure you have Node.js (version 20+ recommended) and npm installed.

### Step 1: Clone or Navigate to Project

Ensure you are in the `nwportfolio` directory:

```bash
cd nwportfolio
```

### Step 2: Install Dependencies

Install all package nodes required for compilation:

```bash
npm install
```

### Step 3: Start the Development Server

Start Vite's Hot Module Replacement (HMR) local server:

```bash
npm run dev
```

The application will run locally at [http://localhost:5173](http://localhost:5173).

### Step 4: Build for Production

Compile typescript layers and generate static distribution assets:

```bash
npm run build
```

The output bundle will be available in the `dist` directory. To preview the production build locally, run:

```bash
npm run preview
```
