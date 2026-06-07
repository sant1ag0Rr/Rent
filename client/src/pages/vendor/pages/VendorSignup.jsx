import { Link, useNavigate } from "react-router-dom";
import styles from "../../..";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    username: z.string().min(3, { message: "minimo 3 caracteres requeridos" }),
    email: z
      .string()
      .min(1, { message: "email requerido" })
      .refine((value) => /\S+@\S+\.\S+/.test(value), {
        message: "Direccion de email invalida",
      }),
    password: z
      .string()
      .min(8, { message: "minimo 8 caracteres requeridos" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message:
          "La contrasena debe contener al menos una mayuscula, una minuscula, un numero y un caracter especial",
      }),
    confirmPassword: z.string().min(1, { message: "confirmar contrasena requerido" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contrasenas no coinciden",
    path: ["confirmPassword"],
  });

function VendorSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [isError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/vendor/vendorsignup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      setLoading(false);

      if (!res.ok || data?.succes === false) {
        setError(data?.message || "No se pudo registrar");
        return;
      }

      navigate("/vendorsignin");
    } catch (error) {
      setLoading(false);
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <>
      <div className="max-w-md w-full mx-auto mt-20 mb-10 bg-white rounded-[32px] shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 px-8 py-8 flex justify-between items-center text-white relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold tracking-tight">Ser Vendedor</h1>
            <p className="text-slate-300 text-sm mt-1 font-medium">Únete a nuestra red de aliados</p>
          </div>
          <Link to="/" className="relative z-10 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-xl font-bold leading-none mb-1">&times;</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-8">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre de Vendedor / Empresa</label>
            <input
              type="text"
              id="username"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-slate-900/50 focus:border-slate-900 shadow-sm"
              placeholder="ej. Autos Premium S.A."
              {...register("username")}
            />
            {errors.username && (
              <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Correo Corporativo</label>
            <input
              type="email"
              id="email"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-slate-900/50 focus:border-slate-900 shadow-sm"
              placeholder="tu@empresa.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-slate-900/50 focus:border-slate-900 shadow-sm"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-slate-900/50 focus:border-slate-900 shadow-sm"
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            className="mt-3 w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 transition-all duration-300 disabled:bg-slate-300 disabled:shadow-none flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            ) : (
              "Enviar solicitud"
            )}
          </button>

          {isError && (
             <div className="mt-2 p-3 bg-rose-50 border border-rose-100 rounded-lg text-center">
               <p className="text-sm font-semibold text-rose-600">{isError}</p>
             </div>
          )}

          <div className="mt-2 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              ¿Ya eres un aliado?{" "}
              <Link to="/vendorsignin" className="text-slate-900 hover:text-black font-bold ml-1 transition-colors">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default VendorSignup;
