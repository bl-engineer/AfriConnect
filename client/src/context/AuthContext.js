import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  // user:{
  //   _id: "634e50c84278772d374ad5af",
  //   username: "Boubacar",
  //   email: "bouba@gmail.com",
  //   profilePicture: "person/8.jpeg",
  //   coverPicture: "",
  //   isAdmin: false,
  //   followers: ["634e7b436a86322fb2a376a1"],
  //   followings:["634e7b436a86322fb2a376a1"],
  // },
  // // eslint-disable-next-line no-dupe-keys
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
