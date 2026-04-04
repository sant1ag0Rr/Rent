import {
  AreaSeries,
  ChartComponent,
  DataLabel,
  DateTime,
  Inject,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

const areaData = [
  { x: new Date(2026, 0, 1), y: 30 },
  { x: new Date(2026, 1, 1), y: 40 },
  { x: new Date(2026, 2, 1), y: 50 },
  { x: new Date(2026, 3, 1), y: 45 },
  { x: new Date(2026, 4, 1), y: 60 },
  { x: new Date(2026, 5, 1), y: 55 },
];

const Area = () => {
  return (
    <div className="m-2 md:m-10 mt-24 rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Grafico de area</h1>
      <p className="mb-6 text-sm text-slate-500">
        Comportamiento acumulado de reservas registradas por mes.
      </p>
      <ChartComponent
        primaryXAxis={{ valueType: "DateTime", title: "Mes" }}
        primaryYAxis={{ title: "Reservas" }}
        tooltip={{ enable: true }}
      >
        <Inject services={[AreaSeries, DateTime, Tooltip, DataLabel]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={areaData}
            xName="x"
            yName="y"
            type="Area"
            name="Reservas"
            border={{ width: 2, color: "#0ea5e9" }}
            opacity={0.6}
            marker={{ visible: true }}
            dataLabel={{ visible: true }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default Area;
