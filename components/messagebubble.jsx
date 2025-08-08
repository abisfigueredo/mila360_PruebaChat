'use client';

export const MessageBubble = ({ sender, text }) => {
  const isUser = sender === 'me';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] p-3 rounded-xl text-sm 
        ${isUser 
          ? 'bg-[#06296b] text-white rounded-br-none'
          : 'bg-[#007BFF] text-white rounded-tl-none'}`}>
        {text}
      </div>
    </div>
  );
};
