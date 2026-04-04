const segments = [
  { label: "Reservas web", value: 42, color: "#0ea5e9" },
  { label: "Reservas telefonicas", value: 28, color: "#22c55e" },
  { label: "Empresas", value: 18, color: "#f97316" },
  { label: "Walk-ins", value: 12, color: "#8b5cf6" },
];

const total = segments.reduce((sum, segment) => sum + segment.value, 0);

const createConicGradient = () => {
  let currentStart = 0;
  const stops = segments.map((segment) => {
    const start = currentStart;
    currentStart += (segment.value / total) * 360;
    return `${segment.color} ${start}deg ${currentStart}deg`;
  });

  return `conic-gradient(${stops.join(", ")})`;
};

const Circular = () => {
  return (
    <div className="m-2 md:m-10 mt-24 rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Grafico circular</h1>
      <p className="mt-2 text-sm text-slate-500">
        Distribucion de reservas por canal durante el ultimo mes.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-center">
        <div className="mx-auto">
          <div
            className="relative h-64 w-64 rounded-full"
            style={{ background: createConicGradient() }}
          >
            <div className="absolute inset-10 rounded-full bg-white shadow-inner" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Total
              </span>
              <span className="text-4xl font-bold text-slate-900">{total}%</span>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {segments.map((segment) => (
            <div
              key={segment.label}
              className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3.5 w-3.5 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="font-medium text-slate-700">{segment.label}</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">
                {segment.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Circular;
