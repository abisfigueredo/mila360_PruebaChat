'use client'
import "@/app/globals.css"
import React, { useEffect, useState} from "react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Card } from "@/components/card";
import { useRouter } from "next/navigation";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "next/navigation";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";


export default function Home() {

  const router = useRouter();
  const [users, setUsers] = useState([]);
  const params = useParams(); //hook de next para 

  //Proteger la conexión sin autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/"); // redirige a landing si no hay auth
      }
    });
    return () => unsubscribe();
  }, []);


  const startConversation = async (user) => {
    const conversationRef = doc(collection(db, "chats")); // Crea referencia sin guardar aún
    const firebaseID = conversationRef.id; // Obtiene el ID generado por Firebase

    const conversation = {
      messages: [],
      user: user,
      id: firebaseID, // Guarda el ID como parte del documento
    };

    await setDoc(conversationRef, conversation); // Guarda el documento con el ID ya asignado
    router.push("/chat");
  };

  useEffect(()=>{
    const getUsers = async ()=>{
      const resp = await fetch("https://randomuser.me/api/?results=24");
      const respuesta =await resp.json();
      setUsers(respuesta.results);
    }

    getUsers();    
  }, [] );


  return (
    <div className="w-full min-h-screen lg:min-h-screen bg-gray-900 pt-13">
      <Header></Header>
      <div className="mt-[12px] mx-4 rounded-xl p-[2px] bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 shadow-[0_0_20px_rgba(0,255,200,0.2)] hover:shadow-[0_0_30px_rgba(0,255,200,0.4)] transition-all duration-300 aurora-loop">
        <div className="rounded-[inherit] bg-gray-900 text-center text-white py-10 px-5 space-y-3">
          <h1 className="text-4xl font-bold tracking-wide">CLAIR</h1>
          <p className="text-sm text-gray-400 italic">Clear Language Artificial Intelligence Response</p>
          <p className="text-base mt-4">Select a digital conscience. Each with its own voice.</p>
        </div>
      </div>
      
      <section className="flex flex-wrap justify-center h-auto gap-5 mt-5">
        {
          users.map
          (
            (user) => 
              (
                <Card
                  key={user.login.uuid} 
                  user={user}
                  clickHandler={() => startConversation(user)}
                />
              )
          )
        }
      </section>
    </div>
  );
}
