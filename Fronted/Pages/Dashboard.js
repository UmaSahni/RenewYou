import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import MainBoard from "../Components/MainBoard";
import BreakFastModal from "../Components/BreakFastModal";
import ChartComponent from "../Components/ChartComponent";
import { useFoodDataContext } from "../Context/FoodDataContext";

const Dashboard = () => {
  const [foodData, setFoodData] = useState(null);
  const { updatedfooddata } = useFoodDataContext();

  console.log(updatedfooddata, "updatedfooddata");

  const handleDataUpdate = (newData) => {
    setFoodData(newData, "This is new data");
  };

  return (
    <View>
      <MainBoard onData={foodData} />
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          marginVertical: 5,
          width: "95%",
          alignSelf: "center",
        }}
      />
      <View style={styles.buttonContainer}>
        <BreakFastModal meal_type="breakfast" onDataUpdate={handleDataUpdate} />
        <BreakFastModal meal_type="lunch" onDataUpdate={handleDataUpdate} />
        <BreakFastModal meal_type="dinner" onDataUpdate={handleDataUpdate} />
      </View>
      <ChartComponent  />
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
