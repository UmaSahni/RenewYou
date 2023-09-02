import React, { createContext, useState } from 'react';

export const UserProfile = createContext()

export const UserProfileProvider = ({children}) =>{
   const [profile, setProfile] = useState({})
   const [userId, setuserId] = useState(24)
   return (
        <UserProfile.Provider value={{profile, setuserId, userId}} >
            {children}
        </UserProfile.Provider>
    )
}