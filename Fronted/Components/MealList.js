import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFoodDataContext } from '../Context/FoodDataContext';

const MealList = () => {
  const [mealNames, setMealNames] = useState([]);
  const { updatedfooddata } = useFoodDataContext();

 
    const mealNamesFromContext = updatedfooddata?.meal_names || [];
  
  
  
useEffect(() => {
  setMealNames(mealNamesFromContext);
}, [updatedfooddata]);
  
const renderMealItem = ({ item }) => (
    <TouchableOpacity style={styles.mealItem}>
      <Text style={styles.mealName}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <Text style={styles.text} >Nutritions Collected from</Text>
      <FlatList
        data={mealNames}
        renderItem={renderMealItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true} // Enable horizontal scrolling
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  flatListContent: {
    flexDirection: 'row', // Arrange items horizontally
  },
  mealItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginRight: 10, // Add some spacing between items
    borderRadius: 8,
    borderWidth: 1, // Add border
    borderColor: '#ccc', // Border color
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:20,
    marginTop:7,
    textAlign:"center"
  }
});
export default MealList;
