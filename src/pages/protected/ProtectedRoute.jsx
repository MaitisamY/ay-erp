import { Navigate } from 'react-router-dom'
import { useUser } from '../../hooks/UserProvider'

const ProtectedRoute = ({ children }) => {
    const { token } = useUser()
    return token ? children : <Navigate to="/" />
}

export default ProtectedRoute