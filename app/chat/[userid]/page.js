import { Sidebar } from '@/components/sidebar';
import { ChatWindow } from '@/components/ChatWindow';
import {Header} from '@/components/header'

const getUsuarios = async () => {
  const res = await fetch('https://randomuser.me/api/?results=10');
  const data = await res.json();
  return data.results;
};

export default async function HomePage() {
  const usuarios = await getUsuarios();

  return (
    <div>
      <Header/>
      <main className="flex h-screen mt-12 bg-gray-900 text-white">
        <Sidebar usuarios={usuarios} />
        <div className="flex-1">
          <ChatWindow />
        </div>
      </main>
    </div>    
  );
}
