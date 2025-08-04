'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import Image from "next/image";

const Landing = () => {
  const router = useRouter();

  const loginHandler = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push("/"); // te lleva al home si se autentica
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 text-center space-y-6">
      <Image src="/clair-logo.png" alt="CLAIR" width={120} height={60} />
      <h1 className="text-4xl font-bold tracking-wide">CLAIR</h1>
      <p className="italic text-gray-400">Clear Language Artificial Intelligence Response</p>
      <p className="max-w-md text-sm text-gray-300">
        CLAIR es una interfaz conversacional avanzada basada en inteligencia artificial que adapta su respuesta según el perfil, emoción y narrativa del usuario con una estética futurista.
      </p>
      <button
        onClick={loginHandler}
        className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 text-black font-semibold rounded shadow hover:opacity-90 transition"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
};

export default Landing;
