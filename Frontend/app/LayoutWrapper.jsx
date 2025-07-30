import { UserProvider } from '@/context/UserContext'

export default function LayoutWrapper({ children }) {
    return (
        <div className="min-h-screen">
            <UserProvider>
                {children}
            </UserProvider>
        </div>
    )
}
