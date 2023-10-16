import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { UserProfile } from "../Context/UserProfileContext";

function WaterIntake() {
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [totalML, setTotalML] = useState(0);
  const [glass, setGlass] = useState(1);
  const [loading, setLoading] = useState(false);

  const { userId } = useContext(UserProfile);
  let URL = "http://10.0.2.2:8000/update-water-intake/";
  let GETURL = `http://10.0.2.2:8000/getwater/?user=${userId}`;

  const getWater = () => {
    fetch(GETURL)
      .then((res) => res.json())
      .then((data) => {
        setTotalML(data.total_water_ml);
        setGlass(data.glasses);
        setWaterGlasses(data.glasses);
      });
  };

  useEffect(() => {
    getWater();
  }, []);

  const handleAddWater = () => {
    setLoading(true);

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
      .then((res) =>{ 
       
        res.json()})
      .then((res) => {
        console.log(res)
        getWater();
        setWaterGlasses(waterGlasses + 1);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderWaterGlasses = () => {
    return Array.from({ length: glass }).map((_, index) => (
      <Image
        key={index}
        source={require("../assets/water.png")}
        style={styles.waterGlass}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Text>Water Intake: {glass} glasses</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.waterGlassesContainer}
      >
        {renderWaterGlasses()}
      </ScrollView>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <TouchableOpacity onPress={handleAddWater}>
          <Text>+</Text>
        </TouchableOpacity>
      )}
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
    flexWrap: "wrap",
  },
  waterGlass: {
    width: 50,
    height: 100,
    margin: 5,
  },
});

export default WaterIntake;
