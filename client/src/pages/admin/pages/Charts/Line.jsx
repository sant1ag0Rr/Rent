import {
  Category,
  ChartComponent,
  DataLabel,
  Inject,
  Legend,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

const lineData = [
  { x: "Enero", y: 40 },
  { x: "Febrero", y: 35 },
  { x: "Marzo", y: 60 },
  { x: "Abril", y: 50 },
  { x: "Mayo", y: 75 },
  { x: "Junio", y: 65 },
];

const Line = () => {
  return (
    <div className="m-2 md:m-10 mt-24 rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Grafico de linea</h1>
      <p className="mb-6 text-sm text-slate-500">
        Evolucion mensual de ingresos generados por reservas.
      </p>
      <ChartComponent
        primaryXAxis={{ valueType: "Category", title: "Mes" }}
        primaryYAxis={{ title: "Ingresos" }}
        tooltip={{ enable: true }}
      >
        <Inject services={[LineSeries, Category, Legend, Tooltip, DataLabel]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={lineData}
            xName="x"
            yName="y"
            type="Line"
            name="Ventas"
            marker={{ visible: true }}
            dataLabel={{ visible: true }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default Line;
