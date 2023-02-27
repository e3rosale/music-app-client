import React, { createContext, useContext, useReducer } from 'react';
import { initialApplicationState } from './ApplicationInitialState';
import { applicationReducer } from './ApplicationReducer';

const ApplicationContext = createContext();

export const ApplicationStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(applicationReducer, initialApplicationState);
  
  return (
    <ApplicationContext.Provider value={{ state, dispatch }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationState = () => {
  const applicationState = useContext(ApplicationContext);

  if (applicationState === undefined) {
    throw new Error('useApplicationState must be used within an ApplicationStateProvider.');
  }

  return applicationState;
}