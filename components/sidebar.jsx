'use client';
import { CardChat } from './cardchat';

export const Sidebar = ({ conversations, setActiveConversation }) => (

  

  <aside className="w-[280px] mt-12 overflow-y-auto bg-gray-800 border-r border-gray-700">
    {/*{users.map((user, index) => (
      <CardChat key={user.login?.uuid || index} user={user} />
    ))}*/}
    {conversations.map((conversation, index) => (
            <CardChat
              key={index}
              user={conversation.user}
              clickHandler={() => setActiveConversation(conversation)}
            />
    ))}
  </aside>
   
);