import { useState } from "react";
import styles from "../../index";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    username: z.string().min(3, { message: "Minimo 3 caracteres requeridos" }),
    email: z
      .string()
      .min(1, { message: "Email requerido" })
      .refine((value) => /\S+@\S+\.\S+/.test(value), {
        message: "Email invalido",
      }),
    password: z
      .string()
      .min(8, { message: "Minimo 8 caracteres" })
      .regex(/[A-Z]/, { message: "Al menos una mayuscula" })
      .regex(/[a-z]/, { message: "Al menos una minuscula" })
      .regex(/[0-9]/, { message: "Al menos un numero" })
      .regex(/[^A-Za-z0-9]/, { message: "Al menos un caracter especial" }),
    confirmPassword: z.string().min(1, { message: "Confirma tu contrasena" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contrasenas no coinciden",
    path: ["confirmPassword"],
  });

function SignUp() {
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
      const res = await fetch("/api/auth/signup", {
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

      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <>
      <div className="max-w-md w-full mx-auto mt-20 mb-10 bg-white rounded-[32px] shadow-2xl shadow-black/10 border border-black/10 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-8 flex justify-between items-center text-white relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold tracking-tight">Crear cuenta</h1>
            <p className="text-emerald-50 text-sm mt-1">Únete y empieza a alquilar tu auto ideal</p>
          </div>
          <Link to="/" className="relative z-10 text-white/80 hover:text-white transition-colors bg-black/10 hover:bg-black/20 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-xl font-bold leading-none mb-1">&times;</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-8">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              className="w-full bg-black/5 border border-black/10 text-black rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500 shadow-sm"
              placeholder="ej. Juan Perez"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="w-full bg-black/5 border border-black/10 text-black rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500 shadow-sm"
              placeholder="tu@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              className="w-full bg-black/5 border border-black/10 text-black rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500 shadow-sm"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full bg-black/5 border border-black/10 text-black rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500 shadow-sm"
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            className="mt-3 w-full py-3.5 px-4 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold rounded-xl shadow-lg shadow-green-600/30 transition-all duration-300 disabled:bg-black/30 disabled:shadow-none flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            ) : (
              "Crear cuenta gratuita"
            )}
          </button>

          {isError && (
             <div className="mt-2 p-3 bg-black/5 border border-black/10 rounded-lg text-center">
               <p className="text-sm font-semibold text-red-600">{isError}</p>
             </div>
          )}

          <div className="mt-2 pt-6 border-t border-black/10 text-center">
            <p className="text-sm text-black/50 font-medium">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/signin" className="text-green-600 hover:text-green-700 font-bold ml-1 transition-colors">
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
