import React, { createContext, useContext, useEffect, useState } from 'react';

const FoodDataContext = createContext();

export const useFoodDataContext = () => useContext(FoodDataContext);

export const FoodDataProvider = ({ children }) => {
  const [updatedfooddata, setUpdatedFoodData] = useState({});

 fetch()


  return (
    <FoodDataContext.Provider value={{ updatedfooddata, setUpdatedFoodData }}>
      {children}
    </FoodDataContext.Provider>
  );
};
