import {
  Category,
  ChartComponent,
  ColumnSeries,
  DataLabel,
  Inject,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

const barData = [
  { x: "Q1", y: 120 },
  { x: "Q2", y: 150 },
  { x: "Q3", y: 170 },
  { x: "Q4", y: 200 },
];

const Bar = () => {
  return (
    <div className="m-2 md:m-10 mt-24 rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Grafico de barras</h1>
      <p className="mb-6 text-sm text-slate-500">
        Comparativo trimestral de ingresos del panel administrativo.
      </p>
      <ChartComponent
        primaryXAxis={{ valueType: "Category", title: "Trimestre" }}
        primaryYAxis={{ title: "Ingresos" }}
        tooltip={{ enable: true }}
      >
        <Inject services={[ColumnSeries, Category, Tooltip, DataLabel]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={barData}
            xName="x"
            yName="y"
            type="Column"
            name="Ingresos"
            dataLabel={{ visible: true }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default Bar;
