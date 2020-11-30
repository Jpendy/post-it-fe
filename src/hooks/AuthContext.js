import React, { useContext } from 'react';

export const AuthContext = React.createContext();

export const useActiveUser = () => {
    const { activeUser } = useContext(AuthContext);
    return activeUser;
};

export const useLogin = () => {
    const { login } = useContext(AuthContext);
    return login;
};

export const useSignup = () => {
    const { signup } = useContext(AuthContext);
    return signup;
};

export const useAuthError = () => {
    const { authError } = useContext(AuthContext);
    return authError;
};

export const useLogOut = () => {
    const { logout } = useContext(AuthContext);
    return logout;
};

//   export const useLogout = () => {
//     const { logout } = useContext(AuthContext);
//     return logout;
//   };

//   export const useAuthLoading = () => {
//     const { authLoading } = useContext(AuthContext);
//     return authLoading;
//   };
