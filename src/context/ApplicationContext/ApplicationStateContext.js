import React, { createContext, useContext, useReducer } from 'react';
import { initialState } from './ApplicationInitialState';
import reducer from './ApplicationReducer';

const ApplicationContext = createContext();

export const ApplicationStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <ApplicationContext.Provider value={{ state, dispatch }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useStateValue = () => useContext(ApplicationContext);