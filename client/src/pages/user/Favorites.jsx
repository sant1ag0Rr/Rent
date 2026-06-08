import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCarSide, FaHeartBroken } from "react-icons/fa";
import { BsFillFuelPumpFill, BsSuitHeartFill } from "react-icons/bs";
import { MdAirlineSeatReclineNormal, MdOutlineLocationOn } from "react-icons/md";
import { FiArrowRight, FiEye } from "react-icons/fi";
import { showVehicles, setVehicleDetail } from "../../redux/user/listAllVehicleSlice";
import Footers from "../../components/Footer";
import SkeletonLoader from "../../components/ui/SkeletonLoader";

const normalizeFuel = (fuel) => {
  if (!fuel) return "No especificado";
  const mapping = {
    petrol: "Gasolina",
    diesel: "Diésel",
    electirc: "Eléctrico",
    hybrid: "Híbrido",
  };
  return mapping[fuel] || fuel;
};

const FAVORITES_KEY = "alquila_autos_favorites";

export const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
  } catch {
    return [];
  }
};

export const toggleFavorite = (vehicleId) => {
  const current = getFavorites();
  const updated = current.includes(vehicleId)
    ? current.filter((id) => id !== vehicleId)
    : [...current, vehicleId];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
};

export const isFavorite = (vehicleId) => getFavorites().includes(vehicleId);

const FavoriteCard = ({ vehicle, onRemove, dispatch, navigate }) => (
  <article className="group overflow-hidden rounded-[30px] border border-black/10 bg-white transition duration-300 hover:-translate-y-1">
    <div className="relative overflow-hidden bg-black/5 px-6 pt-7">
      <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black shadow-sm">
        {vehicle.company}
      </div>
      <div className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
        {vehicle.car_type}
      </div>
      {/* Botón quitar de favoritos */}
      <button
        onClick={() => onRemove(vehicle._id)}
        title="Quitar de favoritos"
        className="absolute right-4 bottom-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-black hover:text-white"
      >
        <BsSuitHeartFill className="text-green-600 group-hover:text-inherit transition" />
      </button>
      <img
        src={vehicle.image?.[0]}
        alt={vehicle.name}
        className="mx-auto h-52 w-full object-contain transition duration-300 group-hover:scale-[1.04]"
      />
    </div>

    <div className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-black">
            {vehicle.name}
          </h2>
          <p className="mt-1 flex items-center gap-1 text-sm text-black/50">
            <MdOutlineLocationOn className="text-green-600" />
            {vehicle.location || "Ubicación disponible"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-black">${vehicle.price}</p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/40">
            por día
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-black/5 px-4 py-3">
          <p className="flex items-center gap-2 text-xs font-semibold text-black">
            <FaCarSide className="text-green-600" /> Marca
          </p>
          <p className="mt-1 text-xs text-black/60">{vehicle.company}</p>
        </div>
        <div className="rounded-2xl bg-black/5 px-4 py-3">
          <p className="flex items-center gap-2 text-xs font-semibold text-black">
            <MdAirlineSeatReclineNormal className="text-green-600" /> Asientos
          </p>
          <p className="mt-1 text-xs text-black/60">{vehicle.seats}</p>
        </div>
        <div className="rounded-2xl bg-black/5 px-4 py-3">
          <p className="flex items-center gap-2 text-xs font-semibold text-black">
            <FaCarSide className="text-green-600" /> Tipo
          </p>
          <p className="mt-1 text-xs text-black/60">{vehicle.car_type}</p>
        </div>
        <div className="rounded-2xl bg-black/5 px-4 py-3">
          <p className="flex items-center gap-2 text-xs font-semibold text-black">
            <BsFillFuelPumpFill className="text-green-600" /> Combustible
          </p>
          <p className="mt-1 text-xs text-black/60">{normalizeFuel(vehicle.fuel_type)}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          onClick={() => {
            dispatch(setVehicleDetail(vehicle));
            setTimeout(() => navigate("/checkoutPage"), 100);
          }}
        >
          Reservar
          <FiArrowRight className="ml-2" />
        </button>
        <button
          className="inline-flex flex-1 items-center justify-center rounded-xl border border-black/10 bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
          onClick={() => {
            dispatch(setVehicleDetail(vehicle));
            navigate("/vehicleDetails");
          }}
        >
          Ver Detalles
          <FiEye className="ml-2" />
        </button>
      </div>
    </div>
  </article>
);

const Favorites = () => {
  const { userAllVehicles } = useSelector((state) => state.userListVehicles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favoriteIds, setFavoriteIds] = useState(getFavorites());
  const [isLoading, setIsLoading] = useState(true);

  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  const BASE_URL = import.meta.env.VITE_PRODUCTION_BACKEND_URL;

  useEffect(() => {
    if (userAllVehicles && userAllVehicles.length > 0) {
      setIsLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/user/listAllVehicles`, {
          headers: { Authorization: `Bearer ${refreshToken},${accessToken}` },
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          dispatch(showVehicles(data));
        }
      } catch {
        dispatch(showVehicles([]));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, BASE_URL, refreshToken, accessToken, userAllVehicles]);

  const favoriteVehicles = (userAllVehicles || []).filter(
    (v) => favoriteIds.includes(v._id) && v.isDeleted === "false" && v.isAdminApproved
  );

  const handleRemove = (vehicleId) => {
    const updated = toggleFavorite(vehicleId);
    setFavoriteIds([...updated]);
  };

  return (
    <>
      {/* Header */}
      <section className="bg-black px-6 py-14 text-white md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-semibold text-white/90">
              Mis favoritos
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              Vehículos que te interesaron
            </h1>
            <p className="mt-4 text-base text-white/70">
              Aquí guardas los autos que quieres reservar más tarde. Añádelos
              desde el catálogo de vehículos.
            </p>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="bg-white px-6 pb-16 pt-10 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {isLoading ? (
            <SkeletonLoader />
          ) : favoriteIds.length === 0 ? (
            /* Estado vacío — sin favoritos guardados */
            <div className="flex flex-col items-center justify-center rounded-[36px] border border-dashed border-black/15 bg-white py-24 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black">
                <FaHeartBroken className="text-4xl text-green-500" />
              </div>
              <h2 className="mt-8 text-2xl font-bold text-black">
                Aún no tienes favoritos
              </h2>
              <p className="mt-3 max-w-sm text-base text-black/50">
                Explora el catálogo y guarda los vehículos que más te llamen la
                atención para compararlos después.
              </p>
              <button
                onClick={() => navigate("/vehicles")}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-green-700"
              >
                <FaCarSide />
                Ver catálogo de vehículos
              </button>
            </div>
          ) : favoriteVehicles.length === 0 ? (
            /* Tiene IDs guardados pero los autos ya no están disponibles */
            <div className="flex flex-col items-center justify-center rounded-[36px] border border-dashed border-black/15 bg-white py-24 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black">
                <FaCarSide className="text-4xl text-green-500" />
              </div>
              <h2 className="mt-8 text-2xl font-bold text-black">
                Tus favoritos no están disponibles
              </h2>
              <p className="mt-3 max-w-sm text-base text-black/50">
                Los vehículos que guardaste ya no están activos. Explora el
                catálogo para encontrar nuevas opciones.
              </p>
              <button
                onClick={() => navigate("/vehicles")}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-green-700"
              >
                Ver catálogo
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-black">
                    {favoriteVehicles.length}{" "}
                    {favoriteVehicles.length === 1
                      ? "vehículo guardado"
                      : "vehículos guardados"}
                  </h2>
                  <p className="mt-1 text-sm text-black/50">
                    Haz clic en el corazón para quitar un vehículo de favoritos
                  </p>
                </div>
                <button
                  onClick={() => navigate("/vehicles")}
                  className="hidden rounded-xl border border-black/10 px-5 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white sm:inline-flex"
                >
                  + Explorar más
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {favoriteVehicles.map((v) => (
                  <FavoriteCard
                    key={v._id}
                    vehicle={v}
                    onRemove={handleRemove}
                    dispatch={dispatch}
                    navigate={navigate}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footers />
    </>
  );
};

export default Favorites;
