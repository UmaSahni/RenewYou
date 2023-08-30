import React, { useState } from 'react';
import { View, Text, TextInput,  Button, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";
const Fitness = () => {
  const [goalType, setGoalType] = useState('');
  const [target, setTarget] = useState('');

  // Other necessary logic
    let handleGoalSetting = () =>{
        
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Fitness Goal</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter goal type (e.g., weight loss, muscle gain)"
        value={goalType}
        onChangeText={setGoalType}
      />
      <Picker
        style={styles.input}
        selectedValue={target}
        onValueChange={setTarget}
      >
        <Picker.Item label="Select target" value="" />
        <Picker.Item label="Lose Weight" value="lose_weight" />
        <Picker.Item label="Gain Muscle" value="gain_muscle" />
        {/* Add more options as needed */}
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
