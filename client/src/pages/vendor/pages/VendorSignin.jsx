import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../../redux/user/userSlice";
import styles from "../../..";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "email requerido" })
    .refine((value) => /\S+@\S+\.\S+/.test(value), {
      message: "Direccion de email invalida",
    }),
  password: z.string().min(1, { message: "contrasena requerida" }),
});

function VendorSignin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const { isLoading, isError } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    try {
      dispatch(signInStart());
      const res = await fetch("/api/vendor/vendorsignin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || data?.succes === false) {
        dispatch(signInFailure(data));
        return;
      }

      if (data.isVendor) {
        dispatch(signInSuccess(data));
        navigate("/vendorDashboard");
        return;
      }

      dispatch(signInFailure({ message: "La cuenta no tiene rol de vendedor" }));
    } catch (error) {
      dispatch(signInFailure({ message: "No se pudo conectar con el servidor" }));
    }
  };

  return (
    <>
      <div className="max-w-md w-full mx-auto mt-20 mb-10 bg-white rounded-[32px] shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 px-8 py-8 flex justify-between items-center text-white relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold tracking-tight">Iniciar Sesión</h1>
            <p className="text-slate-300 text-sm mt-1 font-medium">Portal para Vendedores Aliados</p>
          </div>
          <Link to="/" className="relative z-10 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-xl font-bold leading-none mb-1">&times;</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 p-8">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-slate-900/50 focus:border-slate-900 shadow-sm"
              placeholder="tu@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-slate-700">Contraseña</label>
              <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors">¿Olvidaste tu contraseña?</Link>
            </div>
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

          <button
            className="mt-2 w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 transition-all duration-300 disabled:bg-slate-300 disabled:shadow-none flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            ) : (
              "Ingresar al Panel"
            )}
          </button>

          {isError && (
             <div className="mt-2 p-3 bg-rose-50 border border-rose-100 rounded-lg text-center">
               <p className="text-sm font-semibold text-rose-600">{isError.message || "Algo salió mal"}</p>
             </div>
          )}

          <div className="mt-4 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              ¿Quieres ser vendedor?{" "}
              <Link to="/vendorsignup" className="text-slate-900 hover:text-black font-bold ml-1 transition-colors">
                Aplica aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default VendorSignin;
