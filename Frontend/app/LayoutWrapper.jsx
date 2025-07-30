import { UserProvider } from '@/context/UserContext'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LayoutWrapper({ children }) {
    return (
        <div className="min-h-screen">
            <UserProvider>
                {children}
                <ToastContainer />
            </UserProvider>
        </div>
    )
}
