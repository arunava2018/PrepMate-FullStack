import React, { useContext, useEffect, createContext } from "react";
import useFetch from "./hooks/useFetch";
import {
  getCurrentUserProfile,
  login as apiLogin,
  signout as apiLogout,
  signup as apiSignup, 
} from "./db/apiAuth";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUserProfile);

  const isAuthenticated = !!user?.id;

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (formData) => {
    await apiLogin(formData);
    await fetchUser();
  };

  const signup = async (formData) => {   // ✅ add signup
    await apiSignup(formData);
    await fetchUser();
  };

  const logout = async () => {
    await apiLogout();
    await fetchUser();
  };

  return (
    <UrlContext.Provider
      value={{
        user,
        fetchUser,
        loading,
        isAuthenticated,
        login,
        signup,      // ✅ now available in UrlState()
        logout,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
