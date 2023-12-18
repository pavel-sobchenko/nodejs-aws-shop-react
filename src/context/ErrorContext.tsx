import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

interface ErrorContextProps {
  error: Error | null;
  setError: (error: Error | null) => void;
}

interface Props {
  children: ReactNode;
}

const ErrorContext = createContext<ErrorContextProps | null>(null);

const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [error, setError] = useState<null | Error>(null);

  const handleError = (error: Error | null) => {
    setError(error);
    console.log(error);
    alert(`Code Error: ${error}`);
  };

  //   const contextValue: ErrorContextProps = {
  //     error,
  //     setError: handleError
  //   };

  return (
    <ErrorContext.Provider value={{ error, setError: handleError }}>
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
