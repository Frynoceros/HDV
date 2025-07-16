# Next.js 15: New Features and Updates

## Overview

Next.js 15 represents a major evolution in the framework, introducing React 19 support, performance improvements through Turbopack, and significant changes to caching behavior. This guide covers all the new features and breaking changes in Next.js 15.

## Major Features

### 1. React 19 Support

Next.js 15 introduces support for React 19 RC (Release Candidate), bringing cutting-edge React features to your applications:

```typescript
// React 19 features now available in Next.js 15
// Using the new useActionState hook (replacing useFormState)
'use client'

import { useActionState } from 'react'

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (previousState, formData) => {
      const result = await submitForm(formData)
      return { message: result.message }
    },
    { message: '' }
  )

  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  )
}
```

#### Backward Compatibility
- App Router uses React 19 RC
- Pages Router maintains React 18 compatibility
- Allows gradual migration to React 19

### 2. Turbopack Dev (Stable)

Turbopack is now stable for development, offering dramatic performance improvements:

```bash
# Enable Turbopack for development
next dev --turbo
```

**Performance Improvements:**
- **76.7% faster** local server startup
- **96.3% faster** code updates with Fast Refresh
- **45.8% faster** initial route compilation

```json
// package.json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start"
  }
}
```

### 3. Breaking Change: Caching Defaults

Next.js 15 changes the default caching behavior from "cached by default" to "uncached by default":

```typescript
// Next.js 14 (cached by default)
const res = await fetch('https://api.example.com/data')

// Next.js 15 (uncached by default)
const res = await fetch('https://api.example.com/data')

// Opt into caching in Next.js 15
const cachedRes = await fetch('https://api.example.com/data', {
  cache: 'force-cache'
})

// Time-based revalidation
const revalidatedRes = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 } // Revalidate every hour
})
```

#### GET Route Handlers
```typescript
// app/api/data/route.ts
import { NextResponse } from 'next/server'

// Previously cached by default, now uncached
export async function GET() {
  const data = await fetchData()
  return NextResponse.json(data)
}

// Opt into caching
export const revalidate = 3600 // Cache for 1 hour
// or
export const dynamic = 'force-static'
```

#### Client Router Cache
```typescript
// next.config.js
module.exports = {
  experimental: {
    staleTimes: {
      // Configure client-side router cache
      dynamic: 30, // 30 seconds
      static: 180, // 3 minutes
    },
  },
}
```

### 4. Async Request APIs (Breaking)

Request-specific APIs are now async, preparing for future streaming capabilities:

```typescript
// Before (Next.js 14)
import { cookies, headers } from 'next/headers'

export function MyComponent() {
  const token = cookies().get('token')
  const userAgent = headers().get('user-agent')
}

// After (Next.js 15)
import { cookies, headers } from 'next/headers'

export async function MyComponent() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
}
```

### 5. New `unstable_after` API

Execute code after the response has been streamed to the user:

```typescript
import { unstable_after as after } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  
  // Send response immediately
  const response = NextResponse.json({ success: true })
  
  // Execute after response is sent
  after(() => {
    // Log analytics
    console.log('Request processed:', data)
    
    // Send webhooks
    sendWebhook({ event: 'user.created', data })
    
    // Update cache
    revalidatePath('/users')
  })
  
  return response
}
```

### 6. Enhanced Form Component

New `<Form>` component with built-in client-side navigation:

```typescript
import Form from 'next/form'

export default function SearchPage() {
  return (
    <Form action="/search">
      <input name="query" placeholder="Search..." />
      <button type="submit">Search</button>
    </Form>
  )
}

// With Server Actions
export default function ContactPage() {
  async function handleSubmit(formData: FormData) {
    'use server'
    // Process form
    redirect('/thank-you')
  }

  return (
    <Form action={handleSubmit}>
      <input name="email" type="email" required />
      <textarea name="message" required />
      <button type="submit">Send</button>
    </Form>
  )
}
```

### 7. Instrumentation API (Stable)

Monitor server lifecycle and performance:

```typescript
// instrumentation.ts (or .js)
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Initialize monitoring, telemetry, or logging
    const { initTelemetry } = await import('./telemetry')
    initTelemetry()
  }
}

export async function onRequestError(
  error: Error,
  request: Request,
  context: {
    routePath: string
    routeType: 'app' | 'pages' | 'api'
    renderSource: 'react-server-components' | 'react-server-components-payload' | 'server-rendering'
  }
) {
  // Log errors to external service
  await logError({
    error: error.message,
    request: request.url,
    route: context.routePath,
    type: context.routeType,
  })
}
```

### 8. React Compiler (Experimental)

Automatic optimization through deep code understanding:

```typescript
// next.config.js
module.exports = {
  experimental: {
    reactCompiler: true,
  },
}

// The compiler automatically optimizes:
// - Memoization
// - Component updates
// - Hook dependencies
```

### 9. Enhanced Codemod CLI

Automated upgrade tool for smoother migrations:

```bash
# Upgrade to latest Next.js
npx @next/codemod@canary upgrade latest

# Apply specific codemods
npx @next/codemod@latest <codemod-name> <path>

# Interactive mode shows available codemods
npx @next/codemod@latest
```

### 10. Static Route Indicator

Visual indicator in development for static routes:

```typescript
// Routes are marked with indicators in dev mode:
// ○ Static route (ISR or prerendered)
// λ Dynamic route (rendered on-demand)
// ƒ Dynamic route with generateStaticParams
```

### 11. Bundling External Packages (Stable)

Improved control over package bundling:

```typescript
// next.config.js
module.exports = {
  // App Router: Exclude specific packages from bundling
  serverExternalPackages: ['@acme/ui'],
  
  // Pages Router: Include packages in server bundle
  bundlePagesRouterDependencies: true,
  
  // Control specific packages
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'bcrypt'],
  },
}
```

### 12. ESLint 9 Support

Support for the latest ESLint version:

```typescript
// .eslintrc.json (old format still supported)
{
  "extends": "next/core-web-vitals"
}

// eslint.config.js (new flat config)
import nextPlugin from '@next/eslint-plugin-next'

export default [
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
]
```

### 13. Improved Hydration Error Messages

More helpful error messages for hydration mismatches:

```
Error: Hydration failed because the server rendered HTML didn't match the client.
  
  Server: <div class="server-class">
  Client: <div class="client-class">
  
  See more info here: https://nextjs.org/docs/messages/react-hydration-error
```

### 14. Server Action Security

Enhanced security with unguessable IDs:

```typescript
// Server Actions now have unguessable IDs
// Previously: predictable IDs based on function names
// Now: cryptographically secure random IDs

'use server'

export async function deleteUser(id: string) {
  // This action gets a secure, unguessable ID
  await db.user.delete({ where: { id } })
}
```

## Performance Improvements

### Build Performance

```bash
# Faster builds with improved caching
next build

# New build output with detailed metrics
Route (app)                              Size     First Load JS
┌ ○ /                                    5.3 kB        89.4 kB
├ ○ /about                               3.1 kB        87.2 kB
└ λ /api/hello                           0 B           0 B
```

### Development Performance

With Turbopack enabled:
- Hot Module Replacement (HMR) updates in ~10ms
- Initial compilation 45.8% faster
- Memory usage optimized for large applications

## Migration Tools

### Automated Codemods

```bash
# List available codemods
npx @next/codemod@latest list

# Common migration codemods
npx @next/codemod@latest next-async-request-api .
npx @next/codemod@latest next-og-import .
npx @next/codemod@latest cached-default-to-no-store .
```

## Updated Dependencies

### Minimum Requirements

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0-rc",
    "react-dom": "^19.0.0-rc"
  },
  "devDependencies": {
    "eslint": "^9.0.0",
    "typescript": "^5.0.0"
  }
}
```

## Breaking Changes Summary

1. **Caching**: No longer cached by default
2. **Async APIs**: cookies(), headers(), params, searchParams now async
3. **React Version**: Minimum React 19 for App Router
4. **Runtime Config**: Deprecated in favor of environment variables
5. **Metadata**: Some metadata APIs have changed

## Upgrade Checklist

- [ ] Run upgrade codemod: `npx @next/codemod@canary upgrade latest`
- [ ] Update React to version 19 RC (or stay on 18 with Pages Router)
- [ ] Review and update caching strategies
- [ ] Update async request APIs usage
- [ ] Enable Turbopack for development
- [ ] Test hydration and error boundaries
- [ ] Update ESLint configuration if using v9
- [ ] Review Server Action implementations
- [ ] Test build and runtime performance

## Conclusion

Next.js 15 brings significant improvements in performance, developer experience, and React 19 compatibility. While there are breaking changes, the enhanced codemod CLI and comprehensive migration tools make upgrading manageable. The focus on performance with Turbopack and the new default uncached behavior provides more predictable and faster applications out of the box.