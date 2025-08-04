'use client'
import React, {useState, useEffect} from 'react';
import {Header} from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { ChatWindow } from '@/components/chatwindow';
import { db, auth } from "@/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { GoogleGenAI } from "@google/genai";

// Inicializa Gemini
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_KEY });


export default function chat({users}) {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState();
  const router = useRouter();

  //Proteger la conexión sin autenticación
  useEffect(() => {
    // Verifica si el usuario está autenticado
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });

    // Escucha los cambios en la colección "chats"
    const unsubscribeChats = onSnapshot(collection(db, "chats"), (snapshot) => {
      const chats = snapshot.docs.map((document) => document.data());
      setConversations(chats);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeChats();
    };
  }, []);

  return (
    <section>
      <Header/>
      <main className="flex h-screen bg-gray-900 text-white">
        <Sidebar conversations={conversations} setActiveConversation={setActiveConversation} />
        <div className="flex-1">
          <ChatWindow 
          activeConversation={activeConversation} setActiveConversation={setActiveConversation}
        />
        </div>
      </main>
    </section>    
  );
}
