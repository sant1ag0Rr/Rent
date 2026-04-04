import {
  Category,
  ChartComponent,
  DataLabel,
  Inject,
  Legend,
  SeriesCollectionDirective,
  SeriesDirective,
  StackingColumnSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

const completed = [
  { x: "Ene", y: 32 },
  { x: "Feb", y: 38 },
  { x: "Mar", y: 44 },
  { x: "Abr", y: 36 },
];

const pending = [
  { x: "Ene", y: 12 },
  { x: "Feb", y: 10 },
  { x: "Mar", y: 16 },
  { x: "Abr", y: 14 },
];

const cancelled = [
  { x: "Ene", y: 4 },
  { x: "Feb", y: 5 },
  { x: "Mar", y: 6 },
  { x: "Abr", y: 3 },
];

const Apilado = () => {
  return (
    <div className="m-2 md:m-10 mt-24 rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Grafico apilado</h1>
      <p className="mb-6 text-sm text-slate-500">
        Estado mensual de reservas completadas, pendientes y canceladas.
      </p>
      <ChartComponent
        primaryXAxis={{ valueType: "Category", title: "Mes" }}
        primaryYAxis={{ title: "Reservas" }}
        tooltip={{ enable: true }}
      >
        <Inject
          services={[StackingColumnSeries, Category, Legend, Tooltip, DataLabel]}
        />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={completed}
            xName="x"
            yName="y"
            name="Completadas"
            type="StackingColumn"
            fill="#22c55e"
            dataLabel={{ visible: true }}
          />
          <SeriesDirective
            dataSource={pending}
            xName="x"
            yName="y"
            name="Pendientes"
            type="StackingColumn"
            fill="#f59e0b"
            dataLabel={{ visible: true }}
          />
          <SeriesDirective
            dataSource={cancelled}
            xName="x"
            yName="y"
            name="Canceladas"
            type="StackingColumn"
            fill="#ef4444"
            dataLabel={{ visible: true }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default Apilado;
