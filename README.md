<div align="center">
  <h1>🧵 Threadly</h1>
  <p>A high-performance, modern feed and community platform designed for seamless user engagement.</p>
  
  <a href="https://threadly-bay.vercel.app/">
    <img src="https://img.shields.io/badge/🟢_Live_Deployment-Vercel-black?style=for-the-badge&logo=vercel" alt="Live Deployment on Vercel" />
  </a>
  <br /><br />

  [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](#)
  [![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](#)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](#)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](#)
  [![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma)](#)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-316192?style=for-the-badge&logo=postgresql)](#)
</div>

<br />

## ⚡ Overview

Threadly is a full-stack, feed-based web application built on the bleeding edge of the React ecosystem. Leveraging **Next.js 16 App Router**, **Server Components**, and a **Serverless PostgreSQL** architecture via Neon, it delivers a highly responsive and scalable platform for sorting, tagging, and interacting with posts.

## 🏗️ System Architecture

The application follows a modern serverless architecture pattern, minimizing client-side Javascript while maximizing performance through React Server Components and Server Actions.

```mermaid
graph TD
    %% Define Nodes
    Client[📱 Client Browser]
    NextApp[⚙️ Next.js 16 App Router]
    RSC[⚛️ React Server Components]
    Actions[⚡ Server Actions]
    Prisma[🏛️ Prisma ORM]
    NeonAuth[🔐 Neon Auth]
    DB[(🐘 Neon Postgres DB)]

    %% Define Relationships
    Client <-->|Requests & UI Hydration| NextApp
    NextApp <-->|Renders| RSC
    Client -->|Mutations| Actions
    
    RSC -->|Queries| Prisma
    Actions -->|Mutations| Prisma
    
    NextApp <-->|JWT / Session| NeonAuth
    Prisma <-->|Connection Pool| DB

    %% Styling
    classDef frontend fill:#111,stroke:#333,stroke-width:2px,color:#fff
    classDef backend fill:#1f2937,stroke:#4b5563,stroke-width:2px,color:#fff
    classDef database fill:#065f46,stroke:#047857,stroke-width:2px,color:#fff
    
    class Client,RSC frontend
    class NextApp,Actions,Prisma backend
    class DB database
```

## ✨ Core Features

- **🚀 Interactive Feed**: Algorithmic sorting, pagination, and real-time feel for consuming posts.
- **🏷️ Tagging Engine**: Fast, relational filtering of content across multiple categories.
- **💬 Engagement Layer**: Nested comment threads and a robust upvote/downvote system.
- **📱 Responsive UI**: Mobile-first architecture using Tailwind CSS v4 and `shadcn/ui`.
- **🔐 Secure Auth**: Built-in, token-based authentication handled by `@neondatabase/auth`.

---

## 🛠️ Getting Started

Follow these steps to set up the development environment locally.

### Prerequisites
- **Node.js** `v20+` (via `nvm` or your preferred manager)
- **PostgreSQL** database (We recommend [Neon](https://neon.tech/))

### 1. Clone & Install
```bash
git clone <repository-url>
cd threadly

# Install dependencies (npm, yarn, pnpm, or bun)
npm install
```

### 2. Environment Configuration
Duplicate the `.env.example` (if available) or create a new `.env` file at the root:

```env
# Neon Database Connection String
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Neon Auth or NextAuth credentials (if applicable)
# NEXT_PUBLIC_AUTH_URL="..."
```

### 3. Database Initialization
Synchronize your Prisma schema with the Postgres instance and generate the client types:

```bash
npm run db:push
```

### 4. Seed Mock Data (Recommended)
Populate your local environment with rich testing data so you can view the UI as intended.

```bash
# Basic seed (Tags, standard Posts)
npm run db:seed

# Advanced seed (Includes simulated Comments and User Votes)
npm run db:seed-cv
```

### 5. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to view the application.

---

## 💻 Scripts & Tooling

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js local development server |
| `npm run build` | Compiles the application into a production bundle |
| `npm run start` | Boots the production server from the compiled `.next` folder |
| `npm run lint` | Runs `eslint` across the codebase to catch static errors |
| `npm run db:push` | Pushes Prisma schema state directly to the DB without migrations |
| `npm run db:seed` | Injects baseline data for testing |

---

<div align="center">
  <p>Crafted with ❤️ by a passionate developer.</p>
</div>
