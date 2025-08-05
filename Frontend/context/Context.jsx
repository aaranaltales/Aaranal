import { UserProvider } from './UserContext'
import { CheckoutProvider } from './CheckoutContext'

export default function Context({ children }) {
    return (
        <UserProvider>
            <CheckoutProvider>
                {children}
            </CheckoutProvider>
        </UserProvider>
    )
}
