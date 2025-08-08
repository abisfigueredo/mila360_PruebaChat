'use client'
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import toast from "react-hot-toast";

export const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  //para generar navegación al iniciar sesión o cerrar sesión
  const router= useRouter(); 
  
    //función para iniciar sesión con PopUp de Google
    const loginHandler= async () =>{
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log(auth);
      router.push("/home"); //utilizado para enviar a la ruta principal en este caso nuestra pagina page.js de la raiz del proyecto
    }
  
    /*//función para cerrar sesión con PopUp de Google
    const logout = async () =>{
      await signOut(auth);
      console.log(auth);
      router.push("/"); //utilizado para enviar a la ruta de nuestra pagina de home
    }*/

      // Cerrar sesión con efecto narrativo
  const logout = async () => {
    await signOut(auth);
    console.log(auth);
    
    toast("🔌 Vínculo neural terminado. CLAIR te espera en la siguiente sesión.");
    
    setTimeout(() => {
      router.push("/"); // Redirección a la página principal
    }, 1500); // Tiempo para que el mensaje pueda verse
  };

    

  return (
    <header className="flex items-center justify-between w-full h-12 top-0 left-0 z-50 fixed bg-gray-800  border-b border-gray-700 shadow-md px-4">
      <Link href="/home">
        <img src="/clair-logo.png" alt="CLAIR" width={100} height={40} className="w-30 h-30 mt-2 hover:opacity-90 transition"/>
      </Link>
      <ul className="flex gap-5 mr-5 text-white" >
        <Link href="/chat">
          <li>
            <img src="/chats.png"className="w-6 h-6"></img>
          </li>
        </Link>

        <li>
          {/*Boton para cerrar sesión*/}
          <button
            onClick={logout}
            className="px-4 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-red-500 via-pink-600 to-purple-700 
            shadow-[0_0_12px_rgba(255,0,100,0.4)] hover:shadow-[0_0_24px_rgba(255,0,150,0.6)] 
            hover:animate-pulse hover:scale-105 transition-all duration-300 ease-in-out"
          >
            🧠 Desvincular conciencia
          </button>
        </li>
      </ul>
    </header>
  )
}