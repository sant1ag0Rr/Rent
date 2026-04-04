import { useMemo, useState } from "react";

const quickSnippets = [
  { label: "Titulo", value: "## Nuevo anuncio\n" },
  { label: "Lista", value: "- Punto importante\n- Siguiente accion\n" },
  { label: "Aviso", value: "> Recuerda validar disponibilidad antes de publicar.\n" },
];

const Editor = () => {
  const [text, setText] = useState(
    "## Actualizacion semanal\n\nPublica aqui novedades para el equipo de operaciones."
  );

  const linesCount = useMemo(() => text.split("\n").length, [text]);

  const insertSnippet = (snippet) => {
    setText((currentText) =>
      currentText.trim() ? `${currentText}\n\n${snippet}` : snippet
    );
  };

  return (
    <div className="m-2 md:m-10 mt-24 space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Editor de contenido</h2>
            <p className="mt-2 text-sm text-slate-500">
              Prepara anuncios, notas internas y mensajes operativos con vista previa.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickSnippets.map((snippet) => (
              <button
                key={snippet.label}
                type="button"
                onClick={() => insertSnippet(snippet.value)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                {snippet.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Escribe aqui tu contenido..."
            className="min-h-[360px] w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-sky-400"
          />
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
            <span>Caracteres: {text.length}</span>
            <span>Lineas: {linesCount}</span>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Vista previa</h3>
          <div className="mt-4 min-h-[360px] rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
            <div className="whitespace-pre-wrap">{text || "Aqui veras la vista previa."}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
