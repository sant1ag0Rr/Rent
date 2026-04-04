"use client";

import { FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";

export const HeroParallax = () => {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-slate-900 via-green-700 to-green-600 px-6 py-10 text-white shadow-[0_28px_80px_rgba(15,23,42,0.22)] md:px-10 lg:px-14 lg:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_24%)]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,480px)]">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-semibold text-white/90">
                Alquiler confiable y sin complicaciones
              </span>

              <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                Encuentra el auto perfecto a precios claros y con una reserva segura.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                Ya sea para una escapada de fin de semana o un alquiler a largo plazo,
                te ofrecemos planes flexibles, atencion confiable y una experiencia
                profesional de principio a fin.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <FaCheckCircle className="text-xl text-white" />
                  <p className="mt-3 text-sm font-semibold">Tarifas transparentes</p>
                  <p className="mt-1 text-xs text-white/75">Sin cargos ocultos ni sorpresas.</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <FaShieldAlt className="text-xl text-white" />
                  <p className="mt-3 text-sm font-semibold">Reserva protegida</p>
                  <p className="mt-1 text-xs text-white/75">Proceso estable y facil de completar.</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <HiOutlineSparkles className="text-xl text-white" />
                  <p className="mt-3 text-sm font-semibold">Flota cuidada</p>
                  <p className="mt-1 text-xs text-white/75">Vehiculos listos para salir a ruta.</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[460px]">
              <div className="absolute -top-6 right-2 h-24 w-24 rounded-[28px] bg-amber-300/95 md:h-28 md:w-28" />
              <div className="absolute -bottom-8 left-4 h-24 w-24 rounded-full bg-white/16 blur-sm md:h-32 md:w-32" />

              <div className="relative rounded-[28px] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md">
                <div className="rounded-[24px] bg-white p-3 shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
                  <img
                    src="https://evmwheels.com/front-theme/images/Group%20316.png"
                    alt="Vehiculo destacado"
                    className="h-auto w-full rounded-[18px] object-contain"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/700x420?text=Vehiculo+Destacado";
                    }}
                  />
                </div>

                <div className="absolute -top-5 left-4 rounded-2xl bg-white px-4 py-3 text-slate-900 shadow-xl">
                  <p className="text-xs font-medium text-slate-500">Clientes satisfechos</p>
                  <p className="mt-1 text-lg font-bold">+1,000</p>
                </div>

                <div className="absolute -bottom-5 right-4 rounded-2xl bg-white px-4 py-3 text-slate-900 shadow-xl">
                  <p className="text-xs font-medium text-slate-500">Reservas activas</p>
                  <p className="mt-1 text-lg font-bold">Disponibles hoy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
