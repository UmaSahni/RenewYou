import React, { useState } from 'react';
import { View, Text, TextInput,  Button, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";
const Fitness = ({navigation}) => {
 const [target, setTarget] = useState('');
 
    const URL = `http://10.0.2.2:8000/fitness-data/`
    
    const getFitnessData = async () =>{
      const data = await fetch(URL)
      const res = await data.json()
      console.log(res[target])
      // Pass the data along with navigation
    navigation.navigate("NutritionPlan", { fitnessData: res[target], target });
    }


  // Other necessary logic
    let handleGoalSetting = () =>{
        console.log(target)
       getFitnessData()
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Fitness Goal</Text>
      
      <Picker
        style={styles.input}
        selectedValue={target}
        onValueChange={setTarget}
      >
        <Picker.Item label="Select target" value="" />
        <Picker.Item label="Lose Weight" value="weightloss" />
        <Picker.Item label="Gain Weight" value="weightgain" />
        <Picker.Item label="Gain Height" value="heightgain" />
       
      </Picker>
      <Button title="Set Goal" onPress={handleGoalSetting} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Fitness;
