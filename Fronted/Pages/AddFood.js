import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import BreakFastModal from '../Components/BreakFastModal'

const AddFood = () => {
  const [foodData, setFoodData] = useState(null);
   const handleDataUpdate = (newData) => {
    setFoodData(newData, "This is new data");
  };
    return (
    <View>
     <View style={styles.buttonContainer}>
        <Text style={styles.Title} >Add food</Text>
        <BreakFastModal meal_type="breakfast" onDataUpdate={handleDataUpdate} />
        <BreakFastModal meal_type="lunch" onDataUpdate={handleDataUpdate} />
        <BreakFastModal meal_type="dinner" onDataUpdate={handleDataUpdate} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
     buttonContainer: {
    // flexDirection: "row",
   
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:"center",
  },
})


export default AddFood