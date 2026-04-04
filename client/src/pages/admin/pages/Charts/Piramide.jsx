const pyramidData = [
  { label: "Visitantes", value: 100, width: "100%", color: "bg-slate-900" },
  { label: "Leads", value: 72, width: "78%", color: "bg-sky-700" },
  { label: "Cotizaciones", value: 51, width: "58%", color: "bg-sky-500" },
  { label: "Reservas", value: 34, width: "42%", color: "bg-emerald-500" },
  { label: "Renovaciones", value: 16, width: "26%", color: "bg-amber-500" },
];

const Piramide = () => {
  return (
    <div className="m-2 md:m-10 mt-24 rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Grafico de piramide</h1>
      <p className="mt-2 text-sm text-slate-500">
        Conversion del embudo comercial desde visitas hasta renovaciones.
      </p>

      <div className="mt-8 space-y-3">
        {pyramidData.map((item) => (
          <div key={item.label} className="text-center">
            <div
              className={`mx-auto rounded-xl px-4 py-4 text-white shadow-sm ${item.color}`}
              style={{ width: item.width }}
            >
              <div className="flex items-center justify-between gap-4 text-sm font-semibold">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Piramide;
