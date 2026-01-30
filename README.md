**Project Overview**

- **Title:** Employee Management System (Frontend)
- **Purpose:** A web frontend for managing employees and tasks with role-based dashboards for admins and employees.

**Features**

- **Authentication:** Register and login with token-based auth (stored in `localStorage`).
- **Role-Based Dashboards:** Separate `AdminDashboard` and `EmployeeDashboard` views.
- **User Management:** Admins can create users via a Create User UI.
- **Task Management:** Create tasks, view task lists (New, Completed, Failed), and view task counts.
- **Task Status Tracking:** Tasks can move between statuses and are visible to assigned employees.
- **API Integration:** Uses a centralized axios instance for API calls with automatic Authorization header.

**Tech Stack**

- **Framework:** React (Vite)
- **State:** React Context API (`src/context/employeeContext.jsx`)
- **HTTP Client:** Axios (`src/instance/axiosInstance.js`, `src/utils/apiHelper.jsx`)
- **Styling:** Plain CSS (`src/App.css`, `src/index.css`) and component styles
- **Tooling:** Vite, ESLint

**Architecture & Flow**

- **App Entry:** `src/main.jsx` mounts the app and provides context providers.
- **Routing & Layouts:** High-level pages/components are organized under `src/components/` with subfolders for `auth`, `dashboard`, `layouts`, and `tasks`.
- **Auth Flow:**
  - User registers or logs in via the forms in `src/components/auth/`.
  - On successful auth the backend returns a token which the app stores in `localStorage` under `authToken`.
  - `src/instance/axiosInstance.js` reads `authToken` and attaches `Authorization: Bearer <token>` to outgoing requests.
  - App redirects users to `AdminDashboard` or `EmployeeDashboard` depending on their role.
- **Data Flow:**
  - UI components call helper functions in `src/utils/apiHelper.jsx` which use `src/instance/axiosInstance.js`.
  - The `employeeContext` provides user and app-level state to components.

**Folder Structure (key files)**

- **Entry & Global:** [src/main.jsx](src/main.jsx) - app bootstrap
- **Auth:** [src/components/auth/Login.jsx](src/components/auth/Login.jsx), [src/components/auth/Register.jsx](src/components/auth/Register.jsx)
- **Dashboards:** [src/components/dashboard/AdminDashboard.jsx](src/components/dashboard/AdminDashboard.jsx), [src/components/dashboard/EmployeeDashboard.jsx](src/components/dashboard/EmployeeDashboard.jsx)
- **Layouts & Admin Tools:** [src/components/layouts/CreateUser.jsx](src/components/layouts/CreateUser.jsx), [src/components/layouts/CreateTask.jsx](src/components/layouts/CreateTask.jsx), [src/components/layouts/AllTasks.jsx](src/components/layouts/AllTasks.jsx)
- **Tasks Views:** [src/components/tasks/TaskList.jsx](src/components/tasks/TaskList.jsx), [src/components/tasks/NewTask.jsx](src/components/tasks/NewTask.jsx), [src/components/tasks/CompletedTask.jsx](src/components/tasks/CompletedTask.jsx), [src/components/tasks/FailedTask.jsx](src/components/tasks/FailedTask.jsx)
- **HTTP & Helpers:** [src/instance/axiosInstance.js](src/instance/axiosInstance.js), [src/utils/apiHelper.jsx](src/utils/apiHelper.jsx)
- **Context:** [src/context/employeeContext.jsx](src/context/employeeContext.jsx)

**Environment & Config**

- **Backend Base URL:** The axios base URL is configured in `src/instance/axiosInstance.js`. It currently points to `https://employee-management-system-backend-eta.vercel.app`.
- **Auth Token Key:** `localStorage` key used: `authToken`.
- **CORS / Credentials:** `axiosInstance` is created with `withCredentials: true` to allow cookie-based auth if used by backend.

**Setup & Running Locally**

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Serve production build locally (optional):

```bash
npm run preview
```

**Environment Variables**

- If you need to change the backend URL, update `baseURL` in [src/instance/axiosInstance.js](src/instance/axiosInstance.js) or replace it to read from an environment variable (e.g., `import.meta.env.VITE_API_BASE_URL`).

**User Stories / Functionality Mapping**

- **As an unauthenticated user**: I can register and log in via `src/components/auth`.
- **As an admin**: I can create users (`CreateUser.jsx`), create tasks (`CreateTask.jsx`), view all tasks (`AllTasks.jsx`), and view dashboard analytics (`AdminDashboard.jsx`).
- **As an employee**: I can view assigned tasks (`TaskList.jsx`, `NewTask.jsx`, `CompletedTask.jsx`, `FailedTask.jsx`) and see summary numbers (`TaskListNumber.jsx`).

**API (Frontend Integration Notes)**

- All API calls should use `src/instance/axiosInstance.js` so the Authorization header is applied automatically.
- Example usage pattern: import `axiosInstance` and call `axiosInstance.get('/tasks')` or use helper wrappers in `src/utils/apiHelper.jsx`.

**Notes & Recommendations**

- Consider moving the `baseURL` into an environment variable (`VITE_API_BASE_URL`) for different environments (dev/staging/prod).
- Consider adding refresh-token handling (interceptor) if the backend supports token expiry and refresh.
- Add form validation and better error handling UI for production readiness.

**Contributing**

- Fork the repo, create a feature branch, and open a pull request with a clear description of changes.

Project Deployed At: https://employee-management-system-ten-omega.vercel.app/