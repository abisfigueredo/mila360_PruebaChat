import React from "react";

export const CardChat = ({ user, clickHandler }) => (
  <article className="flex items-center gap-3 p-4 hover:bg-gray-700 cursor-pointer transition" onClick = {clickHandler}>
    <img
      src={user.picture?.medium ? user.picture.medium : user.picture}
      alt={user.name.first}
      className="w-10 h-10 rounded-full border border-gray-500"
    />
    <div>
      <p className="font-semibold text-white text-sm">{user.name.first} {user.name.last}</p>
      <p className="text-xs text-gray-400">{user.location.city} - {user.location.country} </p>
      <p className="text-xs text-gray-400">Online</p>
    </div>
  </article>
);