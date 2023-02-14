import React, { createContext, useContext, useReducer } from 'react';
import { initialState } from './initialState';
import reducer from './reducer';

export const StateContext = createContext(null);

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);