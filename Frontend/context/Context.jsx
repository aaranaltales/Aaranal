import { UserProvider } from './UserContext'
import { CheckoutProvider } from './CheckoutContext'
import { LoadingProvider } from './LoadingContext'
import { ToastProvider } from "@/components/ToastContext";

export default function Context({ children }) {
    return (
        <LoadingProvider>
            <ToastProvider>
                <UserProvider>
                    <CheckoutProvider>
                        {children}
                    </CheckoutProvider>
                </UserProvider>
            </ToastProvider>
        </LoadingProvider>
    )
}
