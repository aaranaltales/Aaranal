import { UserProvider } from './UserContext'
import { CheckoutProvider } from './CheckoutContext'
import { LoadingProvider } from './LoadingContext'

export default function Context({ children }) {
    return (
        <LoadingProvider>
            <UserProvider>
                <CheckoutProvider>
                    {children}
                </CheckoutProvider>
            </UserProvider>
        </LoadingProvider>
    )
}
