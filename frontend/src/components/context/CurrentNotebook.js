import { createContext, useState } from "react";

export const CurrentNotebookContext = createContext();

export const CurrentNotebookProvider = (props) => {
  const [currentNotebook, setCurrentNotebook] = useState({});

  return (
    <CurrentNotebookContext.Provider
      value={{
        currentNotebook,
        setCurrentNotebook,
      }}
    >
      {props.children}
    </CurrentNotebookContext.Provider>
  );
};
