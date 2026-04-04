import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const statCardsConfig = [
  {
    key: "totalUsers",
    label: "Clientes",
    description: "Usuarios registrados en la plataforma",
    accent: "from-sky-500 to-cyan-400",
    chip: "bg-sky-50 text-sky-700",
  },
  {
    key: "totalVendors",
    label: "Vendedores",
    description: "Aliados con vehiculos activos o en revision",
    accent: "from-amber-500 to-orange-400",
    chip: "bg-amber-50 text-amber-700",
  },
  {
    key: "totalAdmins",
    label: "Administradores",
    description: "Miembros internos con acceso al panel",
    accent: "from-violet-500 to-fuchsia-400",
    chip: "bg-violet-50 text-violet-700",
  },
];

const AdminHomeMain = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalAdmins: 0,
    recentUsers: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch("/api/admin/getDashboardStats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        toast.error("Error al cargar estadisticas");
      }
    } catch (error) {
      console.error("Error al obtener estadisticas del dashboard:", error);
      toast.error("Error de conexion");
    } finally {
      setLoading(false);
    }
  };

  const totalPeople = useMemo(
    () => stats.totalUsers + stats.totalVendors + stats.totalAdmins,
    [stats.totalAdmins, stats.totalUsers, stats.totalVendors]
  );

  const recentUsersPreview = useMemo(
    () => stats.recentUsers.slice(0, 5),
    [stats.recentUsers]
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="mt-16 space-y-6 pb-8">
      <section className="overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-sky-700 p-6 text-white shadow-xl md:p-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_340px]">
          <div>
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Inicio del administrador
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Vista general clara del estado de tu plataforma
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-200 md:text-base">
              Revisa rapidamente cuantas personas usan el sistema, que actividad
              reciente hubo y entra directo a las secciones clave del panel.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/adminDashboard/TodosProductos"
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Ver productos
              </Link>
              <Link
                to="/adminDashboard/SolicitudesVendedores"
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Revisar solicitudes
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <p className="text-sm text-slate-200">Personas en el sistema</p>
              <p className="mt-2 text-3xl font-bold">{totalPeople}</p>
              <p className="mt-1 text-xs text-slate-300">
                Clientes, vendedores y administradores
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <p className="text-sm text-slate-200">Usuarios recientes</p>
              <p className="mt-2 text-3xl font-bold">{stats.recentUsers.length}</p>
              <p className="mt-1 text-xs text-slate-300">
                Registros mostrados en esta vista
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <p className="text-sm text-slate-200">Panel listo</p>
              <p className="mt-2 text-lg font-semibold">Sin espacios vacios</p>
              <p className="mt-1 text-xs text-slate-300">
                Resumen, actividad y accesos rapidos en una sola pantalla
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {statCardsConfig.map((card) => (
          <article
            key={card.key}
            className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                <p className="mt-2 text-4xl font-bold text-slate-900">
                  {stats[card.key]}
                </p>
              </div>
              <div
                className={`rounded-2xl bg-gradient-to-br px-4 py-3 text-sm font-semibold text-white ${card.accent}`}
              >
                Total
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500">{card.description}</p>
            <div className="mt-5">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${card.chip}`}>
                Actualizado con datos del panel
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Usuarios recientes
              </h2>
              <p className="text-sm text-slate-500">
                Ultimos perfiles detectados en el sistema.
              </p>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {stats.recentUsers.length} visibles
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {recentUsersPreview.length > 0 ? (
              recentUsersPreview.map((user, index) => (
                <div
                  key={`${user.email}-${index}`}
                  className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[auto_minmax(0,1fr)_auto]"
                >
                  <img
                    src={user.profilePicture || "https://via.placeholder.com/48"}
                    alt="Profile"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {user.username || "Usuario sin nombre"}
                    </p>
                    <p className="truncate text-sm text-slate-500">{user.email}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Reciente
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-12 text-center text-sm text-slate-400">
                No hay usuarios recientes para mostrar.
              </div>
            )}
          </div>
        </article>

        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Resumen del sistema
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Distribucion actual de actores dentro de la plataforma.
          </p>

          <div className="mt-6 space-y-4">
            {statCardsConfig.map((card) => {
              const value = stats[card.key];
              const width = totalPeople > 0 ? `${(value / totalPeople) * 100}%` : "0%";

              return (
                <div key={`summary-${card.key}`}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{card.label}</span>
                    <span className="font-semibold text-slate-900">{value}</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${card.accent}`}
                      style={{ width }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              to="/adminDashboard/Clientes"
              className="rounded-2xl border border-slate-200 px-4 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Gestionar clientes
            </Link>
            <Link
              to="/adminDashboard/Empleados"
              className="rounded-2xl border border-slate-200 px-4 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Gestionar empleados
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
};

export default AdminHomeMain;
