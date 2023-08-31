import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const NutritionPlan = ({navigation}) => {
  const [data, setData] = useState([]);
  const route = useRoute();
  const fitnessData = route.params?.fitnessData || [];
  const target = route.params?.target || "";

  // Update data state when fitnessData changes
  useEffect(() => {
    setData(fitnessData);
  }, [fitnessData]);

  // Click on START NUTRITION
  const startNutionPLan = () =>{
    navigation.navigate("Dashboard")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutrition Plan</Text>
      <Text style={styles.subtitle}>General Guide for {target}</Text>
      {/* Render the received data */}
      {
        data?.map((el, i) => (
          <View key={i} style={styles.tipContainer}>
            <Text style={styles.tipTitle}>{el.title}</Text>
            <Text style={styles.tipDescription}>{el.description}</Text>
          </View>
        ))
      }
      <Button title="Start Nutrition Plan" onPress={startNutionPLan} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  tipContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 16,
  },
});

export default NutritionPlan;
