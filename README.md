# Inventory Management

A modern inventory management web application built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## Features

- Product management
- Add, edit, and delete products
- Product categories
- Stock quantity tracking
- Low-stock and out-of-stock alerts
- Sales management
- Daily and monthly sales statistics
- Search and filtering
- Dark mode
- Responsive dashboard UI

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Motion
- React Icons

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd inventory-management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Do not commit your `.env` file to GitHub.

### 4. Start the development server

```bash
npm run dev
```

## Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment

This project uses Supabase for authentication and database services.

Make sure your Supabase project is configured before using authentication or database features.

## Project Structure

```text
src/
├── components/
├── context/
├── hooks/
├── pages/
├── routes/
└── App.tsx
```

## Localization

Current language:

- Arabic (`ar`)

