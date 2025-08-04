'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BootLoader() {
  const router = useRouter();
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    const redirect = setTimeout(() => {
      router.push('/home');
    }, 3500); // ⏳ duración de la animación

    return () => {
      clearInterval(interval);
      clearTimeout(redirect);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl animate-pulse">CLAIR Protocol Initiated{dots}</h1>
      <p className="text-sm text-gray-400 mt-4 italic">
        Cargando conciencia digital, estableciendo vínculo neural...
      </p>

      <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 animate-pulse rounded-full" />
    </div>
  );
}
