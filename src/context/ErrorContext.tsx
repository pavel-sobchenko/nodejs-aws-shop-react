import React, { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const handleError = (error) => {
    setError(error);
    console.log(error);
    alert(`Code Error: 203\nError blablabla`);
  };

  const clearError = () => setError(null);

  return (
    <ErrorContext.Provider value={{ error, handleError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

export { ErrorProvider, useError };
