# Salone Assist Monorepo

This repository contains the codebase for Salone Assist, structured as two independent Next.js applications in a side-by-side structure.

## Applications   

- `main-app`: The main user-facing application for Salone Assist.
- `admin-app`: The administration interface for managing the platform.

## Development

To work on either project, open a terminal in its respective directory and run the development server.

### Main App  
```bash
cd main-app
npm install
npm run dev
```

### Admin App
```bash
cd admin-app
npm install
npm run dev
```

## Deployment

These applications are designed to be deployed separately as distinct projects on Vercel:

1. **Main App**: Set the Root Directory to `main-app/` and map to `saloneassist.com`.
2. **Admin App**: Set the Root Directory to `admin-app/` and map to `admin.saloneassist.com`.
