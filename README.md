# Coast FI Calculator

A responsive web application built with SvelteKit to calculate your Coast FI (Coast Financial Independence) number. Coast FI is the amount you need to have saved today so that, without adding any more money, it will grow to support your retirement at your desired retirement age.

<!-- Add your live demo URL here -->
🚀 **[Live Demo](https://josemyduarte.github.io/CoastFI)** | 📊 **[Repository](https://github.com/JosemyDuarte/CoastFI)**

![Coast FI Calculator](https://img.shields.io/badge/Built%20with-SvelteKit-orange)
![Deployment](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-blue)
![UI Framework](https://img.shields.io/badge/UI-Flowbite%20Svelte-purple)
![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-cyan)

## Screenshots


## Features

- 📊 **Interactive Coast FI Calculator** - Calculate your Coast FI number based on your financial inputs
- 📈 **Investment Growth Visualization** - View projected portfolio growth with interactive charts powered by Chart.js
- 💰 **Real-time Calculations** - Instant results as you adjust your parameters
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Built with Flowbite Svelte components and Tailwind CSS
- 🚀 **Fast & Secure** - Deployed on Cloudflare Pages with edge computing
- 🔒 **Privacy-First** - No data storage, all calculations happen in your browser
- 💸 **Multi-Currency Support** - EUR formatting with German locale (easily customizable)
- ⚡ **Zero Configuration** - No environment variables needed, works out of the box
- 🧮 **Accurate Financial Formulas** - Properly handles compound interest, inflation, and withdrawal rates

## What is Coast FI?

Coast FI (Coast Financial Independence) is the amount of money you need to have saved today so that, without adding any more money, it will grow to support your retirement at your desired retirement age. Once you reach Coast FI, you can "coast" to retirement knowing that your current savings will grow enough to support you in retirement.

## Tech Stack

- **Framework**: SvelteKit with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Flowbite Svelte
- **Charts**: Chart.js
- **Deployment**: GitHub Pages (with GitHub Actions)
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, pnpm, or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/coast-fi-calculator.git
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

### Development

Start the development server:

```bash
npm run dev
# or
npm run dev -- --open  # Opens in browser automatically
```

The application will be available at `http://localhost:5173`

### Building

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Type Checking

Run TypeScript and Svelte checks:

```bash
npm run check
```

Watch mode for continuous checking:

```bash
npm run check:watch
```

### Linting and Formatting

Format code:

```bash
npm run format
```

Lint code:

```bash
npm run lint
```

## Deployment

This project is configured to deploy automatically to **GitHub Pages** using GitHub Actions.

### 🚀 Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically builds and deploys the app whenever you push to the `main` branch.

#### Setup Steps:

1. **Push to GitHub**: Push your repository to GitHub
2. **Enable GitHub Pages**: 
   - Go to repository Settings → Pages
   - Set Source to "GitHub Actions"
3. **Deploy**: Push to `main` branch triggers automatic deployment

**Your app will be available at**: `https://yourusername.github.io/coast-fi-calculator/`

### 📋 Manual Deployment

You can also deploy manually:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# The 'build' directory contains the static files ready for deployment
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/)
- UI components from [Flowbite Svelte](https://flowbite-svelte.com/)
- Charts powered by [Chart.js](https://www.chartjs.org/)
- Deployed on [Github Pages](https://pages.github.com/)
