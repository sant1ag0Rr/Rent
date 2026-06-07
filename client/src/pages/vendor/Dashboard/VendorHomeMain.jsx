import React, { useEffect, useMemo, useState } from "react";
import { FiCalendar, FiDollarSign, FiTruck } from "react-icons/fi";
import { useSelector } from "react-redux";

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const getBookingLabel = (status) => {
  const labels = {
    reservado: "Reservada",
    enViaje: "En viaje",
    noRecogido: "No recogido",
    cancelado: "Cancelada",
    vencido: "Vencida",
    viajeCompletado: "Completada",
    noReservado: "No reservada",
  };

  return labels[status] || "Sin estado";
};

const getBookingBadge = (status) => {
  const styles = {
    reservado: "bg-lime-100 text-lime-800",
    enViaje: "bg-emerald-100 text-emerald-800",
    noRecogido: "bg-emerald-100 text-emerald-800",
    cancelado: "bg-red-100 text-red-800",
    vencido: "bg-slate-100 text-slate-700",
    viajeCompletado: "bg-green-100 text-green-800",
    noReservado: "bg-slate-100 text-slate-700",
  };

  return styles[status] || "bg-slate-100 text-slate-700";
};

const VendorHomeMain = () => {
  const [vendorStats, setVendorStats] = useState({
    totalVehicles: 0,
    approvedVehicles: 0,
    pendingVehicles: 0,
    totalBookings: 0,
    pendingBookings: 0,
    activeBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    totalEarnings: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { _id } = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);

        const vehiclesRes = await fetch("/api/vendor/showVendorVehilces", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id }),
        });

        let vehicles = [];
        if (vehiclesRes.ok) {
          vehicles = await vehiclesRes.json();
        }

        const bookingsRes = await fetch("/api/vendor/vendorBookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id }),
        });

        let bookings = [];
        if (bookingsRes.ok) {
          bookings = await bookingsRes.json();
        }

        const totalVehicles = vehicles.length;
        const approvedVehicles = vehicles.filter((v) => v.isAdminApproved === true).length;
        const pendingVehicles = vehicles.filter((v) => v.isAdminApproved === false).length;

        const totalBookings = bookings.length;
        const pendingBookings = bookings.filter((b) => b.status === "reservado").length;
        const activeBookings = bookings.filter((b) => b.status === "enViaje").length;
        const completedBookings = bookings.filter(
          (b) => b.status === "viajeCompletado"
        ).length;
        const cancelledBookings = bookings.filter((b) =>
          ["cancelado", "vencido", "noRecogido"].includes(b.status)
        ).length;

        const totalEarnings = bookings
          .filter((b) => !["cancelado", "vencido", "noReservado"].includes(b.status))
          .reduce((sum, booking) => sum + (Number(booking.totalPrice) || 0), 0);

        setVendorStats({
          totalVehicles,
          approvedVehicles,
          pendingVehicles,
          totalBookings,
          pendingBookings,
          activeBookings,
          completedBookings,
          cancelledBookings,
          totalEarnings,
        });

        const recentBookingsData = bookings.slice(0, 5).map((booking) => ({
          id: booking._id,
          customer:
            booking.userDetails?.username ||
            booking.userDetails?.email ||
            "Cliente",
          vehicle:
            booking.vehicleDetails?.name ||
            booking.vehicleDetails?.car_title ||
            "Vehículo",
          date: booking.pickupDate
            ? new Date(booking.pickupDate).toLocaleDateString("es-CO")
            : "Sin fecha",
          status: getBookingLabel(booking.status),
          statusKey: booking.status,
          totalPrice: Number(booking.totalPrice) || 0,
        }));

        setRecentBookings(recentBookingsData);
      } catch (error) {
        console.error("Error cargando datos del vendedor:", error);
      } finally {
        setLoading(false);
      }
    };

    if (_id) {
      fetchVendorData();
    }
  }, [_id]);

  const formattedEarnings = useMemo(
    () => currencyFormatter.format(vendorStats.totalEarnings || 0),
    [vendorStats.totalEarnings]
  );

  if (loading) {
    return (
      <div className="m-2 mt-24 rounded-3xl bg-white p-2 md:m-10 md:p-10">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-500"></div>
            <p className="mt-4 text-gray-600">Cargando datos del vendedor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="m-2 mt-24 rounded-3xl bg-white p-2 md:m-10 md:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Panel de Vendedor</h1>
          <p className="text-gray-600">Gestiona tus vehículos y reservas</p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100">Total de Vehículos</p>
              <p className="text-3xl font-bold">{vendorStats.totalVehicles}</p>
            </div>
            <FiTruck className="text-4xl opacity-80" />
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Vehículos Aprobados</p>
              <p className="text-3xl font-bold">{vendorStats.approvedVehicles}</p>
            </div>
            <FiTruck className="text-4xl opacity-80" />
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-lime-500 to-lime-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lime-100">Reservas Activas</p>
              <p className="text-3xl font-bold">
                {vendorStats.pendingBookings + vendorStats.activeBookings}
              </p>
            </div>
            <FiCalendar className="text-4xl opacity-80" />
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100">Ganancias Totales</p>
              <p className="text-2xl font-bold">{formattedEarnings}</p>
            </div>
            <FiDollarSign className="text-4xl opacity-80" />
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">Estado de Vehículos</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total de Vehículos</span>
              <span className="font-semibold">{vendorStats.totalVehicles}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Aprobados</span>
              <span className="font-semibold text-green-600">
                {vendorStats.approvedVehicles}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pendientes de Aprobación</span>
              <span className="font-semibold text-lime-600">
                {vendorStats.pendingVehicles}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">Resumen de Reservas</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total de Reservas</span>
              <span className="font-semibold">{vendorStats.totalBookings}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pendientes de Recogida</span>
              <span className="font-semibold text-lime-600">
                {vendorStats.pendingBookings}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">En Viaje</span>
              <span className="font-semibold text-emerald-600">
                {vendorStats.activeBookings}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completadas</span>
              <span className="font-semibold text-green-600">
                {vendorStats.completedBookings}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Canceladas / Vencidas</span>
              <span className="font-semibold text-red-600">
                {vendorStats.cancelledBookings}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold text-gray-800">Reservas Recientes</h3>
        {recentBookings.length === 0 ? (
          <div className="py-8 text-center">
            <div className="mb-2 text-4xl text-gray-400">📄</div>
            <p className="text-gray-500">No hay reservas aún</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Cliente</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Vehículo</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Fecha</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Monto</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100">
                      <td className="px-4 py-3">{booking.customer}</td>
                      <td className="px-4 py-3">{booking.vehicle}</td>
                      <td className="px-4 py-3">{booking.date}</td>
                      <td className="px-4 py-3">
                        {currencyFormatter.format(booking.totalPrice)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${getBookingBadge(
                            booking.statusKey
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              {recentBookings.length} reservas recientes
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VendorHomeMain;
