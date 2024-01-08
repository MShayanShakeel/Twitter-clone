import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [anotherState, setAnotherState] = useState(""); 


  const signIn = (user) => {
    setUserID(user);
  };

  const signOut = () => {
    setUserID(null);
  };

  const updateAnotherState = (value) => {
    setAnotherState(value);
  };

  return (
    <AuthContext.Provider value={{ userID, anotherState , signIn, signOut, updateAnotherState  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
