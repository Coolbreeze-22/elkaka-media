import React, { createContext, useState } from 'react'

export const PostContext = createContext();

export const Provider = ({ children }) => {
    const [currentId, setCurrentId] = useState("");

    return(
        <PostContext.Provider value={{ currentId, setCurrentId }}>
            {children}
        </PostContext.Provider>
    )
}

// export const useStateContext = () => useContext(PostContext)