# TaskFlow — React + JavaScript

Aplicación React/Vite para administrar proyectos y tareas mediante la API de TaskFlow.

## Funcionalidad

- Inicio de sesión con JWT.
- CRUD de proyectos.
- CRUD de tareas.
- Filtrado de tareas por estado y prioridad.
- Creación de tareas independientes.
- Creación de tareas anidadas a un proyecto mediante `POST /projects/{projectId}/tasks`.
- Consulta de tareas de un proyecto mediante `GET /projects/{projectId}/tasks`.
- Edición y eliminación de tareas anidadas mediante su ID.

## Requisitos

- Node.js 18+ recomendado.
- npm.

## Instalación

```bash
npm install
```

Configura `.env`:

```env
VITE_API_URL=https://d3ujwk09smrk9z.cloudfront.net
```

Ejecuta:

```bash
npm run dev
```

Build de producción:

```bash
npm run build
```

## Estructura relevante

```text
src/
├── components/
│   ├── ProjectTasksDialog.jsx   # CRUD de tareas dentro de un proyecto
│   ├── TaskFormDialog.jsx       # Alta/edición de tareas
│   └── ...
├── pages/
│   ├── ProjectsPage.jsx
│   └── TasksPage.jsx
├── services/
│   ├── projectService.js
│   └── taskService.js
└── hooks/
    ├── useProjects.js
    └── useTasks.js
```

## Flujo de tareas dentro de un proyecto

1. En **Proyectos**, pulsa **Tareas** en una tarjeta.
2. Se consulta `GET /projects/{projectId}/tasks`.
3. Pulsa **Nueva tarea** para crearla con `POST /projects/{projectId}/tasks`.
4. **Editar** utiliza `PUT /tasks/{taskId}`.
5. **Eliminar** utiliza `DELETE /tasks/{taskId}`.
6. Al terminar cada operación se vuelve a cargar la lista del proyecto.

## Endpoints utilizados

| Operación | Método | Endpoint |
|---|---|---|
| Listar proyectos | GET | `/projects` |
| Crear proyecto | POST | `/projects` |
| Editar proyecto | PUT | `/projects/{id}` |
| Eliminar proyecto | DELETE | `/projects/{id}` |
| Listar tareas de proyecto | GET | `/projects/{projectId}/tasks` |
| Crear tarea de proyecto | POST | `/projects/{projectId}/tasks` |
| Listar tareas globales | GET | `/tasks` |
| Obtener tarea | GET | `/tasks/{id}` |
| Editar tarea | PUT | `/tasks/{id}` |
| Cambiar estado | PATCH | `/tasks/{id}/status` |
| Eliminar tarea | DELETE | `/tasks/{id}` |

## Notas de implementación

La API distingue entre la ruta anidada usada para crear/consultar tareas de un proyecto y las rutas del recurso `/tasks/{id}` usadas para editar/eliminar una tarea ya existente.

El formulario de tareas reutiliza el mismo componente para las dos vistas. Cuando se abre desde un proyecto, el proyecto queda bloqueado para evitar asociar accidentalmente la tarea a otro proyecto.
