# Decisiones pendientes — SaldApp Frontend

> Documento de trabajo. Resume el análisis por capas y deja **cada decisión abierta** para tomarla en una etapa posterior. Nada de lo que aparece como "pendiente" se ha aplicado.

## Estado de esta etapa

| Tema | Resultado |
|------|-----------|
| Rama de control | `dev` (ya existía; se sincronizó con `main`). La rama por defecto sigue siendo `main`. |
| Credenciales en código e historial | Revisados el árbol y los 56 commits de todas las ramas. **No hay credenciales.** Es una aplicación de navegador: todo lo que lleva `VITE_*` queda visible en el paquete final, así que nunca debe contener secretos. |
| Ramas existentes | `dev`, seis ramas `feat/*`, `setup`, `agents/mejorar-interfaz-presentacion-gastos` y `main` (ver D-03 y D-10). |

## Resumen por capas

| Capa | Estado actual | Observación principal |
|------|---------------|-----------------------|
| Base de datos | No aplica; los datos viven en el [backend](https://github.com/leandro-mc/saldapp-backend). | — |
| Datos del cliente | `services/` (Axios con interceptor de errores) y `hooks/` por recurso | Cada hook maneja su propio estado de carga y error. |
| Interfaz | React 19, React Router 7, Tailwind 4, componentes por dominio | Sin TypeScript ni pruebas; los tipos son `@typedef` de JSDoc. |
| Compilación y despliegue | Vite (`dev`, `build`, `preview`) y ESLint | Sin Dockerfile, sin integración continua. |

## Decisiones

### D-01 · Tipado
- **Contexto:** los tipos están como JSDoc (`src/types/*.js`) y nada los verifica; ya hay un error de escritura (`integranId` en `types/balance.js` y `hooks/useExpense.js`).
- **Opciones:** (A) migrar a TypeScript de forma gradual (`allowJs`, archivo por archivo); (B) mantener JSDoc y activar `checkJs`; (C) dejarlo como está.
- **Recomendación:** A. En un portafolio de frontend se espera TypeScript y los servicios y hooks son una buena frontera para empezar.
- **Esfuerzo:** medio. **Decisión:** ☐ pendiente

### D-02 · Pruebas
- **Contexto:** no hay pruebas.
- **Opciones:** (A) Vitest y Testing Library para `utils` (`moneyUtils`, `errorParser`), hooks y los componentes de liquidación; (B) añadir pruebas de extremo a extremo con Playwright contra el backend levantado; (C) ambas.
- **Recomendación:** A primero; B cuando exista el arranque conjunto (D-06).
- **Esfuerzo:** medio. **Decisión:** ☐ pendiente

### D-03 · Rama `agents/mejorar-interfaz-presentacion-gastos`
- **Contexto:** tiene 1 commit sin fusionar (23-ago-2026, 9 archivos, +418 −149) que reorganiza la sección de integrantes (`IntegrantsSection.jsx`), añade un componente `Modal.jsx` y modifica `GroupPage.jsx`.
- **Opciones:** (A) revisar el cambio y fusionarlo a `dev`; (B) rescatar solo partes (por ejemplo el modal); (C) descartarlo.
- **Recomendación:** A tras revisar accesibilidad del modal (D-07).
- **Esfuerzo:** bajo. **Decisión:** ☐ pendiente

### D-04 · Estado del servidor
- **Contexto:** cada hook (`useGroup`, `useExpense`, ...) repite la lógica de carga, error y recarga.
- **Opciones:** (A) adoptar TanStack Query (caché, reintentos e invalidación tras cada mutación); (B) extraer un hook genérico propio; (C) dejarlo.
- **Recomendación:** A si se hace D-01; reduce código y evita balances desactualizados tras editar un gasto.
- **Esfuerzo:** medio. **Decisión:** ☐ pendiente

### D-05 · Contenedor de la interfaz
- **Contexto:** `VITE_API_BASE_URL` se incrusta al compilar, no al ejecutar; un mismo contenedor no sirve para dos backends distintos.
- **Opciones:** (A) Dockerfile multi-etapa (build con Node, servido con nginx) y proxy `/api` hacia el backend en el mismo origen, lo que además evita CORS; (B) Dockerfile con la URL como argumento de build; (C) no contenerizar y desplegar como sitio estático.
- **Recomendación:** A.
- **Esfuerzo:** bajo. **Decisión:** ☐ pendiente

### D-06 · Arranque conjunto con el backend (unificar o no)
Esta decisión **no es obligatoria** y es la misma que aparece como D-07 en el repositorio del backend; se decide una vez para ambos.
- **Opciones:** (A) monorepo con historial de ambos; (B) repos separados con un compose en el backend que construye este frontend desde su URL de Git; (C) cada repo con su propio arranque.
- **Recomendación:** B (sin cambiar URLs ni historiales). Ver el criterio completo en el documento del backend.
- **Esfuerzo:** bajo (B). **Decisión:** ☐ pendiente

### D-07 · Accesibilidad y experiencia
- **Contexto:** los componentes compartidos (`ConfirmDialog`, `ErrorMessage`, `LoadingState`, `SelectList`) no usan atributos `aria-*` ni `role`; el foco en diálogos y el contraste no se han revisado.
- **Opciones:** (A) pasada de accesibilidad (roles, etiquetas, foco atrapado en modales, teclado) y estados vacíos y de error coherentes; (B) solo lo crítico (modales y formularios).
- **Recomendación:** A en una sola rama, junto con D-03.
- **Esfuerzo:** medio. **Decisión:** ☐ pendiente

### D-08 · Higiene de configuración
- **Contexto:** `VITE_APP_NAME` está definida en `.env.example`, pero ningún archivo de `src/` la usa; además el error de escritura `integranId` (D-01).
- **Opciones:** (A) eliminarla o usarla en el título y la marca; (B) corregir solo el error de escritura.
- **Recomendación:** A y corregir el nombre.
- **Esfuerzo:** bajo. **Decisión:** ☐ pendiente

### D-09 · Integración continua y demostración en línea
- **Opciones:** (A) flujo de GitHub Actions con `lint` y `build` en cada `push`; (B) además, publicar una demostración (requiere un backend alojado); (C) solo A.
- **Recomendación:** C ahora; B si se decide alojar el backend.
- **Esfuerzo:** bajo (A). **Decisión:** ☐ pendiente

### D-10 · Ramas
- **Contexto:** `feat/expense`, `feat/group`, `feat/integrant`, `feat/settlement`, `feat/styles` y `setup` no contienen commits que `main` no tenga. `agents/...` se decide en D-03.
- **Recomendación:** borrar las seis ramas fusionadas y dejar `main` y `dev`.
- **Esfuerzo:** bajo. **Decisión:** ☐ pendiente

## Ramas de trabajo propuestas

1. `refactor/typescript-and-tests`: D-01, D-02, D-04, D-08.
2. `feat/accessibility-and-ui`: D-03, D-07.
3. `feat/containers-and-ci`: D-05, D-06, D-09, D-10.

## Orden sugerido

D-03 → D-08 → D-01 → D-02 → D-07 → D-04 → D-05 → D-09 → D-10 → D-06.
