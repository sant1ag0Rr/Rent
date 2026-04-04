import { useMemo, useState } from "react";

const ColorPicker = () => {
  const [primary, setPrimary] = useState("#0f172a");
  const [secondary, setSecondary] = useState("#0ea5e9");
  const [accent, setAccent] = useState("#f97316");

  const previewStyle = useMemo(
    () => ({
      background: `linear-gradient(135deg, ${primary}, ${secondary} 55%, ${accent})`,
    }),
    [primary, secondary, accent]
  );

  return (
    <div className="m-2 md:m-10 mt-24 space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Selector de colores</h2>
        <p className="mt-2 text-sm text-slate-500">
          Ajusta una paleta para campañas, tarjetas o estados del panel.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="space-y-5">
            {[
              { label: "Color primario", value: primary, onChange: setPrimary },
              { label: "Color secundario", value: secondary, onChange: setSecondary },
              { label: "Color acento", value: accent, onChange: setAccent },
            ].map((item) => (
              <div key={item.label}>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {item.label}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={item.value}
                    onChange={(event) => item.onChange(event.target.value)}
                    className="h-12 w-20 cursor-pointer rounded-lg border border-slate-200 bg-transparent"
                  />
                  <code className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
                    {item.value}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div
            className="rounded-[28px] p-8 text-white shadow-inner"
            style={previewStyle}
          >
            <p className="text-sm uppercase tracking-[0.25em] text-white/70">
              Vista previa
            </p>
            <h3 className="mt-4 text-3xl font-semibold">
              Paleta lista para el admin
            </h3>
            <p className="mt-3 max-w-xl text-sm text-white/80">
              Usa esta combinacion para destacar metricas, botones de accion y
              mensajes importantes.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[primary, secondary, accent].map((color) => (
                <div
                  key={color}
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur"
                >
                  <div
                    className="mb-2 h-8 w-20 rounded-lg border border-white/20"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-xs text-white/85">{color}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
