import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { GrSecure } from "react-icons/gr";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { FaBuilding, FaCarAlt, FaCarSide, FaStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { GiGearStickPattern } from "react-icons/gi";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { MdAirlineSeatReclineExtra, MdOutlineLocationOn } from "react-icons/md";
import { showVehicles } from "../../redux/user/listAllVehicleSlice";

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

const normalizeTransmission = (transmission) => {
  if (transmission === "manual") return "Manual";
  if (transmission === "automatic") return "Automática";
  return transmission || "No especificado";
};

const VehicleDetails = () => {
  const { singleVehicleDetail } = useSelector((state) => state.userListVehicles);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (singleVehicleDetail?.image?.[0]) {
      setActiveImage(singleVehicleDetail.image[0]);
    }
  }, [singleVehicleDetail]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/user/listAllVehicles", {
          headers: { Authorization: `Bearer ${refreshToken},${accessToken}` },
        });
        if (!res.ok) {
          console.log("not success");
          return;
        }
        const data = await res.json();
        dispatch(showVehicles(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [accessToken, dispatch, refreshToken]);

  const handleBook = async () => {
    try {
      navigate("/checkoutPage");
    } catch (error) {
      console.log(error);
    }
  };

  const vehicleImages = useMemo(
    () => (singleVehicleDetail?.image?.length ? singleVehicleDetail.image : []),
    [singleVehicleDetail]
  );

  const technicalDetails = [
    {
      icon: <FaCarAlt />,
      label: "Modelo",
      value: singleVehicleDetail?.name || singleVehicleDetail?.model || "No especificado",
    },
    {
      icon: <FaBuilding />,
      label: "Marca",
      value: singleVehicleDetail?.company || "No especificado",
    },
    {
      icon: <CiCalendarDate />,
      label: "Año",
      value: singleVehicleDetail?.year_made || "No especificado",
    },
    {
      icon: <GiGearStickPattern />,
      label: "Transmisión",
      value: normalizeTransmission(singleVehicleDetail?.transmition),
    },
    {
      icon: <FaCarSide />,
      label: "Tipo de Auto",
      value: singleVehicleDetail?.car_type || "No especificado",
    },
    {
      icon: <BsFillFuelPumpFill />,
      label: "Combustible",
      value: normalizeFuel(singleVehicleDetail?.fuel_type),
    },
    {
      icon: <MdAirlineSeatReclineExtra />,
      label: "Asientos",
      value: singleVehicleDetail?.seats || "No especificado",
    },
    {
      icon: <MdOutlineLocationOn />,
      label: "Ubicación",
      value: singleVehicleDetail?.location || "No especificado",
    },
  ];

  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-6 pb-16 pt-8 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <TooltipComponent content="Volver" position="BottomCenter">
            <Link to="/vehicles" className="inline-flex">
              <IoArrowBackCircleSharp className="text-[42px] text-slate-900 transition hover:text-green-600" />
            </Link>
          </TooltipComponent>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.3fr)_420px]">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
              <div className="grid gap-6 p-6 lg:grid-cols-[90px_minmax(0,1fr)] lg:p-8">
                <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col">
                  {vehicleImages.map((image, idx) => (
                    <button
                      type="button"
                      key={`${image}-${idx}`}
                      onClick={() => setActiveImage(image)}
                      className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 bg-slate-50 transition ${
                        activeImage === image
                          ? "border-green-600 shadow-md"
                          : "border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      <img
                        className="h-full w-full object-cover"
                        src={image}
                        alt={`Vista ${idx + 1}`}
                      />
                    </button>
                  ))}
                </div>

                <div className="order-1 rounded-[28px] bg-gradient-to-br from-slate-50 via-white to-green-50/60 p-6 lg:order-2">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="rounded-full bg-green-600 px-4 py-1 text-sm font-semibold text-white">
                      {singleVehicleDetail?.car_type || "Vehículo"}
                    </div>
                    {vehicleImages.length > 1 && (
                      <div className="rounded-full bg-slate-900 px-4 py-1 text-sm font-medium text-white">
                        {vehicleImages.length} fotos
                      </div>
                    )}
                  </div>

                  <img
                    className="mx-auto h-[360px] w-full object-contain md:h-[430px]"
                    src={activeImage || vehicleImages[0]}
                    alt={singleVehicleDetail?.model || "Vehículo"}
                  />
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] lg:p-8">
              <div className="flex flex-col gap-3 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-green-600">
                    Descripción
                  </p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    {singleVehicleDetail?.car_title || singleVehicleDetail?.name}
                  </h2>
                </div>
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                  Registro: {singleVehicleDetail?.registeration_number || "N/A"}
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_280px]">
                <div>
                  <p className="text-base leading-8 text-slate-600">
                    {singleVehicleDetail?.car_description ||
                      "Este vehículo combina comodidad, seguridad y estilo para ofrecerte una experiencia de manejo mucho más agradable."}
                  </p>
                </div>

                <div className="rounded-[28px] bg-slate-50 p-5">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Lo que incluye
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-600" />
                      Proceso de reserva rápido
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-600" />
                      Atención y soporte confiable
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-600" />
                      Vehículo verificado para alquiler
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <aside className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-green-600 px-7 py-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
                Detalles del vehículo
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight">
                {singleVehicleDetail?.name}
              </h1>
              <div className="mt-5 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
                <FaStar className="mr-2 text-yellow-300" />
                Calificación: {singleVehicleDetail?.rating || singleVehicleDetail?.ratting || 5}
              </div>
            </div>

            <div className="p-7">
              <div className="grid gap-3">
                {technicalDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-lg text-green-600">{detail.icon}</div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          {detail.label}
                        </p>
                        <p className="mt-1 text-sm font-medium text-slate-800">
                          {detail.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-900 p-6 text-white">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                      Precio
                    </p>
                    <div className="mt-2 flex items-end">
                      <h2 className="flex items-center text-4xl font-bold">
                        <FaIndianRupeeSign className="mr-1 text-2xl" />
                        {singleVehicleDetail?.price}
                      </h2>
                      <span className="ml-2 text-sm text-white/70">/día</span>
                    </div>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                    Reserva segura
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-green-600 px-6 py-4 text-base font-bold text-white transition hover:bg-green-500"
                  onClick={handleBook}
                >
                  <GrSecure className="mr-3" />
                  Reservar Auto
                </button>

                <ul className="mt-6 space-y-3 text-sm text-white/75">
                  <li>Atención rápida para completar tu alquiler.</li>
                  <li>Gestión simple y proceso de reserva claro.</li>
                  <li>Ideal para viajes urbanos, familiares o corporativos.</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default VehicleDetails;
