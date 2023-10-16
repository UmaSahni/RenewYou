import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import BreakFastModal from "../Components/BreakFastModal";
import WaterIntake from "../Components/WaterIntake";
import { UserProfile } from "../Context/UserProfileContext";

const AddFood = ({ navigation }) => {
  const { userId } = useContext(UserProfile);
  let URL = `http://10.0.2.2:8000/dashboard/${userId}`;
  const [foodData, setFoodData] = useState(null);
  const [data, setData] = useState([]);
  const handleDataUpdate = (newData) => {
    setFoodData(newData, "This is new data");
  };

  const handlepress = () => {
    navigation.navigate("Dashboard");
  };

  const fetchDataFromDashboard = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };
  useEffect(() => {
    fetchDataFromDashboard();
  }, []);
  return (
    <View>
      <WaterIntake />
      <View style={styles.buttonContainer}>
        <Text style={styles.Title}>Add food</Text>
        <BreakFastModal meal_type="breakfast" onDataUpdate={handleDataUpdate} />
        <BreakFastModal meal_type="lunch" onDataUpdate={handleDataUpdate} />
        <BreakFastModal meal_type="dinner" onDataUpdate={handleDataUpdate} />
      </View>
     <View  >
      {data.meal_names ? (
        <Button title="Dashboard" onPress={handlepress} />
        
      ) : (
        <Text>Add atleast 1 food to move on dashboard</Text>
      )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    // flexDirection: "row",

    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  Title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: 'red', // Change this to your desired text color
    textAlign: 'center',
    marginTop: 20, // Add spacing from the button
  },
});

export default AddFood;
