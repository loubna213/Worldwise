import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialStale = {
    user: null,
    isAuth: false,
}

function reducer(state, action) {
    switch(action.type) {
        case 'login':
            return { ...state, user: action.payload ,isAuth: true }
        case 'logout':
            return { ...state, ...initialStale }
        default: throw new Error('Unknown action')
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialStale);
    const {user, isAuth} = state;

    function login(email, password) {
        if(FAKE_USER.email === email && FAKE_USER.password === password) {
            dispatch({type: 'login', payload: FAKE_USER})
        }
    }

    function logout() {
        dispatch({type: 'logout'})
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuth,
            login,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)
    if(context === undefined) throw new Error('AuthContext was use outside AuthProvider');
    return context;
}

export { AuthProvider, useAuth }