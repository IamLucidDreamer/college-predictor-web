export const getAuthToken = () => {
    const token = localStorage.getItem("authTOoken")
    if (token) {
        return token
    }
    else {
        return null
    }
}

export const redirectToLogin = () => {
    window.history.pushState("/login")
}