// src/components/Menu_lateral.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useState, useEffect } from "react";

const Menu_lateral = ({ Abierto, Cerrado }) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  // Manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("ingredientesSeleccionados");
      Cerrado();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Verificar el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Fondo oscuro */}
      {Abierto && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={Cerrado}
        ></div>
      )}

      {/* Menú lateral con animación */}
      <nav
        className={`flex flex-col fixed top-0 right-0 h-full bg-white shadow-lg z-50 w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5
          transform transition-transform duration-300 ease-in-out
          ${Abierto ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Botón cerrar */}
        <div
          className="font-bold text-right bg-peach h-24 sm:h-20 md:h-28 lg:h-32 flex items-center justify-end pr-6"
          onClick={Cerrado}
        >
          <button className="text-4xl cursor-pointer">×</button>
        </div>

        {/* Lista de enlaces */}
        <ul className="flex-grow md:text-2xl text-xl flex flex-col">
          <li className="p-4">
            <Link to="/" onClick={Cerrado}>
              Inicio
            </Link>
          </li>
          {usuario && (
            <>
              <li className="p-4 cursor-pointer">
                <Link to="/nevera" onClick={Cerrado}>
                  Mi Nevera
                </Link>
              </li>
              <li className="p-4 cursor-pointer">
                <Link to="/recetas-favoritas" onClick={Cerrado}>
                  Recetas
                </Link>
              </li>
              <li className="p-4 cursor-pointer">
                <Link to="/perfil" onClick={Cerrado}>
                  Perfil
                </Link>
              </li>
              <li className="p-4 cursor-pointer" onClick={handleLogout}>
                Cerrar Sesión
              </li>
            </>
          )}
        </ul>

        {/* Espacio inferior */}
        <div className="bg-peach h-20 sm:h-20 md:h-21 lg:h-24"></div>
      </nav>
    </>
  );
};

export default Menu_lateral;
