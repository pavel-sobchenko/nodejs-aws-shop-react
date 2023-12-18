import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

interface ErrorContextType {
  error: null | Error;
  handleError: (error: any) => void;
  clearError: () => void;
}

interface ErrorProviderProps {
  children: ReactNode; // Define the children prop
}

const ErrorContext = createContext<ErrorContextType | null>(null);

const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<null | Error>(null);

  const handleError = (error: any) => {
    setError(error);
    console.log(error);
    alert(`Code Error: ${error}`);
  };

  const clearError = () => setError(null);

  const contextValue: ErrorContextType = {
    error,
    handleError,
    clearError,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
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
