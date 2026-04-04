import { useMemo, useState } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Confirmar vehiculos para Semana Santa",
    owner: "Equipo Comercial",
    priority: "Alta",
    status: "pendiente",
  },
  {
    id: 2,
    title: "Revisar contratos pendientes",
    owner: "Legal",
    priority: "Media",
    status: "pendiente",
  },
  {
    id: 3,
    title: "Publicar promociones de abril",
    owner: "Marketing",
    priority: "Alta",
    status: "en-progreso",
  },
  {
    id: 4,
    title: "Actualizar tarifas corporativas",
    owner: "Finanzas",
    priority: "Baja",
    status: "en-progreso",
  },
  {
    id: 5,
    title: "Auditar reservas completadas",
    owner: "Operaciones",
    priority: "Media",
    status: "completado",
  },
];

const columns = [
  { id: "pendiente", title: "Pendiente", accent: "border-amber-200 bg-amber-50" },
  { id: "en-progreso", title: "En progreso", accent: "border-sky-200 bg-sky-50" },
  { id: "completado", title: "Completado", accent: "border-emerald-200 bg-emerald-50" },
];

const priorityStyles = {
  Alta: "bg-rose-100 text-rose-700",
  Media: "bg-amber-100 text-amber-700",
  Baja: "bg-emerald-100 text-emerald-700",
};

const Tablero = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    owner: "",
    priority: "Media",
    status: "pendiente",
  });

  const summary = useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        total: tasks.filter((task) => task.status === column.id).length,
      })),
    [tasks]
  );

  const handleDrop = (status) => {
    if (!draggedTaskId) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === draggedTaskId ? { ...task, status } : task
      )
    );
    setDraggedTaskId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newTask.title.trim() || !newTask.owner.trim()) {
      return;
    }

    setTasks((currentTasks) => [
      {
        id: Date.now(),
        title: newTask.title.trim(),
        owner: newTask.owner.trim(),
        priority: newTask.priority,
        status: newTask.status,
      },
      ...currentTasks,
    ]);

    setNewTask({
      title: "",
      owner: "",
      priority: "Media",
      status: "pendiente",
    });
  };

  return (
    <div className="m-2 md:m-10 mt-24 space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Tablero de trabajo</h2>
            <p className="mt-2 text-sm text-slate-500">
              Organiza tareas del equipo arrastrando tarjetas entre columnas.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {summary.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl border px-4 py-3 ${item.accent}`}
              >
                <p className="text-sm text-slate-600">{item.title}</p>
                <p className="text-2xl font-semibold text-slate-900">{item.total}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-900">Nueva tarea</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Titulo
              </label>
              <input
                value={newTask.title}
                onChange={(event) =>
                  setNewTask((current) => ({ ...current, title: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none transition focus:border-sky-400"
                placeholder="Ej. Revisar disponibilidad premium"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Responsable
              </label>
              <input
                value={newTask.owner}
                onChange={(event) =>
                  setNewTask((current) => ({ ...current, owner: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none transition focus:border-sky-400"
                placeholder="Nombre del equipo o area"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Prioridad
              </label>
              <select
                value={newTask.priority}
                onChange={(event) =>
                  setNewTask((current) => ({ ...current, priority: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none transition focus:border-sky-400"
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Columna inicial
              </label>
              <select
                value={newTask.status}
                onChange={(event) =>
                  setNewTask((current) => ({ ...current, status: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none transition focus:border-sky-400"
              >
                {columns.map((column) => (
                  <option key={column.id} value={column.id}>
                    {column.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Agregar al tablero
            </button>
          </div>
        </form>

        <div className="grid gap-4 lg:grid-cols-3">
          {columns.map((column) => {
            const columnTasks = tasks.filter((task) => task.status === column.id);

            return (
              <div
                key={column.id}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleDrop(column.id)}
                className="min-h-[420px] rounded-3xl bg-white p-4 shadow-sm"
              >
                <div className={`rounded-2xl border px-4 py-3 ${column.accent}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">{column.title}</h3>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {columnTasks.length}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {columnTasks.map((task) => (
                    <article
                      key={task.id}
                      draggable
                      onDragStart={() => setDraggedTaskId(task.id)}
                      className="cursor-grab rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-medium text-slate-900">{task.title}</h4>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-slate-500">
                        Responsable: {task.owner}
                      </p>
                    </article>
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-400">
                      Arrastra una tarea aqui
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tablero;
