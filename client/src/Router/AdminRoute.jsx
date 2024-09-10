import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthProvider'
import { Navigate } from 'react-router-dom'

export const AdminRoute = ({ children }) => {

    const { loading,admin } = useContext(AuthContext)
  
    if (loading ) {
        return <span className="loading loading-dots loading-lg"></span>
    }

    if (admin) {
        return children
    }

    return <Navigate to='/' />
}