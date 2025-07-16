# Next.js 15 Best Practices

## Overview

Next.js 15 introduces significant improvements in performance, developer experience, and React 19 support. This guide covers the essential best practices for building modern, scalable applications with Next.js 15.

## Core Principles

### 1. Server-First Architecture

Next.js 15 defaults to Server Components, enabling better performance and security:

```typescript
// ✅ Good: Server Component by default
// app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    headers: {
      'Authorization': `Bearer ${process.env.API_KEY}` // Secure on server
    }
  })
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductList products={products} />
}
```

### 2. Client Components When Necessary

Use Client Components only for interactivity:

```typescript
// ✅ Good: Client Component for interactivity
// app/components/search-bar.tsx
'use client'

import { useState } from 'react'

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('')
  
  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value)
        onSearch(e.target.value)
      }}
    />
  )
}
```

## Project Structure

### Recommended Directory Structure

```
app/
├── (auth)/                 # Route groups for organization
│   ├── login/
│   └── register/
├── (dashboard)/
│   ├── layout.tsx         # Shared layout
│   ├── page.tsx
│   └── settings/
├── api/                   # API routes
│   └── users/
│       └── route.ts
├── components/            # Shared components
│   ├── ui/               # UI components
│   └── features/         # Feature-specific components
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
└── types/                # TypeScript types
```

### File Naming Conventions

```typescript
// ✅ Good: Clear, consistent naming
user-profile.tsx         // Components
use-user.ts             // Hooks
user.types.ts           // Types
get-user.ts             // Utilities

// ❌ Avoid: Inconsistent naming
UserProfile.tsx
useuser.ts
UserTypes.ts
```

## Data Fetching

### Server-Side Data Fetching

```typescript
// ✅ Good: Fetch data on the server
// app/posts/page.tsx
export default async function PostsPage() {
  // This runs on the server, keeping API keys secure
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // Cache for 1 hour
  }).then(res => res.json())

  return <PostList posts={posts} />
}
```

### Parallel Data Fetching

```typescript
// ✅ Good: Fetch data in parallel
export default async function DashboardPage() {
  // Start all fetches simultaneously
  const [user, posts, comments] = await Promise.all([
    getUser(),
    getPosts(),
    getComments()
  ])

  return (
    <Dashboard 
      user={user}
      posts={posts}
      comments={comments}
    />
  )
}
```

## Caching Strategies (Next.js 15)

### Understanding New Defaults

Next.js 15 changed caching defaults to be uncached by default:

```typescript
// Explicit caching strategies
// 1. Force cache (store indefinitely)
const staticData = await fetch('https://api.example.com/static', {
  cache: 'force-cache'
})

// 2. No store (never cache)
const dynamicData = await fetch('https://api.example.com/dynamic', {
  cache: 'no-store'
})

// 3. Revalidate (time-based caching)
const revalidatedData = await fetch('https://api.example.com/posts', {
  next: { revalidate: 60 } // Revalidate every 60 seconds
})

// 4. On-demand revalidation
import { revalidatePath, revalidateTag } from 'next/cache'

// In a Server Action
async function updatePost() {
  // Update post...
  revalidatePath('/posts')
  // or
  revalidateTag('posts')
}
```

## Performance Optimization

### 1. Image Optimization

```typescript
// ✅ Good: Use Next.js Image component
import Image from 'next/image'

export function ProductCard({ product }) {
  return (
    <Image
      src={product.image}
      alt={product.name}
      width={400}
      height={300}
      loading="lazy"
      placeholder="blur"
      blurDataURL={product.blurDataURL}
    />
  )
}
```

### 2. Font Optimization

```typescript
// ✅ Good: Use next/font for optimal loading
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

### 3. Bundle Size Optimization

```typescript
// ✅ Good: Dynamic imports for code splitting
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Only load on client if needed
})
```

## TypeScript Best Practices

### Type Safety Throughout

```typescript
// ✅ Good: Properly typed components
interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: PageProps) {
  // TypeScript knows the shape of params and searchParams
  const { id } = params
  const { sort } = searchParams
  
  return <div>...</div>
}
```

### API Route Types

```typescript
// ✅ Good: Type-safe API routes
import { NextRequest, NextResponse } from 'next/server'

interface User {
  id: string
  name: string
  email: string
}

export async function GET(request: NextRequest) {
  const users: User[] = await getUsers()
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const body: Partial<User> = await request.json()
  const newUser = await createUser(body)
  return NextResponse.json(newUser, { status: 201 })
}
```

## React 19 and Turbopack

### Leveraging React 19 Features

```typescript
// ✅ Good: Use React 19's improved form handling
import { useActionState } from 'react'

function ContactForm() {
  const [state, formAction] = useActionState(submitForm, { 
    message: '' 
  })

  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <button type="submit">Submit</button>
      {state.message && <p>{state.message}</p>}
    </form>
  )
}
```

### Turbopack Development

```bash
# ✅ Good: Use Turbopack for faster development
next dev --turbo

# Configure in package.json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start"
  }
}
```

## Security Best Practices

### 1. Environment Variables

```typescript
// ✅ Good: Use server-only environment variables
// .env.local
DATABASE_URL=postgresql://...
API_SECRET_KEY=secret_key_here

// Access only on server
const db = new Database(process.env.DATABASE_URL)

// For client-side variables, prefix with NEXT_PUBLIC_
// NEXT_PUBLIC_API_URL=https://api.example.com
```

### 2. Server Actions Security

```typescript
// ✅ Good: Validate and authorize in Server Actions
'use server'

import { auth } from '@/lib/auth'
import { z } from 'zod'

const updateProfileSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email()
})

export async function updateProfile(formData: FormData) {
  // Authenticate
  const session = await auth()
  if (!session) {
    throw new Error('Unauthorized')
  }

  // Validate
  const validatedData = updateProfileSchema.parse({
    name: formData.get('name'),
    email: formData.get('email')
  })

  // Update
  await updateUser(session.user.id, validatedData)
}
```

## Error Handling

### Graceful Error Boundaries

```typescript
// ✅ Good: Comprehensive error handling
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <details>
        <summary>Error details</summary>
        <pre>{error.message}</pre>
      </details>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

## Testing Strategies

### Component Testing

```typescript
// ✅ Good: Test Server and Client Components
import { render } from '@testing-library/react'
import { ProductCard } from './product-card'

describe('ProductCard', () => {
  it('renders product information', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 99.99
    }
    
    const { getByText } = render(<ProductCard product={product} />)
    
    expect(getByText('Test Product')).toBeInTheDocument()
    expect(getByText('$99.99')).toBeInTheDocument()
  })
})
```

## Monitoring and Analytics

### Performance Monitoring

```typescript
// ✅ Good: Use instrumentation for monitoring
// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initializeMonitoring } = await import('./lib/monitoring')
    initializeMonitoring()
  }
}
```

## Migration Checklist

- [ ] Update to Next.js 15 using `npx @next/codemod@canary upgrade latest`
- [ ] Enable Turbopack for development
- [ ] Review and update caching strategies
- [ ] Migrate to App Router incrementally
- [ ] Implement proper error boundaries
- [ ] Add TypeScript for type safety
- [ ] Optimize images and fonts
- [ ] Implement monitoring and analytics
- [ ] Review security practices
- [ ] Update testing strategies

## Summary

Following these best practices will help you build performant, scalable, and maintainable applications with Next.js 15. Remember to:

1. Leverage Server Components by default
2. Use Client Components only when necessary
3. Implement proper caching strategies
4. Maintain type safety throughout your application
5. Monitor performance and errors in production