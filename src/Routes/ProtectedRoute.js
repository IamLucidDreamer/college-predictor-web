import { getAuthToken, redirectToLogin } from '../helpers/auth';

function ProtectedRoute({ children }) {
    try {
        const authToken = getAuthToken();
        if (authToken) {
            return <>{children}</>;
        }
        // Redirect to login domain\
        redirectToLogin()
        return null;
    } catch (error) {
        console.error("Error : ", error);
        // Redirect to login domain
        redirectToLogin();
        return null;
    }
}

export default ProtectedRoute;
