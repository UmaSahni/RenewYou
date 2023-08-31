import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useFoodDataContext } from '../Context/FoodDataContext';

const ChartComponent = () => {
  const { updatedfooddata } = useFoodDataContext();

  const mealNames = updatedfooddata?.meal_names || ['any'];
  const singleProteinValue = updatedfooddata?.total_protein || 0;
  const singleCarbValue = updatedfooddata?.total_carb || 0;
  const singleFatValue = updatedfooddata?.total_fat || 0;

  const chartData = [
    {
      name: 'Protein',
      population: singleProteinValue,
      color: '#007AFF',
    },
    {
      name: 'Carb',
      population: singleCarbValue,
      color: '#28CD41',
    },
    {
      name: 'Fat',
      population: singleFatValue,
      color: '#FF453A',
    },
  ];

  const [selectedSegment, setSelectedSegment] = useState(null);

  const handleSegmentPress = (segmentIndex) => {
    setSelectedSegment(segmentIndex);
  };

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Nutrition Overview</Text>
      <PieChart
        data={chartData}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.chart}
        onDataPointPress={({ index }) => handleSegmentPress(index)}
      />
      <View style={styles.legendContainer}>
        {chartData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.legendItem,
              selectedSegment === index && styles.selectedLegendItem,
            ]}
            onPress={() => handleSegmentPress(index)}
          >
            <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  selectedLegendItem: {
    backgroundColor: '#f0f0f0', // Highlight selected legend item
  },
  legendColorBox: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#555',
  },
});

export default ChartComponent;
