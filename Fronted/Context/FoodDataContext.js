import React, { createContext, useContext, useState } from 'react';

const FoodDataContext = createContext();

export const useFoodDataContext = () => useContext(FoodDataContext);

export const FoodDataProvider = ({ children }) => {
  const [updatedfooddata, setUpdatedFoodData] = useState({});

  return (
    <FoodDataContext.Provider value={{ updatedfooddata, setUpdatedFoodData }}>
      {children}
    </FoodDataContext.Provider>
  );
};
