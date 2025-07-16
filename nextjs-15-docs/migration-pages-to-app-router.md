# Next.js 15: Migration Guide from Pages Router to App Router

## Overview

The App Router is Next.js's recommended approach for building applications, offering modern React features like Server Components, Suspense, and enhanced data fetching. This guide provides a comprehensive, step-by-step approach to migrating from the Pages Router to the App Router in Next.js 15.

## Key Concepts

### Incremental Migration
- The App Router works simultaneously with the Pages Router
- Migrate page-by-page at your own pace
- No need to migrate everything at once

### Major Differences
1. **Server Components by Default**: Components in the App Router are Server Components unless marked with `'use client'`
2. **New File Conventions**: Special files like `layout.tsx`, `loading.tsx`, and `error.tsx`
3. **Enhanced Data Fetching**: Direct async/await in components
4. **Improved Layouts**: Nested layouts with preserved state

## Migration Steps

### Step 1: Update to Next.js 15

```bash
# Use the automated upgrade CLI
npx @next/codemod@canary upgrade latest

# Or manually upgrade
npm install next@latest react@rc react-dom@rc
```

### Step 2: Create the App Directory

Create a new `app` directory at the root of your project, alongside the existing `pages` directory:

```
your-project/
├── app/            # New App Router
├── pages/          # Existing Pages Router
├── public/
└── package.json
```

### Step 3: Migrate Root Layout

Create `app/layout.tsx` to replace `pages/_app.tsx` and `pages/_document.tsx`:

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

If you have global styles or providers in `_app.tsx`:

```typescript
// app/layout.tsx
import './globals.css'
import { ThemeProvider } from './providers/theme-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Step 4: Migrate Pages

#### Basic Page Migration

**Pages Router:**
```typescript
// pages/about.tsx
export default function AboutPage() {
  return <h1>About Us</h1>
}
```

**App Router:**
```typescript
// app/about/page.tsx
export default function AboutPage() {
  return <h1>About Us</h1>
}
```

#### Pages with Data Fetching

**Pages Router (getServerSideProps):**
```typescript
// pages/posts/[id].tsx
export async function getServerSideProps({ params }) {
  const post = await getPost(params.id)
  return { props: { post } }
}

export default function Post({ post }) {
  return <article>{post.title}</article>
}
```

**App Router:**
```typescript
// app/posts/[id]/page.tsx
async function getPost(id: string) {
  const res = await fetch(`https://api.example.com/posts/${id}`)
  return res.json()
}

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  return <article>{post.title}</article>
}
```

### Step 5: Migrate Client Components

For components that need client-side features (state, effects, browser APIs):

**Pages Router:**
```typescript
// components/counter.tsx
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

**App Router:**
```typescript
// app/components/counter.tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

### Step 6: Migrate API Routes

API Routes remain largely the same but with new conventions:

**Pages Router:**
```typescript
// pages/api/users.ts
export default function handler(req, res) {
  res.status(200).json({ users: [] })
}
```

**App Router:**
```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ users: [] })
}

export async function POST(request: Request) {
  const body = await request.json()
  // Process the request
  return NextResponse.json({ success: true })
}
```

### Step 7: Update Dynamic Routes

**Pages Router:**
```
pages/blog/[slug].tsx
pages/shop/[...categories].tsx
```

**App Router:**
```
app/blog/[slug]/page.tsx
app/shop/[...categories]/page.tsx
```

### Step 8: Metadata Migration

**Pages Router:**
```typescript
// pages/about.tsx
import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Learn about our company" />
      </Head>
      <h1>About Us</h1>
    </>
  )
}
```

**App Router:**
```typescript
// app/about/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our company',
}

export default function About() {
  return <h1>About Us</h1>
}
```

## Common Patterns and Solutions

### Handling Authentication

```typescript
// app/dashboard/layout.tsx
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/login')
  }

  return <>{children}</>
}
```

### Error Handling

Create `error.tsx` files for error boundaries:

```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### Loading States

Create `loading.tsx` files for automatic loading UI:

```typescript
// app/posts/loading.tsx
export default function Loading() {
  return <div>Loading posts...</div>
}
```

## Caching Considerations in Next.js 15

With Next.js 15, caching defaults have changed:

```typescript
// Opt into caching (previous default behavior)
const res = await fetch('https://api.example.com/data', {
  cache: 'force-cache'
})

// Or use revalidation
const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 } // Revalidate every hour
})
```

## Best Practices

1. **Start Small**: Begin with less complex pages
2. **Test Incrementally**: Verify each migrated page works correctly
3. **Use Codemods**: Leverage Next.js codemods for automated migrations
4. **Keep Both Routers**: Run Pages and App Router side-by-side during migration
5. **Monitor Performance**: Compare metrics before and after migration

## Troubleshooting

### Common Issues

1. **Hydration Errors**: Ensure server and client render the same content
2. **Missing Styles**: Import global styles in the root layout
3. **API Route Issues**: Update to new Route Handler syntax
4. **Dynamic Imports**: Update dynamic import patterns for client components

### Debugging Tips

```typescript
// Enable detailed error messages in development
// next.config.js
module.exports = {
  reactStrictMode: true,
}
```

## Resources

- [Official Migration Guide](https://nextjs.org/docs/app/guides/migrating/app-router-migration)
- [App Router Documentation](https://nextjs.org/docs/app)
- [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-15)