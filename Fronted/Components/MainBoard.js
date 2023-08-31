
import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from 'react'

const MainBoard = ({onData}) => {
  let URL = 'http://10.0.2.2:8000/dashboard/'
  const [fooddata, setFoodData] = useState({});

  const fetchUpdatedData = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setFoodData(data);
        console.log(data); // Updated food data
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUpdatedData(); // Fetch data when the component mounts
  }, [onData]);
  
    return (
    <View>
     <View style={styles.inlineContainer}>
        <View style={styles.inlineItem}>
          <Text style={styles.itemText}>Protien</Text>
          {fooddata && <Text> {fooddata.total_protein} </Text>}
          
        </View>
        <View style={styles.inlineItem}>
          <Text style={styles.itemText}>Carb</Text>
          {fooddata && <Text> {fooddata.total_carb} </Text>}
        </View>
        <View style={styles.inlineItem}>
          <Text style={styles.itemText}>Fat</Text>
          {fooddata && <Text> {fooddata.total_fat} </Text>}
        </View>
      </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
  inlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop:20,
  },
  inlineItem: {
  backgroundColor: '#f0f0f0',
  padding: 10,
  marginHorizontal: 5,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#ccc', // You can adjust the border color as needed
},
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default MainBoard