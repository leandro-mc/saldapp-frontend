# Análisis técnico — SaldApp Frontend

Documento de apoyo para futuras mejoras. No forma parte de la documentación principal.

## Qué es y cómo está construido

SPA en React 19 + Vite de ~1.700 líneas en JavaScript (sin TypeScript). Dos páginas (`/` y `/groups/:id`) que consumen la API REST del backend.

## Arquitectura

Frontend en capas, con responsabilidades claras:

- `services/`: una función de acceso a la API por recurso.
- `hooks/`: encapsulan carga, mutaciones y estado de cada recurso (`useGroup`, `useExpense`, ...).
- `components/` organizados por dominio, más componentes compartidos (`ConfirmDialog`, `ErrorMessage`, `LoadingState`).
- `config/httpClient.js` centraliza Axios; un interceptor convierte los errores en `ApiError` estandarizado.

Es un buen punto de partida: la UI no llama a la API directamente.

## Oportunidades principales

1. **Pruebas.** No hay tests. Los hooks y `utils` (`moneyUtils`, `errorParser`) son candidatos fáciles con Vitest + Testing Library.
2. **Caché y sincronización de datos.** Cada hook gestiona su propio estado de carga. TanStack Query evitaría duplicar lógica de loading/refetch e invalidaría balances al cambiar un gasto.
3. **TypeScript.** Los tipos están como JSDoc `@typedef` en `src/types/`; migrar a TS los haría verificables. Ya hay un typo (`integranId` en `balance.js`) que el compilador habría detectado.
4. **Manejo de dinero.** Revisar que los importes no se operen como `float` en el cliente; el cálculo autoritativo debe seguir en el backend.

## Prácticas a revisar

- **Accesibilidad:** revisar etiquetas de formularios, foco en diálogos de confirmación y contraste.
- **Variables de entorno:** `VITE_APP_NAME` se define en `.env.example`; verificar que realmente se use.
- **Rama sin integrar:** existe `agents/mejorar-interfaz-presentacion-gastos`, con cambios posteriores a `main`. Revisar y fusionar o eliminar.
- Falta CI (lint + build en cada push) y despliegue automatizado.
