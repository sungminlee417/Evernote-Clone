import { createContext, useState } from "react";

export const TagContext = createContext();

export const TagProvider = (props) => {
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <TagContext.Provider
      value={{ selectedTags: selectedTags, setSelectedTags: setSelectedTags }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
