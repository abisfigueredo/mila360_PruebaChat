import React from "react";

export const Card = ({user, clickHandler}) => {
  return(
    <article className="flex flex-col item-center justify-center w-40 h-40 hover: cursor-pointer" onClick = {clickHandler}>      
      <div className="w-26 h-26 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 via-green-400 to-yellow-400">
        <img 
          src={user.picture.large} 
          className="w-25 h-25 flex items-center justify-center mx-auto rounded-full border-4 border-gray-900"
          alt={`Avatar - ${user.name.first}`}
        />
      </div>
      <div className="w-40 center justify-center text-center rounded-full mx-auto my-[-10px]  bg-gradient-to-tr from-blue-500 via-green-400 to-yellow-400 text-white" >
        <p className="text-sm">{user.name.first}</p>
        <p className="text-xs">{user.location.country}</p>
      </div>
    </article>
  )
}