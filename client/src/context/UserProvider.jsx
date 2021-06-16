import { createContext, useReducer } from "react";
import userReducer from "../reducers/userReducer"

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const initial = {
        isAuthenticated: false,
        user: {},
    }
    const initialState = JSON.parse(sessionStorage.getItem("user")) || initial;
    const [state, dispatch] = useReducer(userReducer,initialState);

    return ( 
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
     );
}
 
export default UserProvider;