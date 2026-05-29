# SaldApp — Frontend

División inteligente de gastos grupales.

---

## Stack

| Elemento                | Elección                      |
| ----------------------- | ----------------------------- |
| Lenguaje                | JavaScript ES6+               |
| Framework UI            | React 18                      |
| Build Tool / Dev Server | Vite                          |
| Enrutamiento            | React Router DOM v6           |
| Cliente HTTP            | Axios                         |
| Arquitectura            | Layered Frontend Architecture |

---

## Requisitos previos

- Node.js 22+
- npm 11+
- Backend de SaldApp corriendo en `http://localhost:8080` (referirse al repositorio del backend para instrucciones)

---

## Levantar el proyecto

**1. Clonar el repositorio**.

```bash
git clone https://github.com/leandro-mc/saldapp-frontend.git
cd saldapp-frontend
```

**2. Crear el archivo `.env`** a partir del ejemplo:

```bash
cp .env.example .env
```

**3. Instalar dependencias**.

```bash
npm install
```

**4. Correr la aplicación**.

```bash
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

---

## Estructura del proyecto

``` readme
src/
│
├── config/
│   └── httpClient.js        # Instancia única de Axios con baseURL e interceptors
│
├── utils/
│
├── types/                   # Contratos de datos (JSDoc). Sin lógica, solo forma
│
├── services/                # Funciones que hablan con la API. Sin estado, sin React
│
├── hooks/                   # Lógica, estado y orquestación. Un hook por responsabilidad
│
├── components/              # Piezas de UI. Reciben datos por props, no llaman servicios
│   ├── shared/
│   ├── group/
│   ├── integrant/
│   ├── expense/
│   ├── balance/
│   └── settlement/
│
├── pages/                   # Una por pantalla. Compone hooks y components
│   ├── HomePage.jsx          # Crear grupo o ingresar a uno existente por ID
│   └── GroupPage.jsx         # Gestión completa del grupo activo
│
├── App.jsx                  # Router principal con rutas / y /groups/:id
└── main.jsx                 # Punto de entrada, monta React en el DOM
```

---

## Variables de entorno

Crear un `.env` en la raíz del proyecto basado en `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

> Las variables deben tener el prefijo `VITE_` para ser accesibles en el código.

---

## Rutas

| Ruta          | Página      | Descripción                                                            |
| ------------- | ----------- | ---------------------------------------------------------------------- |
| `/`           | `HomePage`  | Crear un grupo nuevo o acceder a uno existente por ID                  |
| `/groups/:id` | `GroupPage` | Gestión completa del grupo: integrantes, gastos, balance y liquidación |

---

## Autor

**Leandro Mora Corrales**  
[linkedin.com/in/leandromora](https://linkedin.com/in/leandromora)

---

## Licencia

MIT License — see [LICENSE](LICENSE) for details.
