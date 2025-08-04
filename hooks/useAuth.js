import React, { useState, useEffect } from "react";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export function useAuth(){
  const [autenticatedUser, setAutenticatedUser] = useState;
  
  useEffect(() =>{
    const unsuscribe = onAuthStateChanged(auth, setAutenticatedUser);
    return () => unsuscribe();
  },[])
  
  return autenticatedUser
}