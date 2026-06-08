import { FaCarSide, FaShieldAlt } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../index";
import Herocar from "../../Assets/black_fortuner.png";
import { HeroParallax } from "../../components/ui/Paralax";
import { setIsSweetAlert } from "../../redux/user/userSlice";
import Footers from "../../components/Footer";

const benefits = [
  {
    icon: <FaCarSide />,
    title: "Vehículos de Calidad",
    description: "Autos modernos y bien mantenidos para tu seguridad",
    iconStyle: "bg-green-600 text-white",
  },
  {
    icon: <HiCurrencyDollar />,
    title: "Precios Justos",
    description: "Tarifas competitivas sin cargos ocultos",
    iconStyle: "bg-black text-white",
  },
  {
    icon: <FaShieldAlt />,
    title: "Reserva Segura",
    description: "Proceso de reserva simple y confiable",
    iconStyle: "bg-green-600 text-white",
  },
];

function Home() {
  const { isSweetAlert } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sweetalert = () => {
    Swal.fire({
      show: true,
      title: "",
      text: "Vehículo reservado exitosamente",
      icon: "success",
      showDenyButton: true,
      confirmButtonText: "Ir al Inicio",
      confirmButtonColor: "#22c55e",
      denyButtonColor: "black",
      denyButtonText: "Ver Pedidos",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      } else if (result.isDenied) {
        navigate("/profile/orders");
      }
    });
    dispatch(setIsSweetAlert(false));
  };

  return (
    <>
      {isSweetAlert && sweetalert()}

      <section className="relative mx-auto min-h-[72vh] w-full overflow-hidden bg-white sm:max-w-[900px] md:min-h-[60vh] lg:min-h-[73vh] lg:max-w-[1500px]">

        <div className="relative z-10 mx-auto grid min-h-[72vh] max-w-7xl items-center gap-10 px-6 py-16 sm:px-10 md:min-h-[60vh] md:grid-cols-2 md:px-14 lg:min-h-[73vh] lg:px-20">
          <div className="max-w-3xl">
            <p className={`mb-4 text-xs md:text-sm text-black/60`}>
              Planifica tu viaje ahora
            </p>

            <h1 className="text-[42px] font-extrabold leading-[0.95] tracking-tight text-black sm:text-[54px] md:text-[64px] lg:text-[76px]">
              Ahorra <span className="text-green-600">mucho</span> con nuestro
              <br />
              alquiler de autos
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-black/60 md:text-lg">
              Alquila el auto de tus sueños. Precios inmejorables, kilómetros
              ilimitados, opciones de recogida flexibles y mucho más.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => navigate("/vehicles")}
                className="inline-flex min-h-[70px] items-center justify-center rounded-xl bg-green-600 px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-green-700"
              >
                <span>Ver Vehículos Disponibles</span>
                <span className="ml-3">
                  <i className="bi bi-car-front" />
                </span>
              </button>

              <button
                onClick={() => navigate("/enterprise")}
                className="inline-flex min-h-[70px] items-center justify-center rounded-xl bg-black px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-black/80"
              >
                <span>Información Empresarial</span>
                <span className="ml-3">
                  <i className="bi bi-building" />
                </span>
              </button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src={Herocar}
              alt="Auto destacado"
              className="h-auto w-full max-w-[560px] object-contain"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full bg-green-600 px-4 py-1 text-sm font-semibold text-white">
              Beneficios principales
            </span>
            <h2 className="mt-4 text-3xl font-bold text-black md:text-4xl">
              ¿Por qué elegirnos?
            </h2>
            <p className="mt-3 text-base text-black/50">
              Te ofrecemos una experiencia de alquiler clara, confiable y pensada
              para que encuentres el vehículo ideal sin complicaciones.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="group rounded-3xl bg-white p-8 text-center border border-black/10 transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${benefit.iconStyle}`}
                >
                  {benefit.icon}
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-black">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-lg leading-8 text-black/50">
                  {benefit.description}
                </p>
                <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-green-600 transition-transform duration-300 group-hover:scale-125" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <HeroParallax />
      <Footers />
    </>
  );
}

export default Home;
