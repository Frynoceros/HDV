# Next.js 15: Server Components vs Client Components

## Understanding the Component Model

Next.js 15 leverages React's Server Components architecture to provide a powerful model for building applications. Understanding when and how to use Server Components versus Client Components is crucial for optimal performance and user experience.

## Server Components

### What are Server Components?

Server Components are React components that render on the server. They are the default in Next.js 15's App Router and provide several advantages:

- **Zero client-side JavaScript**: Server Components don't add to your bundle size
- **Direct backend access**: Can directly query databases and access server-only resources
- **Enhanced security**: Keep sensitive data and logic on the server
- **Improved performance**: Reduce the amount of data sent to the client

### When to Use Server Components

Use Server Components for:

1. **Data fetching**
```typescript
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    headers: {
      // This API key never reaches the client
      'Authorization': `Bearer ${process.env.SECRET_API_KEY}`
    }
  })
  return res.json()
}

export default async function PostsPage() {
  const posts = await getPosts()
  
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
```

2. **Static content rendering**
```typescript
// app/about/page.tsx
import { getCompanyInfo } from '@/lib/cms'
import { Markdown } from '@/components/markdown'

export default async function AboutPage() {
  const content = await getCompanyInfo()
  
  return (
    <div>
      <h1>About Us</h1>
      <Markdown content={content} />
    </div>
  )
}
```

3. **Backend integrations**
```typescript
// app/dashboard/analytics/page.tsx
import { db } from '@/lib/database'
import { AnalyticsChart } from './analytics-chart'

export default async function AnalyticsPage() {
  // Direct database query - never exposed to client
  const analytics = await db.analytics.aggregate({
    where: { date: { gte: new Date('2024-01-01') } },
    _sum: { views: true, clicks: true }
  })
  
  return <AnalyticsChart data={analytics} />
}
```

## Client Components

### What are Client Components?

Client Components run in the browser and enable interactivity. They are designated with the `'use client'` directive and can use browser APIs, React hooks, and event handlers.

### When to Use Client Components

Use Client Components for:

1. **Interactive UI elements**
```typescript
// app/components/counter.tsx
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

2. **Form handling**
```typescript
// app/components/contact-form.tsx
'use client'

import { useState } from 'react'
import { submitForm } from '@/app/actions'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      await submitForm(formData)
      alert('Form submitted successfully!')
    } catch (error) {
      alert('Error submitting form')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form action={handleSubmit}>
      <input name="email" type="email" required />
      <textarea name="message" required />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  )
}
```

3. **Browser API usage**
```typescript
// app/components/theme-toggle.tsx
'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  useEffect(() => {
    // Access localStorage (browser API)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }
  }, [])
  
  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
```

## Composition Patterns

### Pattern 1: Server Component with Client Component Children

```typescript
// app/products/page.tsx (Server Component)
import { ProductFilters } from './product-filters'
import { getProducts } from '@/lib/api'

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div>
      <h1>Products</h1>
      {/* Client Component for interactivity */}
      <ProductFilters />
      
      {/* Server-rendered product list */}
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// app/products/product-filters.tsx (Client Component)
'use client'

import { useState } from 'react'

export function ProductFilters() {
  const [category, setCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 1000])
  
  return (
    <div className="filters">
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      {/* More filter controls */}
    </div>
  )
}
```

### Pattern 2: Passing Server Components as Props

```typescript
// app/layout.tsx (Server Component)
import { Sidebar } from './sidebar'
import { getUserData } from '@/lib/auth'

export default async function Layout({ children }) {
  const user = await getUserData()
  
  return (
    <div className="layout">
      <Sidebar user={user} />
      <main>{children}</main>
    </div>
  )
}

// app/sidebar.tsx (Client Component)
'use client'

import { useState } from 'react'

export function Sidebar({ user, children }) {
  const [isOpen, setIsOpen] = useState(true)
  
  return (
    <aside className={isOpen ? 'open' : 'closed'}>
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </button>
      <div>Welcome, {user.name}</div>
      {children}
    </aside>
  )
}
```

### Pattern 3: Server Actions with Client Components

```typescript
// app/actions.ts
'use server'

export async function updateProfile(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  
  // Update in database
  await db.user.update({
    where: { email },
    data: { name }
  })
  
  revalidatePath('/profile')
}

// app/profile/edit-form.tsx (Client Component)
'use client'

import { useFormStatus } from 'react-dom'
import { updateProfile } from '@/app/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save Profile'}
    </button>
  )
}

export function EditProfileForm({ user }) {
  return (
    <form action={updateProfile}>
      <input name="email" type="hidden" value={user.email} />
      <input name="name" defaultValue={user.name} />
      <SubmitButton />
    </form>
  )
}
```

## Best Practices

### 1. Component Boundaries

```typescript
// ✅ Good: Minimal Client Component boundary
// app/posts/[id]/page.tsx (Server Component)
import { getPost } from '@/lib/api'
import { LikeButton } from './like-button'

export default async function PostPage({ params }) {
  const post = await getPost(params.id)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* Only the interactive part is a Client Component */}
      <LikeButton postId={post.id} initialLikes={post.likes} />
    </article>
  )
}

// app/posts/[id]/like-button.tsx (Client Component)
'use client'

import { useState } from 'react'

export function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes)
  const [hasLiked, setHasLiked] = useState(false)
  
  async function handleLike() {
    if (hasLiked) return
    
    setLikes(likes + 1)
    setHasLiked(true)
    
    await fetch(`/api/posts/${postId}/like`, { method: 'POST' })
  }
  
  return (
    <button onClick={handleLike} disabled={hasLiked}>
      ❤️ {likes}
    </button>
  )
}
```

### 2. Data Flow

```typescript
// ✅ Good: Server fetches data, passes to Client Component
// app/dashboard/page.tsx (Server Component)
import { getMetrics } from '@/lib/analytics'
import { MetricsChart } from './metrics-chart'

export default async function DashboardPage() {
  const metrics = await getMetrics()
  
  return (
    <div>
      <h1>Dashboard</h1>
      <MetricsChart data={metrics} />
    </div>
  )
}

// ❌ Avoid: Client Component fetching data
'use client'
// Don't do this if data can be fetched on the server
export function BadMetricsChart() {
  const [metrics, setMetrics] = useState(null)
  
  useEffect(() => {
    fetch('/api/metrics')
      .then(res => res.json())
      .then(setMetrics)
  }, [])
  
  return <div>...</div>
}
```

### 3. Performance Optimization

```typescript
// ✅ Good: Lazy load heavy Client Components
import dynamic from 'next/dynamic'

const HeavyEditor = dynamic(() => import('./heavy-editor'), {
  loading: () => <p>Loading editor...</p>,
  ssr: false
})

export default function PostEditor() {
  return (
    <div>
      <h1>Edit Post</h1>
      <HeavyEditor />
    </div>
  )
}
```

## Common Pitfalls and Solutions

### Pitfall 1: Importing Server-Only Code in Client Components

```typescript
// ❌ Wrong: This will fail
'use client'
import { db } from '@/lib/database' // Server-only code

export function BadComponent() {
  // Cannot use database in client component
  const data = db.query()
  return <div>{data}</div>
}

// ✅ Correct: Fetch data on server, pass to client
// Parent Server Component
import { db } from '@/lib/database'
import { GoodComponent } from './good-component'

export default async function Page() {
  const data = await db.query()
  return <GoodComponent data={data} />
}
```

### Pitfall 2: Unnecessary Client Components

```typescript
// ❌ Unnecessary Client Component
'use client'
export function StaticContent() {
  return (
    <div>
      <h1>About Us</h1>
      <p>We are a company...</p>
    </div>
  )
}

// ✅ Better: Keep as Server Component
export function StaticContent() {
  return (
    <div>
      <h1>About Us</h1>
      <p>We are a company...</p>
    </div>
  )
}
```

## Summary

- **Server Components**: Default, render on server, no JavaScript sent to client
- **Client Components**: Opt-in with `'use client'`, enable interactivity
- **Use Server Components** for data fetching, static content, and backend access
- **Use Client Components** for interactivity, browser APIs, and state management
- **Compose thoughtfully**: Keep Client Component boundaries small and focused