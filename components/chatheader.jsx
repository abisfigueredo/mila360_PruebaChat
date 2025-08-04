// components/ChatHeader.jsx
'use client';
import Image from 'next/image';

export const ChatHeader = ({ user, lastMessageTime }) => {
  return (
    <header className="w-full h-16 px-4 flex items-center gap-3 border-b border-gray-700 bg-gray-800 z-10">
      {/* Avatar del personaje */}
      <Image
        src={user.imageUrl || '/default_avatar.png'} // Ajusta la ruta si no hay imagen
        alt={`${user.name.first} avatar`}
        width={36}
        height={36}
        className="rounded-full"
      />

      {/* Nombre + actividad */}
      <div className="flex flex-col">
        <p className="font-semibold text-white">{user.name.first}</p>
        <span className="text-xs text-gray-400">Última conexión: {lastMessageTime}</span>
      </div>
    </header>
  );
};
