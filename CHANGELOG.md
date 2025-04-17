# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/).

## [MOCKUP] - 2025-04-17

### Added
- Se agregaron `paths` faltantes o inválidos en `tsconfig.json`
- Se creó `postcss.config.js` con `{ tailwindcss: {}, autoprefixer: {} }`
- Se creó `lib/utils.ts` con la función `cn()` usada para concatenar `className`
- Se agregó `images.unsplash.com` a `next.config.ts` para permitir imágenes remotas en `<Image />`
- Se tiparon explícitamente `query`, `variables` y `handle` en `shopifyFetch` y `getProductByHandle`
- Se creó `CategoryPageClient.tsx` para mover la lógica interactiva de productos y filtros a un componente cliente

### Changed
- Se trasladó el filtrado, mapeo y lógica de categorías desde `page.tsx` hacia `CategoryPageClient`, separando lógica Server/Client
- Se mantuvo compatibilidad con `lucide-react`, `useLanguage`, filtros y estilos existentes durante la refactorización de `CategoryPage`
- Se corrigieron y reorganizaron imports en archivos de productos (`ProductCard`, filtros), asegurando estructura limpia
- Se reemplazaron rutas anidadas (`atoms/button`) por estructura plana (`ui/button`)
- Se actualizó `next.config.ts` para usar `images.remotePatterns` en lugar de `images.domains` (deprecated)

### Fixed
- Se confirmó que `tailwind.config.js` era el archivo correcto y se eliminó conflicto con `tailwind.config.ts`
- Se eliminó la carpeta `.next/` bloqueada usando PowerShell como administrador (archivos `trace` en uso)
- Se solucionó `border-border` asegurando que los colores usen `hsl(var(--border))` en `tailwind.config.js`
- Se bajó Tailwind de v4 a v3 para restaurar compatibilidad con `@tailwind`, `@apply` y componentes ShadCN
- Se reemplazó `@apply bg-background` con `background-color: hsl(var(--background))` directamente
- Se corrigió el import de `use-toast` apuntando a `@/hooks/use-toast`
- Se usó `--legacy-peer-deps` al correr `npx shadcn add` por problemas con React 19
- Se eliminó `.next/` frecuentemente para evitar builds antiguos y caché de Turbopack
- Se validó que la estructura de componentes fuera plana (sin `/atoms`, `/organisms`, `/molecules`)
- Se confirmó que los aliases estaban bien configurados: `"components": "@/components"`, `"utils": "@/lib/utils"`
- Se corrigió la importación de `globals.css` usando una ruta relativa (`./globals.css`) desde `app/layout.tsx`
- Se revisó y ajustó el alias `@` en `tsconfig.json` para evitar errores al importar desde rutas como `@/styles`
- Se extendió correctamente el tipo `variant` en un wrapper de botón para aceptar `"primary"` sin conflicto
- Se aplicaron clases desde `button.module.css` usando `.primary` sin romper los tipos del botón base ShadCN
- Se resolvió el error de acceso dinámico con `translations[language][key]` usando `as Record<string, string>`
- Se identificaron URLs 404 y se recomendó reemplazarlas por otras válidas o locales (`/public`)
