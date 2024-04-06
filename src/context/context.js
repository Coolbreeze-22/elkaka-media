import React, { createContext, useState } from 'react'

export const PostContext = createContext();

export const Provider = ({ children }) => {
    
    const [ currentId, setCurrentId] = useState();
    // const [ deleteWarning, setDeleteWarning ] = useState();
    // const [ currentPage, setCurrentPage ] = useState(1);
    // const [ snackBar, setSnackBar ] = useState("");

    return(
        <PostContext.Provider value={{ currentId, setCurrentId }}>
            {children}
        </PostContext.Provider>
    )
}