# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/).

## [MOCKUP] - 2025-04-16

### Fixed
- Se encontró `Cannot read properties of undefined (reading 'resolvedPaths')` — causado por `paths` faltantes o inválidos en `tsconfig.json`
- Se confirmó que `tailwind.config.js` era el archivo correcto y se eliminó conflicto con `tailwind.config.ts`
- Se eliminó la carpeta `.next/` bloqueada usando PowerShell como administrador (archivos `trace` en uso)
- Se solucionó `border-border` asegurando que los colores usen `hsl(var(--border))` en `tailwind.config.js`
- Se bajó Tailwind de v4 a v3 para restaurar compatibilidad con `@tailwind`, `@apply` y componentes ShadCN
- Se creó `postcss.config.js` con `{ tailwindcss: {}, autoprefixer: {} }`
- Se reemplazó `@apply bg-background` con `background-color: hsl(var(--background))` directamente
- Se actualizaron imports rotos de rutas anidadas (`atoms/button`) a estructura plana (`ui/button`, `header`)
- Se creó `lib/utils.ts` con la función `cn()` usada para concatenar `className`
- Se corrigió el import de `use-toast` apuntando a `@/hooks/use-toast`
- Se agregó `images.unsplash.com` a `next.config.ts` para permitir imágenes remotas en `<Image />`
- Se usó `--legacy-peer-deps` al correr `npx shadcn add` por problemas con React 19
- Se eliminó `.next/` frecuentemente para evitar builds antiguos y caché de Turbopack
- Se validó que la estructura de componentes fuera plana (sin `/atoms`, `/organisms`, `/molecules`)
- Se confirmó que los aliases estaban bien configurados: `"components": "@/components"`, `"utils": "@/lib/utils"`
- Se corrigió la importación de `globals.css` usando una ruta relativa (`./globals.css`) desde `app/layout.tsx`
- Se revisó y ajustó el alias `@` en `tsconfig.json` para evitar errores al importar desde rutas como `@/styles`
- Se extendió correctamente el tipo `variant` en un wrapper de botón para aceptar `"primary"` sin conflicto.
- Se aplicaron clases desde `button.module.css` usando `.primary` sin romper los tipos del botón base ShadCN.
- Se resolvió el error de acceso dinámico con `translations[language][key]` usando `as Record<string, string>`
- Se tiparon explícitamente `query`, `variables` y `handle` en `shopifyFetch` y `getProductByHandle`
- Se actualizó `next.config.ts` para usar `images.remotePatterns` en lugar de `images.domains` (deprecated)
- Se identificaron URLs 404 y se recomendó reemplazarlas por otras válidas o locales (`/public`)