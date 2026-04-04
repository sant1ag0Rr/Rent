const financialData = [
  { month: "Ene", income: 18500000, expenses: 6400000 },
  { month: "Feb", income: 19800000, expenses: 7100000 },
  { month: "Mar", income: 22300000, expenses: 7600000 },
  { month: "Abr", income: 21400000, expenses: 7200000 },
  { month: "May", income: 23900000, expenses: 8100000 },
  { month: "Jun", income: 25100000, expenses: 8600000 },
];

const money = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const maxValue = Math.max(...financialData.map((item) => item.income));

const Financiero = () => {
  return (
    <div className="m-2 md:m-10 mt-24 rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Grafico financiero</h1>
      <p className="mt-2 text-sm text-slate-500">
        Relacion entre ingresos y gastos operativos mensuales.
      </p>

      <div className="mt-8 space-y-4">
        {financialData.map((item) => {
          const profit = item.income - item.expenses;
          const width = `${(item.income / maxValue) * 100}%`;

          return (
            <div
              key={item.month}
              className="rounded-2xl border border-slate-200 p-4"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-slate-500">{item.month}</p>
                  <p className="text-lg font-semibold text-slate-900">
                    Utilidad: {money.format(profit)}
                  </p>
                </div>
                <div className="text-sm text-slate-500">
                  <span className="mr-4">Ingresos: {money.format(item.income)}</span>
                  <span>Gastos: {money.format(item.expenses)}</span>
                </div>
              </div>

              <div className="mt-4 h-3 rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500"
                  style={{ width }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Financiero;
