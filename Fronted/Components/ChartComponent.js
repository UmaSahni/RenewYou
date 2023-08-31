import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useFoodDataContext } from '../Context/FoodDataContext';


const ChartComponent = () => {
  const { updatedfooddata } = useFoodDataContext();

    const mealNames = updatedfooddata?.meal_names || ['any'];
    const singleProteinValue = updatedfooddata?.total_protein || 0;
    const singleCarbValue = updatedfooddata?.total_carb || 0;
    const singleFatValue = updatedfooddata?.total_fat || 0;

    const proteinValues = Array(mealNames.length).fill(singleProteinValue);
    const carbValues = Array(mealNames.length).fill(singleCarbValue);
    const fatValues = Array(mealNames.length).fill(singleFatValue);
    
  const chartData = {
    labels: mealNames,
    datasets: [
      {
        data: proteinValues,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Blue
      },
      {
        data: carbValues,
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Green
      },
      {
        data: fatValues,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red
      },
    ],
  };

  return (
    <View style={styles.chartContainer}>
      <BarChart
        data={chartData}
        width={300}
        height={200}
        yAxisSuffix="g"
        fromZero={true}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.chart}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
  },
  chart: {
    marginVertical: 10,
  },
});

export default ChartComponent;
