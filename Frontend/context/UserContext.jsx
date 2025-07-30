"use client"

import Cookies from "js-cookie"
import { createContext, useContext, useEffect, useState } from "react"
import { userDetails } from "@/services/user"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                setUser(null);
                return;
            }

            const res = await userDetails(token);
            if (res.success === true) {
                setUser(res.user);
            } else {
                setUser(null);
                Cookies.remove("token");
            }
        } catch (error) {
            console.log(error)
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            loading,
            refreshUser: fetchUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)