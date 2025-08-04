'use client';
export const MessageBubble = ({ sender, text }) => {
  const isUser = sender === 'me';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] p-3 rounded-xl text-sm 
        ${isUser 
          ? 'bg-blue-600 text-white rounded-br-none'
          : 'bg-gradient-to-tr from-blue-500 via-green-400 to-yellow-400 text-white rounded-tl-none'}`}>
        {text}
      </div>
    </div>
  );
};
