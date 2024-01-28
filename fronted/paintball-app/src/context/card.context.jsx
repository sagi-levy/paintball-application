import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [myProp, setMyProp] = useState(null);

  const setProp = (value) => {
    setMyProp(value);
  };

  return (
    <AppContext.Provider value={{ myProp, setProp }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};