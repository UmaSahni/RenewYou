import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import MainBoard from "../Components/MainBoard";
import BreakFastModal from "../Components/BreakFastModal";

const Dashboard = () => {
   const [foodData, setFoodData] = useState(null);
  const handleDataUpdate = (newData) =>{
    setFoodData(newData, "This is new data");
  }
  
  return (
    <View>
      <MainBoard onData = {foodData}  />
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 5, width: '95%', alignSelf: 'center' }} />

       <BreakFastModal onDataUpdate={handleDataUpdate}  />
        
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default Dashboard;
