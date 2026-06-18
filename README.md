# SaldApp — Frontend

Smart splitting of group expenses.

README also available in:

- [Spanish](README.es.md)

---

## Preview

### Home
<p>
  <img src="docs/screenshots/home.png" width="800" alt="Main screen">
</p>

### Open Group
<p>
  <img src="docs/screenshots/open-group.png" width="800" alt="Open group">
</p>

### Closed Group
<p>
  <img src="docs/screenshots/closed-group.png" width="800" alt="Closed group">
</p>

---

## Stack

| Element                | Choice                        |
| ---------------------- | ----------------------------- |
| Language              | JavaScript ES6+               |
| UI Framework          | React 19                      |
| Build Tool / Dev Server | Vite                        |
| Routing               | React Router DOM v7           |
| HTTP Client           | Axios                         |
| Styling               | Tailwind CSS v4               |
| Architecture          | Layered Frontend Architecture |

---

## Prerequisites

- Node.js 22+
- npm 11+
- SaldApp backend running at `http://localhost:8080` (refer to the backend repository for instructions)

---

## Run the project

**1. Clone the repository**.

```bash
git clone https://github.com/leandro-mc/saldapp-frontend.git
cd saldapp-frontend
```

**2. Create the `.env` file** from the example:

```bash
cp .env.example .env
```

**3. Install dependencies**.

```bash
npm install
```

**4. Run the application**.

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## Architecture

The project follows a layered architecture inspired by Clean Architecture, adapted to a React frontend. The dependency rule is the same: **outer layers depend on inner layers, never the other way around.**

```
Types  ←  Services  ←  Hooks  ←  Components / Pages
```

---

## Project structure

``` readme
src/
│
├── config/
│   └── httpClient.js        # Single Axios instance with baseURL and interceptors
│
├── utils/
│
├── types/                   # Data contracts (JSDoc). No logic, only shape
│
├── services/                # Functions that talk to the API. No state, no React
│
├── hooks/                   # Logic, state, and orchestration. One hook per responsibility
│
├── components/              # UI pieces. Receive data through props, do not call services
│   ├── shared/
│   ├── group/
│   ├── integrant/
│   ├── expense/
│   └── settlement/
│
├── pages/                   # One per screen. Composes hooks and components
│   ├── HomePage.jsx         # Create a group or join an existing one by ID
│   └── GroupPage.jsx        # Full management of the active group
│
├── App.jsx                  # Main router with / and /groups/:id routes
├── main.jsx                 # Entry point, mounts React and global styles
└── index.css                # @import "tailwindcss"
```

---

## Environment variables

Create a `.env` file in the project root based on `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

> Variables must use the `VITE_` prefix to be accessible in the code.

---

## Routes

| Route         | Page        | Description                                                        |
| ------------- | ----------- | ------------------------------------------------------------------ |
| `/`           | `HomePage`   | Create a new group or access an existing one by ID                |
| `/groups/:id` | `GroupPage`  | Full group management: members, expenses, balance, and settlement |

---

## Author

**Leandro Mora Corrales**  
[linkedin.com/in/leandromora](https://linkedin.com/in/leandromora)

---

## License

MIT License — see [LICENSE](LICENSE) for details.
