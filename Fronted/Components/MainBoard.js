
import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from 'react'
import { useFoodDataContext } from "../Context/FoodDataContext";
import { UserProfile } from "../Context/UserProfileContext";


const MainBoard = ({onData}) => {
  const {userId} = useContext(UserProfile)
  let URL = `http://10.0.2.2:8000/dashboard/${userId}`


  const [fooddata, setFoodData] = useState({});
  const { setUpdatedFoodData } = useFoodDataContext();


// GET Data from Dashboard
  const fetchUpdatedData = () => {
  fetch(URL)
    .then((res) => {
      if (!res) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((data) => {
      setFoodData(data);
      setUpdatedFoodData(data);
      // console.log(data); // Updated food data
    })
    .catch((err) => {
      console.error('Error fetching data:', err);
    });
};

  useEffect(() => {
    fetchUpdatedData(); 
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