import { Link } from "react-router-dom";
import Footers from "../../components/Footer";
import { FaCarSide, FaChartLine, FaHandshake, FaShieldAlt } from "react-icons/fa";
import { MdSupportAgent, MdVerified } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";

const steps = [
  {
    number: "01",
    title: "Crea tu cuenta de vendedor",
    description:
      "Regístrate como vendedor en minutos. Solo necesitas tu información básica y los datos de tu vehículo.",
  },
  {
    number: "02",
    title: "Publica tus vehículos",
    description:
      "Sube fotos, establece tu precio por día y define la disponibilidad. Nosotros nos encargamos de la visibilidad.",
  },
  {
    number: "03",
    title: "Recibe reservas",
    description:
      "Los clientes reservan directamente en la plataforma. Tú recibes notificaciones y confirmas cada solicitud.",
  },
  {
    number: "04",
    title: "Cobra sin complicaciones",
    description:
      "El pago se procesa de forma segura. Recibes tu dinero directamente una vez finalizado el alquiler.",
  },
];

const benefits = [
  {
    icon: <FaChartLine />,
    title: "Ingresos adicionales",
    description:
      "Convierte tu vehículo en una fuente de ingresos pasivos cuando no lo estés usando.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Seguridad garantizada",
    description:
      "Cada arrendatario es verificado antes de poder realizar una reserva en la plataforma.",
  },
  {
    icon: <MdSupportAgent />,
    title: "Soporte dedicado",
    description:
      "Nuestro equipo está disponible para ayudarte con cualquier consulta sobre tus publicaciones.",
  },
  {
    icon: <MdVerified />,
    title: "Panel de control",
    description:
      "Administra tus vehículos, reservas y ganancias desde un panel claro y fácil de usar.",
  },
  {
    icon: <HiOutlineClipboardList />,
    title: "Sin burocracia",
    description:
      "El proceso de publicación es simple. Sin formularios interminables ni aprobaciones lentas.",
  },
  {
    icon: <FaHandshake />,
    title: "Relación directa",
    description:
      "Te conectamos directamente con los arrendatarios para que puedas gestionar tu flota con total transparencia.",
  },
];

function Enterprise() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black px-6 py-20 text-white md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-semibold text-white/90">
              Para vendedores
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Convierte tu auto en{" "}
              <span className="text-green-500">ingresos reales</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
              Publica tus vehículos en nuestra plataforma, llega a miles de
              clientes verificados y gestiona todo desde un solo lugar. Rápido,
              seguro y sin comisiones ocultas.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/vendorSignin">
                <button className="inline-flex min-h-[56px] items-center justify-center rounded-xl bg-green-600 px-8 py-3 text-base font-bold text-white transition hover:bg-green-500">
                  Iniciar sesión como vendedor
                </button>
              </Link>
              <Link to="/vendorSignup">
                <button className="inline-flex min-h-[56px] items-center justify-center rounded-xl border border-white/25 bg-white/10 px-8 py-3 text-base font-bold text-white transition hover:bg-white/20">
                  Crear cuenta de vendedor
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-black/10 bg-white px-6 py-10 md:px-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { value: "+500", label: "Vehículos publicados" },
            { value: "+1.200", label: "Reservas completadas" },
            { value: "4.8★", label: "Valoración promedio" },
            { value: "0%", label: "Comisiones ocultas" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-black">{stat.value}</p>
              <p className="mt-1 text-sm text-black/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Beneficios */}
      <section className="bg-white px-6 py-20 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full bg-green-50 px-4 py-1 text-sm font-semibold text-green-700">
              Beneficios
            </span>
            <h2 className="mt-4 text-3xl font-bold text-black md:text-4xl">
              ¿Por qué publicar con nosotros?
            </h2>
            <p className="mt-3 text-base text-black/60">
              Todo lo que necesitas para rentabilizar tu vehículo de forma
              simple y segura.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <article
                key={b.title}
                className="group rounded-[28px] border border-black/10 bg-white p-7 transition hover:border-green-500 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-2xl text-green-500">
                  {b.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-black">{b.title}</h3>
                <p className="mt-2 text-sm leading-7 text-black/60">
                  {b.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="bg-black px-6 py-20 text-white md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-semibold text-white/90">
              Proceso
            </span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Cómo funciona
            </h2>
            <p className="mt-3 text-base text-white/60">
              Desde el registro hasta recibir tu primer pago, todo en 4 pasos.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-[28px] border border-white/10 bg-white/5 p-7"
              >
                <span className="text-5xl font-extrabold text-green-500 opacity-80">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/60">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-white px-6 py-20 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-[36px] border border-black/10 bg-black p-12 text-white md:p-16">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-4xl">
              <FaCarSide />
            </div>
            <h2 className="mt-8 text-3xl font-extrabold md:text-4xl">
              ¿Listo para comenzar?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
              Únete a cientos de vendedores que ya generan ingresos con su
              vehículo. El registro es gratuito y toma menos de 5 minutos.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/vendorSignup">
                <button className="inline-flex min-h-[56px] items-center justify-center rounded-xl bg-green-600 px-10 py-3 text-base font-bold text-white transition hover:bg-green-500">
                  Registrarme como vendedor
                </button>
              </Link>
              <Link to="/contact">
                <button className="inline-flex min-h-[56px] items-center justify-center rounded-xl border border-white/25 px-10 py-3 text-base font-bold text-white transition hover:bg-white/10">
                  Hablar con el equipo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footers />
    </>
  );
}

export default Enterprise;