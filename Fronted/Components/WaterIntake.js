import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

function WaterIntake() {
  const [waterGlasses, setWaterGlasses] = useState(0);
  let URL = "http://10.0.2.2:8000/update-water-intake/";
  // Function to handle the button click and update water intake
  const handleAddWater = () => {
    let obj = {
      user: 19,
      amount_ml: 100,
    };

    fetch(URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify(obj),
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // Update the state to add another water glass
    setWaterGlasses(waterGlasses + 1);
  };

  return (
    <View style={styles.container}>
      {/* Display the current number of water glasses */}
      <Text>Water Intake: {waterGlasses} glasses</Text>

      {/* Render the water glass images in a scrollable view */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.waterGlassesContainer}
      >
        {Array.from({ length: waterGlasses }).map((_, index) => (
          <Image
            key={index}
            source={require("../assets/water.png")} // Provide the path to your water glass image
            style={styles.waterGlass}
          />
        ))}
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
