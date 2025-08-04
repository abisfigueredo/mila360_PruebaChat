'use client';
import React from "react";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import {Header} from '@/components/header'

const Login = () =>{

  //para generar navegación al iniciar sesión o cerrar sesión
  const router= useRouter(); 

  //función para iniciar sesión con PopUp de Google
  const loginHandler= async () =>{
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    console.log(auth);
    router.push("/"); //utilizado para enviar a la ruta principal en este caso nuestra pagina page.js de la raiz del proyecto
  }

  //función para cerrar sesión con PopUp de Google
  const logout = async () =>{
    await signOut(auth);
    console.log(auth);
    router.push("/login"); //utilizado para enviar a la ruta de nuestra pagina de login
  }

  return (
    <div>
      <Header/>
      <section className="mt-12 flex gap-10">
        <h1>login</h1>
        <button onClick={loginHandler}>Iniciar sesión</button>
        <button onClick={logout}>Cerrar sesión</button>
      </section>
    </div>
    
  )
}
export default Login;