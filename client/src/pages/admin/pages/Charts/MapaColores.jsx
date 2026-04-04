const heatmapData = [
  { label: "Lun", values: [18, 22, 26, 31, 35, 28] },
  { label: "Mar", values: [14, 17, 29, 34, 39, 32] },
  { label: "Mie", values: [16, 21, 24, 29, 37, 30] },
  { label: "Jue", values: [11, 19, 23, 27, 33, 26] },
  { label: "Vie", values: [24, 28, 35, 41, 46, 40] },
];

const hours = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

const getHeatColor = (value) => {
  if (value >= 40) return "bg-slate-900 text-white";
  if (value >= 30) return "bg-sky-600 text-white";
  if (value >= 20) return "bg-sky-200 text-slate-900";
  return "bg-slate-100 text-slate-700";
};

const MapaColores = () => {
  return (
    <div className="m-2 md:m-10 mt-24 rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Mapa de colores</h1>
      <p className="mt-2 text-sm text-slate-500">
        Intensidad de solicitudes por franja horaria y dia.
      </p>

      <div className="mt-8 overflow-x-auto">
        <div className="min-w-[680px]">
          <div className="grid grid-cols-7 gap-3">
            <div />
            {hours.map((hour) => (
              <div key={hour} className="text-center text-sm font-medium text-slate-500">
                {hour}
              </div>
            ))}

            {heatmapData.map((row) => (
              <div key={row.label} className="contents">
                <div className="flex items-center font-semibold text-slate-700">
                  {row.label}
                </div>
                {row.values.map((value, index) => (
                  <div
                    key={`${row.label}-${hours[index]}`}
                    className={`flex h-20 items-center justify-center rounded-2xl text-sm font-semibold ${getHeatColor(
                      value
                    )}`}
                  >
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapaColores;
