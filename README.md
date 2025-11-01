# WordGrind

Master English vocabulary with WordGrind—an AI-powered, personalized learning platform designed to help you quickly save new words, review them effectively, and expand your vocabulary with confidence. This application provides a centralized place for your language learning journey, featuring interactive quizzes and real-world context to ensure fluency and smarter language skills.

## Table of Contents

- [Key Features](#key-features)

- [Architecture Overview](#architecture-overview)

- [Tech Stack](#tech-stack)

- [Getting Started](#getting-started)

  - [Prerequisites](#prerequisites)

  - [Installation](#installation)

- [Configuration](#configuration)

- [Usage](#usage)

- [Project Structure](#project-structure)


## Key Features

-   **AI-Powered Learning**: Leverages AI to provide personalized vocabulary suggestions and learning paths.

-   **Centralized Word Saving**: Quickly save words encountered online or in books to a single, organized platform.

-   **Interactive Quiz Feature**: Test your knowledge with quizzes on unmastered words, complete with real-world usage context.

-   **LLM Suggestions**: Get intelligent suggestions and analysis after completing quizzes.

-   **AI Chat Integration** (future feature): Engage in conversations with an LLM using the Vercel AI SDK to practice new vocabulary.

-   **Speech-to-Text Conversation** (future feature): Practice pronunciation and conversational skills with AI using learned words.

-   **User Authentication**: Secure sign-in and sign-up with Google or email.

-   **Performance Optimization**: Utilizes Upstash Redis for caching words, profiles, and quizzes.

## Architecture Overview

WordGrind is built as a modern full-stack application using the T3 Stack principles, combining Next.js for both frontend and backend API routes. The frontend provides a rich, interactive user interface powered by React, styled with Tailwind CSS and Shadcn UI components. Data fetching and API interactions are handled efficiently using tRPC, ensuring type-safe end-to-end communication between the client and server.

The backend leverages Drizzle ORM for database interactions with PostgreSQL, providing a robust and type-safe way to manage application data. User authentication is managed by Better Auth, supporting both social (Google) and email-based logins. For enhanced performance, Upstash Redis is integrated for caching frequently accessed data like words, user profiles, and quiz results. AI capabilities, including LLM suggestions and conversational features, are powered by the Vercel AI SDK, integrating models like Google AI and Mistral. Email functionalities, such as transactional emails, are handled by Resend. The application also integrates Polar Payments for subscription management.

## Tech Stack

| Area | Tool | Version |
|---|---|---|
|---|---|---|
| Frontend | Next.js | 15.x |
| Frontend | React | 19.x |
|---|---|---|
| Styling | Tailwind CSS | 4.x |
| UI Components | Shadcn UI | - |
|---|---|---|
| Backend | Next.js API Routes | 15.x |
| API Layer | tRPC | 11.x |
|---|---|---|
| ORM | Drizzle ORM | 0.44.x |
| Database | PostgreSQL | - |
|---|---|---|
| Authentication | Better Auth | 1.3.x |
| Caching | Upstash Redis | 1.35.x |
|---|---|---|
| AI | Vercel AI SDK | 5.0.x |
| AI Models | @ai-sdk/google | 2.0.x |
|---|---|---|
| AI Models | @ai-sdk/mistral | 2.0.x |
| Email | Resend | 6.0.x |
|---|---|---|
| Payments | Polar Payments | 0.34.x |
| Linting | ESLint | 9.x |
|---|---|---|
| Formatting | Prettier | 3.x |
| Language | TypeScript | 5.x |
|---|---|---|



## Getting Started

Follow these instructions to set up and run WordGrind locally.

### Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (v18 or higher)

-   Yarn (v1.x or v4.x, as specified in `package.json`)

-   A PostgreSQL database instance (local or hosted)

### Installation

1.  **Clone the repository:**

```bash
git clone https://github.com/anirudhprmar/word-grind.git

cd word-grind

```
2.  **Install dependencies:**

```bash
yarn install

```
3.  **Set up environment variables:**
    Create a `.env` file in the root of the project based on `.env.example` (if available, otherwise refer to the [Configuration](#configuration) section).

```bash
cp .env.example .env

```
4.  **Run database migrations:**
    Ensure your `DATABASE_URL` is correctly set in your `.env` file.

```bash
yarn db:migrate

```
Alternatively, to push the schema directly (use with caution in production):

```bash
yarn db:push

```
## Configuration

WordGrind uses environment variables for sensitive information and configuration. Create a `.env` file in the project root and populate it with the following:

| ENV | Description | Example |
|---|---|---|
|---|---|---|
| `DATABASE_URL` | Connection string for your PostgreSQL database. | `postgresql://user:password@host:port/database` |
| `AUTH_SECRET` | A secret string used by Better Auth for session management. Generate a strong, random string. | `supersecretstring123` |
|---|---|---|
| `AUTH_GOOGLE_ID` | Google OAuth client ID for social login. | `your-google-client-id.apps.googleusercontent.com` |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret for social login. | `your-google-client-secret` |
|---|---|---|
| `AUTH_EMAIL_SERVER_HOST` | SMTP server host for email authentication. | `smtp.example.com` |
| `AUTH_EMAIL_SERVER_PORT` | SMTP server port for email authentication. | `587` |
|---|---|---|
| `AUTH_EMAIL_SERVER_USER` | SMTP server username for email authentication. | `user@example.com` |
| `AUTH_EMAIL_SERVER_PASSWORD` | SMTP server password for email authentication. | `your-smtp-password` |
|---|---|---|
| `AUTH_EMAIL_FROM` | Email address used as the sender for authentication emails. | `noreply@wordgrind.com` |
| `UPSTASH_REDIS_REST_URL` | REST URL for your Upstash Redis instance. | `https://your-redis-url.upstash.io` |
|---|---|---|
| `UPSTASH_REDIS_REST_TOKEN` | REST token for your Upstash Redis instance. | `your-redis-token` |
| `GOOGLE_AI_API_KEY` | API key for Google AI services (e.g., Gemini). | `your-google-ai-api-key` |
|---|---|---|
| `MISTRAL_API_KEY` | API key for Mistral AI services. | `your-mistral-api-key` |
| `RESEND_API_KEY` | API key for Resend email service. | `re_yourresendapikey` |
|---|---|---|
| `POLAR_SH_PUBLIC_KEY` | Public key for Polar Payments integration. | `pk_live_yourpolarpublickey` |
| `AWS_ACCESS_KEY_ID` | AWS Access Key ID for S3 storage (if used for image uploads). | `AKIAIOSFODNN7EXAMPLE` |
|---|---|---|
| `AWS_SECRET_ACCESS_KEY` | AWS Secret Access Key for S3 storage. | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | AWS region for S3 storage. | `us-east-1` |
|---|---|---|
| `AWS_S3_BUCKET_NAME` | Name of the S3 bucket for storage. | `wordgrind-uploads` |
| `NEXT_PUBLIC_APP_URL` | Public URL of the application, used for callbacks. | `http://localhost:3000` |
|---|---|---|



## Usage

To start the development server:

```bash
yarn dev

```
This will run the application in development mode, typically accessible at `http://localhost:3000`.

To build the application for production:

```bash
yarn build

```
To start the built application in production mode:

```bash
yarn start

```
## Project Structure

```
.

├── public/
├── src/

│   ├── app/                 # Next.js App Router pages and layouts
│   │   ├── (auth)/          # Authentication routes (sign-in, sign-up)

│   │   ├── api/             # API routes (auth, tRPC)
│   │   └── ...              # Other application pages

│   ├── components/          # Reusable React components (UI, forms)
│   │   └── ui/              # Shadcn UI components

│   ├── env.js               # Environment variable validation (t3-oss/env-nextjs)
│   ├── lib/                 # Utility functions, auth client, etc.

│   ├── server/              # Server-side logic (tRPC, Drizzle DB, auth)
│   │   ├── api/             # tRPC routers and procedures

│   │   └── db/              # Drizzle ORM schema and database client
│   └── styles/              # Global CSS and Tailwind directives

├── drizzle/                 # Drizzle migrations directory
├── drizzle.config.ts        # Drizzle ORM configuration

├── eslint.config.js         # ESLint configuration
├── next.config.js           # Next.js configuration

├── package.json             # Project dependencies and scripts
├── postcss.config.js        # PostCSS configuration

├── prettier.config.js       # Prettier configuration
├── tsconfig.json            # TypeScript configuration

└── yarn.lock                # Yarn dependency lock file

```



