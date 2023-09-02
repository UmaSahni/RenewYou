import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { UserProfile } from "../Context/UserProfileContext";

function WaterIntake() {
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [totalML, setTotalML] = useState(0);
  const [glass, setGlass] = useState(1);
  
  const {userId} = useContext(UserProfile)
  let URL = "http://10.0.2.2:8000/update-water-intake/";
  let GETURL = `http://10.0.2.2:8000/getwater/?user=${userId}`;

  const getWater = () => {
    fetch(GETURL)
      .then((res) => res.json())
      .then((data) => {
        setTotalML(data.total_water_ml);
        setGlass(data.glasses);
        setWaterGlasses(data.glasses); // Set waterGlasses based on data.glasses
      });
  };

  useEffect(() => {
    getWater();
  }, []);

  // Function to handle the button click and update water intake

  const handleAddWater = () => {
    let obj = {
      user: userId,
      amount_ml: 100,
    };

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        // console.log(res);
        // Update the state to add another water glass
        getWater()
        setWaterGlasses(waterGlasses + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to render water glass images dynamically
  const renderWaterGlasses = () => {
    return Array.from({ length: glass }).map((_, index) => (
      <Image
        key={index}
        source={require("../assets/water.png")} // Provide the path to your water glass image
        style={styles.waterGlass}
      />
    ));
  };

  return (
    <View style={styles.container}>
      {/* Display the current number of water glasses */}
      <Text>Water Intake: {glass} glasses</Text>
      {/* Render the water glass images */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.waterGlassesContainer}
      >
        {renderWaterGlasses()}
      </ScrollView>

      {/* Button to add more water */}
      <TouchableOpacity onPress={handleAddWater}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  waterGlassesContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Allow glasses to wrap to the next line
  },
  waterGlass: {
    width: 50,
    height: 100,
    margin: 5, // Add some margin between water glasses
  },
});

export default WaterIntake;
