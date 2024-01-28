import { createContext, useState } from 'react';

export const GoalListGroupContext = createContext([]);

export default function GoalListGroupContextProvider({children}) {
  const [currentGroup, setCurrentGroup] = useState(0);

  const changeGroup = (group) => {
    setCurrentGroup(group)
  }

  return (
    <GoalListGroupContext.Provider 
        value={{ currentGroup, changeGroup }}
    >
        {children}
    </GoalListGroupContext.Provider>
  )
}