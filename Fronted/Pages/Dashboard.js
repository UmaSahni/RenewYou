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
        <View style={styles.buttonContainer} >
       <BreakFastModal meal_type="breakfast" onDataUpdate={handleDataUpdate}  />
       <BreakFastModal meal_type="lunch" onDataUpdate={handleDataUpdate}  />
       <BreakFastModal meal_type="dinner" onDataUpdate={handleDataUpdate}  />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
   buttonContainer: {
    // flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
});

export default Dashboard;
