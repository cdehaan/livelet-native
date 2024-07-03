import React, { createContext, useState, ReactNode, useContext } from 'react';

interface UserContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
}

const defaultContext: UserContextProps = {
    token: null,
    setToken: () => {},
};

export const UserContext = createContext<UserContextProps>(defaultContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

/*
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
*/