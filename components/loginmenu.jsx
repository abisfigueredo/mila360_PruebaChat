'use client';
import { auth } from '@/firebaseConfig';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

export const LoginMenu = ({ onClose }) => {
  const router = useRouter();

  const loginHandler = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    onClose();
    router.push('/');
  };

  const logoutHandler = async () => {
    await signOut(auth);
    onClose();
    router.push('/login');
  };

  return (
    <div className="absolute right-4 top-14 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg p-4 z-50">
      <button onClick={loginHandler} className="w-full text-left text-white hover:bg-gray-700 px-2 py-1 rounded">Iniciar sesión</button>
      <button onClick={logoutHandler} className="w-full text-left text-white hover:bg-gray-700 px-2 py-1 rounded mt-2">Cerrar sesión</button>
    </div>
  );
};
