# Rick and Morty Character Browser 🛸

A modern, responsive web application built with Next.js 15 that allows users to browse and explore characters from the Rick and Morty universe. The application fetches data from the [Rick and Morty API](https://rickandmortyapi.com/) and displays it in an interactive, mobile-friendly interface.

## 🌟 Features

- **Character Listing**: Browse all Rick and Morty characters in a responsive data table
- **Character Details**: View detailed information about each character including:
  - Character image and basic info (status, species, gender)
  - Origin and last known location
  - Complete episode appearances with air dates
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Server-Side Rendering**: Fast loading with Next.js App Router
- **Type Safety**: Fully typed with TypeScript
- **Testing**: Comprehensive test coverage with Jest and React Testing Library

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: CSS Modules with responsive design
- **Testing**: Jest + React Testing Library
- **API**: [Rick and Morty API](https://rickandmortyapi.com/)
- **Date Handling**: date-fns
- **Linting**: ESLint with Next.js configuration

## 📁 Project Structure

```text
src/
├── app/                          # Next.js App Router pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page (redirects to characters)
│   └── characters/              # Characters section
│       ├── page.tsx             # Character list page
│       ├── characters.css       # Character list styles
│       ├── [id]/                # Dynamic character detail pages
│       │   ├── page.tsx         # Individual character page
│       │   └── character-detail.css
│       └── __tests__/           # Page-level tests
├── components/                   # Reusable components
│   ├── DataTable.tsx            # Generic data table component
│   ├── DataTable.css            # Data table styles
│   └── __tests__/               # Component tests
└── types/                       # TypeScript type definitions
    └── rickandmorty.ts          # API response types
```

## 🛠 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd hatchworkstest
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Usage

### Character List

- The table displays character images, names, status, species, and gender
- On mobile devices, the table adapts to a card-based layout
- Click on any character name to view detailed information

### Character Details

- View comprehensive character information including origin and location
- Browse all episodes the character appears in
- Episodes are displayed with episode codes, names, and formatted air dates
- Use the breadcrumb navigation to return to the character list

## 🧪 Testing

The project includes comprehensive test coverage for components and pages.

### Run Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure

- Component tests in `src/components/__tests__/`
- Page tests in `src/app/*/__tests__/`
- Tests cover rendering, user interactions, and API integration

## 🚀 Build and Deploy

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

## 🔧 Configuration

### ESLint Configuration

Linting is configured with Next.js recommended settings and additional rules for code quality.

### Jest Configuration

Testing is set up with Jest and React Testing Library with:

- jsdom environment for DOM testing
- TypeScript support
- Coverage reporting
- Custom setup file for test utilities

## 🔗 API Reference

This application uses the [Rick and Morty API](https://rickandmortyapi.com/):

- Character endpoint: `https://rickandmortyapi.com/api/character`
- Episode endpoint: `https://rickandmortyapi.com/api/episode`

