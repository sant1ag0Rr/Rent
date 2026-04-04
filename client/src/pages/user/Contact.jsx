import { FiClock, FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";
import Footers from "../../components/Footer";

const contactCards = [
  {
    icon: <FiPhoneCall />,
    title: "Llámanos",
    detail: "+57 300 123 4567",
    helper: "Atención rápida para reservas y soporte.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: <FiMail />,
    title: "Escríbenos",
    detail: "soporte@alquilaunauto.com",
    helper: "Respondemos dudas, cambios y solicitudes.",
    color: "bg-slate-100 text-slate-700",
  },
  {
    icon: <FiMapPin />,
    title: "Visítanos",
    detail: "Bogotá, Colombia",
    helper: "Punto de atención para gestión comercial.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: <FiClock />,
    title: "Horario",
    detail: "Lun a Sáb, 8:00 AM - 7:00 PM",
    helper: "Siempre listos para ayudarte con tu viaje.",
    color: "bg-slate-100 text-slate-700",
  },
];

function Contact() {
  return (
    <>
      <section className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_420px]">
            <div className="rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-green-600 p-8 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] md:p-10">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-semibold text-white/90">
                Contacto
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
                Estamos listos para ayudarte a encontrar el auto ideal
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                Si tienes dudas sobre vehículos, reservas, pagos o planes para
                empresas, nuestro equipo puede orientarte de forma rápida y clara.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {contactCards.map((card) => (
                  <article
                    key={card.title}
                    className="rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur-sm"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${card.color}`}
                    >
                      {card.icon}
                    </div>
                    <h2 className="mt-4 text-lg font-semibold">{card.title}</h2>
                    <p className="mt-1 text-sm font-medium text-white">{card.detail}</p>
                    <p className="mt-2 text-sm leading-6 text-white/75">{card.helper}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <div>
                <span className="inline-flex rounded-full bg-green-50 px-4 py-1 text-sm font-semibold text-green-700">
                  Respuesta rápida
                </span>
                <h2 className="mt-5 text-3xl font-bold text-slate-900">
                  Hablemos de tu próxima reserva
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  Cuéntanos qué tipo de vehículo necesitas y te ayudamos a elegir
                  la mejor opción para tu viaje, empresa o evento especial.
                </p>
              </div>

              <div className="mt-10 space-y-4">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">
                    Soporte para reservas
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Cambios de fecha, confirmaciones, disponibilidad y asistencia
                    general en el proceso de alquiler.
                  </p>
                </div>
                <div className="rounded-2xl bg-green-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">
                    Atención empresarial
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Planes corporativos, alquiler por periodos largos y soluciones
                    para equipos o compañías.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footers />
    </>
  );
}

export default Contact;
