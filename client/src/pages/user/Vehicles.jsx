import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setVariants,
  setVehicleDetail,
  showVehicles,
} from "../../redux/user/listAllVehicleSlice";
import { FaCarSide } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdAirlineSeatReclineNormal, MdOutlineLocationOn } from "react-icons/md";
import { FiArrowRight, FiEye } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Filter from "../../components/Filter";
import Sort from "../../components/Sort";
import { signOut } from "../../redux/user/userSlice";
import Footers from "../../components/Footer";
import SkeletonLoader from "../../components/ui/SkeletonLoader";

//use Custome hook in this case :)
export const onVehicleDetail = async (id, dispatch, navigate) => {
  try {
    const res = await fetch("/api/user/showVehicleDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id }),
    });
    const data = await res.json();

    if (data.statusCode == 401 || data.statusCode == 403) {
      dispatch(signOut());
    }

    dispatch(setVehicleDetail(data));
    navigate("/vehicleDetails");
  } catch (error) {
    console.log(error);
  }
};

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

const VehicleCard = ({ vehicle, dispatch, navigate }) => {
  const hasManyImages = vehicle.image && vehicle.image.length > 1;

  return (
    <article className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-green-50/60 px-6 pt-7">
        <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
          {vehicle.company}
        </div>
        <div className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          {vehicle.car_type}
        </div>
        <img
          src={vehicle.image?.[0]}
          alt={vehicle.name}
          className="mx-auto h-56 w-full object-contain transition duration-300 group-hover:scale-[1.04]"
        />
        {hasManyImages && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-medium text-white">
            {vehicle.image.length} fotos
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {vehicle.name}
            </h2>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <MdOutlineLocationOn className="text-base text-green-600" />
              {vehicle.location || "Ubicación disponible"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-slate-900">${vehicle.price}</p>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              por día
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FaCarSide className="text-green-600" />
              Marca
            </p>
            <p className="mt-1 text-sm text-slate-500">{vehicle.company}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <MdAirlineSeatReclineNormal className="text-green-600" />
              Asientos
            </p>
            <p className="mt-1 text-sm text-slate-500">{vehicle.seats}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FaCarSide className="text-green-600" />
              Tipo
            </p>
            <p className="mt-1 text-sm text-slate-500">{vehicle.car_type}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <BsFillFuelPumpFill className="text-green-600" />
              Combustible
            </p>
            <p className="mt-1 text-sm text-slate-500">{normalizeFuel(vehicle.fuel_type)}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            onClick={() => {
              onVehicleDetail(vehicle._id, dispatch, navigate);
              setTimeout(() => {
                navigate("/checkoutPage");
              }, 100);
            }}
          >
            Reservar Auto
            <FiArrowRight className="ml-2" />
          </button>

          <Link to="/vehicleDetails" className="flex-1">
            <button
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              onClick={() => onVehicleDetail(vehicle._id, dispatch, navigate)}
            >
              Ver Detalles
              <FiEye className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
};

const Vehicles = () => {
  const { userAllVehicles } = useSelector((state) => state.userListVehicles);
  const { data, filterdData } = useSelector((state) => state.sortfilterSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_PRODUCTION_BACKEND_URL;

  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    dispatch(setVariants(null));
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/user/listAllVehicles`, {
          headers: { Authorization: `Bearer ${refreshToken},${accessToken}` },
          credentials: "include",
        });
        if (!res.ok) {
          console.log("not success");
        }
        if (res.ok) {
          const data = await res.json();
          dispatch(showVehicles(data));
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, data]);

  const visibleVehicles = useMemo(() => {
    const source =
      filterdData && filterdData.length > 0 ? filterdData : userAllVehicles || [];

    return source.filter(
      (cur) =>
        cur.isDeleted === "false" &&
        cur.isAdminApproved
    );
  }, [filterdData, userAllVehicles]);

  return (
    <>
      <section className="bg-white px-6 pb-8 pt-10 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[34px] bg-gradient-to-r from-slate-900 via-slate-800 to-green-600 px-8 py-10 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] md:px-10">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-semibold text-white/90">
                Catálogo de vehículos
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
                Encuentra el auto ideal para tu próximo viaje
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                Explora opciones verificadas, compara precios y reserva en pocos pasos
                con una presentación mucho más clara y profesional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-6 pb-16 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12 lg:items-start">
          <div className="col-span-3 mt-2 lg:sticky lg:top-6">
            <Filter />
          </div>

          <div className="col-span-9">
            <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_12px_35px_rgba(15,23,42,0.06)] md:p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Vehículos disponibles</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {visibleVehicles.length} opciones listas para reservar
                  </p>
                </div>
                <Sort />
              </div>
            </div>

            {isLoading ? (
              <SkeletonLoader />
            ) : visibleVehicles.length === 0 ? (
              <div className="mt-6 rounded-[28px] border border-dashed border-slate-200 bg-white px-6 py-16 text-center text-slate-500 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
                No encontramos vehículos con los filtros actuales.
              </div>
            ) : (
              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visibleVehicles.map((cur) => (
                  <VehicleCard
                    key={cur._id}
                    vehicle={cur}
                    dispatch={dispatch}
                    navigate={navigate}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footers />
    </>
  );
};

export default Vehicles;
