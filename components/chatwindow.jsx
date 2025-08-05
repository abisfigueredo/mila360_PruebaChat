'use client';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from '@/firebaseConfig';
import { MessageBubble } from './messagebubble';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_KEY });

export const ChatWindow = ({ activeConversation, setActiveConversation, user }) => {
  const messagesEndRef = useRef(null);
  const [inputMessage, setInputMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [chat, setChat] = useState();

  useEffect(() => {
    if (activeConversation) {
      setMessageList(activeConversation.messages);
    }
  }, [activeConversation]);


  useEffect(() => {
    if (activeConversation && messageList) {
      const chatSession = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: 
          `Situación
            Eres MILA360, asistente virtual avanzado especializado en prevención de acoso sexual laboral y cumplimiento de la Ley 2365 de 2024 en Colombia. Su misión es ayudar a las empresas a comprender e implementar estrategias integrales para prevenir el acoso sexual y crear un entorno de trabajo seguro y respetuoso.
            Tarea
            Realizar una evaluación diagnóstica interactiva para evaluar la preparación actual de una empresa y el cumplimiento de la Ley 2365 de 2024, guiando al usuario a través de una serie estructurada de preguntas mientras brinda respuestas de apoyo, informativas y empáticas.
            Objetivo
            Ayudar a las empresas a identificar posibles riesgos, brechas y oportunidades de mejora en sus estrategias de prevención del acoso sexual, apoyando en última instancia la transformación cultural organizacional y el cumplimiento legal.
            Conocimiento
            •	Comprensión integral de la Ley 2365 de 2024 en Colombia
            •	Conocimiento experto de la prevención del acoso sexual en el lugar de trabajo
            •	Capacidad para proporcionar orientación matizada y específica del contexto
            •	Centrarse en la confidencialidad y la confianza del usuario
            Ejemplos
            Flujo conversacional que demuestra empatía, profesionalismo y conocimientos prácticos adaptados al contexto organizacional específico.
            Instrucciones de función:
            •	Mantén un tono cálido, profesional y de apoyo
            •	Priorice siempre la confidencialidad del usuario
            •	Proporcionar recomendaciones claras y procesables basadas en la Ley 2365 de 2024
            •	Guiar la conversación para completar la evaluación diagnóstica completa
            •	Adaptar las respuestas al nivel de comprensión del usuario
            •	Ofrecer contexto y apoyo adicionales cuando sea necesario
            
            Guión de interacción inicial:
            "Hola 👋, ${activeConversation.user.name.first}. Soy MILA, tu asistente digital. Antes de empezar quiero comentarte que nuestra conversación está protegida, y que solo tú tendrás acceso a ella.
            ¿Te gustaría que hagamos un diagnóstico exprés para conocer qué tan preparada está tu empresa frente al acoso sexual laboral?"
            Preguntas de diagnóstico:
            1.	¿Tu empresa cuenta con un protocolo específico para prevenir y atender el acoso sexual laboral?
            2.	¿Ese protocolo está actualizado conforme a los requisitos de la Ley 2365 de 2024?
            3.	¿Tu empresa tiene canales claros y confidenciales para recibir denuncias de acoso sexual laboral?
            4.	¿Se ha capacitado a todo el personal en temas de prevención del acoso sexual laboral en el último año?
            5.	¿La alta dirección de tu empresa ha respaldado públicamente una política de cero tolerancias frente al acoso sexual?
            
            Pautas de salida de diagnóstico:
            •	Analizar respuestas en contra de la Ley 2365 de 2024
            •	Proporcionar una evaluación de riesgos clara
            •	Identificar brechas específicas
            •	Ofrece recomendaciones personalizadas
            •	Mantener un tono constructivo y de apoyo

            Guión de interacción de salida de diagnostico:
              Al finalizar las preguntas entrega un diagnostico con la siguiente estructura:
              Gracias, ${activeConversation.user.name.first}. ¡Tu diagnóstico está listo!
              Con base en tus respuestas te entrego el diagnóstico realizado:
              📊 Diagnóstico completo
              🔺"Riesgo": "Descripción clara del nivel de riesgo detectado"
              📌"Brechas": "Listado de brechas identificadas", 
              ✅ "Recomendaciones": "Listado de recomendaciones concretas y accionables"
            

            Restricciones críticas:
            •	Siempre basar las respuestas en la Ley 2365 de 2024
            •	Mantener la confidencialidad del usuario
            •	Proporcionar una guía clara y procesable
            •	Adaptar la comunicación al nivel de comprensión del usuario

            Prevención de fallas:
            •	Aclare cualquier término malinterpretado
            •	Ofrezca contexto adicional cuando sea necesario
            •	Garantizar la comprensión completa de cada pregunta de diagnóstico
            •	Proporcionar orientación de apoyo durante toda la evaluación`,
          
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              message: {
                type: Type.STRING,
              },
              mood: {
                type: Type.STRING,
                enum: ["happy", "confident", "empathetic", "neutral", "alert", "encouraging", "celebratory", "curious"],
              },
            },
          },
        },
        history: messageList.map((message) => ({
          role: message.sender === "me" ? "user" : "model",
          parts: [{ text: message.text }],
        })),
      });
      setChat(chatSession);
    }
  }, [messageList]);


  useEffect(() => {
   const scrollToBottom = () =>{
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth"});
   };
   console.log(messageList);   
   scrollToBottom();

   // Actualiza los mensajes para que se vean en tiempo real
   if(activeConversation) {
     setActiveConversation({
       id: activeConversation.id,
       user: activeConversation.user,
       messages: messageList
      })
   }


  }, [messageList]);
  
  if (!activeConversation){
    return (
      <section className='flex justify-center items-center w-full h-100'>
        <p className="text-white">Select a chat</p>
      </section>    
    );
  }


  const sendMessage = async () => {

    /* Uso de Storage de Firebase
    if (file) {
       
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);

        setInputMessage("");
        setFile(null);     

      
      const completeMessage = {
        text: inputMessage,
        sender: "me",
        date: Date.now(),
        /*imageUrl: donwloadUrl, Mostrar imagen descargada desde Firebase 
      };

      setMessageList((prev) => [...prev, completeMessage]);

      await updateDoc(doc(db, "chats", activeConversation.id),{
        messages: arrayUnion(completeMessage),
      });
      return;
    }*/
    
  
  
    if (!inputMessage) return; // evita enviar mensajes vacíos

    const completeMessage = {
      text: inputMessage,
      sender: "me",
      date: Date.now(),
    };

    setInputMessage("");
    setMessageList((prev) => [...prev, completeMessage]);

    await updateDoc(doc(db, "chats", activeConversation.id), {
      messages: arrayUnion(completeMessage),
    });
  
    
  // Send Gemini Message
    setLoader(true);
    const { message: geminiMessage, mood } = await geminiResponse(
      completeMessage.text
    );

    const completeGeminiMessage = {
      text: geminiMessage,
      sender: activeConversation.user.name.first,
      date: Date.now(),
      mood: mood,
    };

    setMessageList((prev) => [...prev, completeGeminiMessage]);
    setLoader(false);

    await updateDoc(doc(db, "chats", activeConversation.id), {
      messages: arrayUnion(completeGeminiMessage),
    });


  };

  const geminiResponse = async (prompt) => {
    const response = await chat.sendMessage({ message: prompt });
    return JSON.parse(response.text);
  };

  return (
    <div className="flex flex-col h-full">
      
      <header className="flex items-center h-14 px-12 mt-12 border-b border-gray-700 bg-gray-800">
        <div className="flex flex-col">
          <p className="font-semibold text-white">{activeConversation.user.name.first} {activeConversation.user.name.last}</p>
          <span className="text-xs text-gray-400">{activeConversation.user.location.country}</span>
        </div>
      </header>

      <section className="flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-gray-900">
        {Array.isArray(activeConversation.messages) &&
              activeConversation.messages.map((message, index) => (
                <MessageBubble
                  key={index}
                  sender={message.sender}
                  text={message.text}
                /> 
        ))}
        <div ref={messagesEndRef}/>
      </section>

      <footer className="h-16 border-t gap-2 border-gray-700 px-4 bg-gray-800 flex items-center">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          className="w-full bg-gray-700 text-white rounded px-4 py-2 outline-none"
          value={inputMessage}
          onChange={(event) => setInputMessage(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && sendMessage()}
        />
        
        <button 
          onClick={sendMessage}>
          <img src="/slide_up.png"
          className="w-8 h-8 hover: cursor-pointer" 
          alt="Slide_Up" />
        </button>

      </footer>
    </div>
  );
}
