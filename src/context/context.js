import React, { createContext, useState } from 'react'

export const PostContext = createContext();

export const Provider = ({ children }) => {
    const [user, setUser] = useState();
    const [currentId, setCurrentId] = useState();

    return(
        <PostContext.Provider value={{ user, setUser, currentId, setCurrentId }}>
            {children}
        </PostContext.Provider>
    )
}