import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar, SideBar } from "../components/index.jsx";
import {
  AllVehicles,
  AllUsers,
  Calender,
  ColorPicker,
  Customers,
  Editor,
  Tablero,
  VenderVehicleRequests,
} from "../pages";
import AdminHomeMain from "../pages/AdminHomeMain.jsx";
import Bookings from "../components/Bookings.jsx";
import Line from "../pages/Charts/Line.jsx";
import Area from "../pages/Charts/Area.jsx";
import Bar from "../pages/Charts/Bar.jsx";
import Circular from "../pages/Charts/Circular.jsx";
import Financiero from "../pages/Charts/Financiero.jsx";
import MapaColores from "../pages/Charts/MapaColores.jsx";
import Piramide from "../pages/Charts/Piramide.jsx";
import Apilado from "../pages/Charts/Apilado.jsx";

function AdminDashNew() {
  const { activeMenu } = useSelector((state) => state.adminDashboardSlice);

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      {activeMenu ? (
        <div className="fixed w-72 sidebar dark:bg-secondary-dark-bg">
          <SideBar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <SideBar />
        </div>
      )}

      <div
        className={`min-h-screen w-full bg-white dark:bg-white ${
          activeMenu ? "ml-72 md:ml-72" : "flex-2"
        }`}
      >
        <div className="fixed w-full bg-white md:static">
          <Navbar />
        </div>

        <div className="main_section mx-8">
          <Routes>
            <Route index element={<AdminHomeMain />} />
            <Route path="Inicio" element={<AdminHomeMain />} />
            <Route path="TodosProductos" element={<AllVehicles />} />
            <Route
              path="SolicitudesVendedores"
              element={<VenderVehicleRequests />}
            />
            <Route path="Pedidos" element={<Bookings />} />
            <Route path="Empleados" element={<AllUsers />} />
            <Route path="Clientes" element={<Customers />} />
            <Route path="Calendario" element={<Calender />} />
            <Route path="Tablero" element={<Tablero />} />
            <Route path="Editor" element={<Editor />} />
            <Route path="SelectorColores" element={<ColorPicker />} />
            <Route path="Linea" element={<Line />} />
            <Route path="Area" element={<Area />} />
            <Route path="Barras" element={<Bar />} />
            <Route path="Circular" element={<Circular />} />
            <Route path="Financiero" element={<Financiero />} />
            <Route path="MapaColores" element={<MapaColores />} />
            <Route path="Piramide" element={<Piramide />} />
            <Route path="Apilado" element={<Apilado />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashNew;
