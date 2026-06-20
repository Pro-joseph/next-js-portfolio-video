# Changes needed for Vercel 500 fix

## 1. src/lib/prisma.ts
Add `authToken: process.env.TURSO_AUTH_TOKEN,` after the url line

## 2. src/lib/auth.ts
Wrap requireAdmin() body in try/catch, redirect to /admin/login on error

## 3. next.config.ts
Change `serverExternalPackages: ['bcryptjs']` to include `@libsql/client`, `@prisma/adapter-libsql`, `@prisma/client`

## 4. package.json
Change build script to include `npx prisma db push --accept-data-loss` after `npx prisma generate`
