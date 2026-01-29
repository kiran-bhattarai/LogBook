import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)

    const [loading, setLoading] = useState(false)

    const API_URL = import.meta.env.VITE_API_URL;


    const login = async (email, password) => {

        setLoading(true)

        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })

        if (!res.ok) throw new Error("Login failed")

        const data = await res.json()

        setUser(data.user)
        setAccessToken(data.accessToken)

        setLoading(false)
    }


    const logout = async () => {

        setLoading(true)

        const res = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        })

        if (!res.ok) throw new Error("Logout failed")

        setUser(null)
        setAccessToken(null)
    }


    const refreshAccessToken = async () => {
        try {
            const res = await fetch(`${API_URL}/auth/refresh`, {
                method: "POST",
                credentials: "include"
            })

            if(!res.ok) throw new Error("Refresh failed")
            
            const data = await res.json()

            setAccessToken(data.accessToken)
            setUser(data.user)
            return data.accessToken
        }
         catch (err) {
            console.error(err)
            setUser(null)
            setAccessToken(null)
            return null

        }
    }


    const protectedFetch = async (url, options = {}) => {
        let token = accessToken
        
        if(!token) token = await refreshAccessToken()
        
        const config = {
            ...options,
            headers: {
                ...(options.headers || {}),
                Authorization: token ? `Bearer ${token}` : undefined,
            },
            credentials: "include"
        }

        let res = await fetch(url, config)

        if(res.status === 401) {
            const newToken = await refreshAccessToken()
            if(newToken){
                config.headers.Authorization = `Bearer ${newToken}`
                res = await fetch(url, config)
            }
        }

        return res
    }

    useEffect(() => {
        const init = async() => {
            await refreshAccessToken()
            setLoading(false)
        }
        init()
    }, [])


    return (
        <AuthContext.Provider value={{ user, accessToken, loading, login, logout, protectedFetch }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)