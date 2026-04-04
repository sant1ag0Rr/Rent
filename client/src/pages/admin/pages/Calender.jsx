import { useMemo, useState } from "react";

const initialEvents = [
  { date: "2026-04-05", title: "Mantenimiento de vehiculo", category: "Operaciones" },
  { date: "2026-04-10", title: "Revision administrativa", category: "Backoffice" },
  { date: "2026-04-15", title: "Lanzar promocion estacional", category: "Marketing" },
];

const Calender = () => {
  const [selectedDate, setSelectedDate] = useState("2026-04-05");
  const [events, setEvents] = useState(initialEvents);

  const selectedEvents = useMemo(
    () => events.filter((event) => event.date === selectedDate),
    [events, selectedDate]
  );

  const addEvent = (event) => {
    event.preventDefault();

    const title = event.target.eventTitle.value.trim();
    const category = event.target.eventCategory.value.trim();

    if (!title || !category) {
      return;
    }

    setEvents((currentEvents) => [
      ...currentEvents,
      { date: selectedDate, title, category },
    ]);

    event.target.reset();
  };

  return (
    <div className="m-2 md:m-10 mt-24 space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Calendario de administracion</h2>
        <p className="mt-2 text-sm text-slate-500">
          Programa hitos, seguimientos y eventos internos por fecha.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Seleccionar fecha
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none transition focus:border-sky-400"
          />

          <form onSubmit={addEvent} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Evento
              </label>
              <input
                name="eventTitle"
                type="text"
                placeholder="Nombre del evento"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none transition focus:border-sky-400"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Categoria
              </label>
              <input
                name="eventCategory"
                type="text"
                placeholder="Ej. Finanzas, Soporte, Marketing"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none transition focus:border-sky-400"
                required
              />
            </div>
            <button className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
              Agregar evento
            </button>
          </form>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Agenda del dia</h3>
              <p className="text-sm text-slate-500">{selectedDate}</p>
            </div>
            <div className="rounded-2xl bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
              {selectedEvents.length} eventos programados
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {selectedEvents.map((currentEvent, index) => (
              <article
                key={`${currentEvent.date}-${currentEvent.title}-${index}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <span className="inline-flex rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
                  {currentEvent.category}
                </span>
                <h4 className="mt-3 font-semibold text-slate-900">{currentEvent.title}</h4>
                <p className="mt-2 text-sm text-slate-500">
                  Fecha: {currentEvent.date}
                </p>
              </article>
            ))}
          </div>

          {selectedEvents.length === 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 px-4 py-12 text-center text-sm text-slate-400">
              No hay eventos para la fecha seleccionada.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calender;
