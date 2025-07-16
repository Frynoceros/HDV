# Next.js 15 Documentation Collection

This directory contains comprehensive documentation for Next.js 15, covering migration guides, best practices, and new features.

## Documentation Files

### 1. [Migration Guide: Pages Router to App Router](./migration-pages-to-app-router.md)
A complete step-by-step guide for migrating from the Pages Router to the App Router in Next.js 15, including:
- Incremental migration strategies
- Code examples for common patterns
- Handling data fetching, layouts, and metadata
- Troubleshooting common issues

### 2. [Best Practices](./best-practices.md)
Essential best practices for building production-ready Next.js 15 applications:
- Server-first architecture principles
- Project structure recommendations
- Performance optimization techniques
- TypeScript integration
- Security considerations
- Testing strategies

### 3. [Server Components vs Client Components](./server-client-components.md)
In-depth guide to understanding and using Server and Client Components effectively:
- When to use each component type
- Composition patterns and data flow
- Performance implications
- Common pitfalls and solutions
- Real-world examples

### 4. [New Features in Next.js 15](./new-features.md)
Comprehensive overview of all new features and changes in Next.js 15:
- React 19 support
- Turbopack stable for development
- Breaking changes in caching behavior
- New APIs and components
- Performance improvements
- Migration tools and codemods

## Quick Start

### Upgrading to Next.js 15

```bash
# Automated upgrade
npx @next/codemod@canary upgrade latest

# Manual upgrade
npm install next@latest react@rc react-dom@rc
```

### Enable Turbopack

```json
{
  "scripts": {
    "dev": "next dev --turbo"
  }
}
```

## Key Changes in Next.js 15

1. **Caching**: Default changed from cached to uncached
2. **React 19**: Full support with backward compatibility
3. **Turbopack**: Stable for development with massive performance gains
4. **Async APIs**: Request-specific APIs are now async
5. **Enhanced Forms**: New Form component with client-side navigation

## Resources

- [Official Next.js Documentation](https://nextjs.org/docs)
- [Next.js 15 Blog Post](https://nextjs.org/blog/next-15)
- [Migration Guide](https://nextjs.org/docs/app/guides/migrating/app-router-migration)
- [GitHub Releases](https://github.com/vercel/next.js/releases)

## Last Updated

These documents reflect Next.js 15 as of January 2025, including updates through version 15.3.