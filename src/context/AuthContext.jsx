import { createContext, useEffect, useState } from "react";

import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext({
  user: null,
  loading: true,
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unSub();
  }, [auth]);


  const value = {
    user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
