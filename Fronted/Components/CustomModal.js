import React, { useState } from "react";
import { View, Text, Modal, Button, TextInput, StyleSheet } from "react-native";
import { fetchUpdatedData } from "./MainBoard";

const CustomModal = ({ visible, onClose, onSubmit,  onDataUpdate  }) => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carb, setCarb] = useState("");

  let URL = "http://10.0.2.2:8000/dinner/";

  const handleSubmission = () => {
    // Prepare data object
    const newData = {
      name,
      calories,
      protein,
      fat,
      carb,
    };

    handleSubmitFood(newData)
    // Call the submit function from props
    // onSubmit(newData);
  };

  //   POST request to the backend
  const handleSubmitFood = async (newData) => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (response) {
        // Handle successful response
        console.log("Data submitted successfully");
        

        // Call the onDataUpdate function passed from the parent
         onDataUpdate(newData)
        console.log(newData);
            
        // Close the modal
        onClose();
      } else {
        // Handle error response
        console.log("Error submitting data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text>Add Food Item</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Calories"
          value={calories}
          onChangeText={setCalories}
        />
        <TextInput
          style={styles.input}
          placeholder="Protein"
          value={protein}
          onChangeText={setProtein}
        />
        <TextInput
          style={styles.input}
          placeholder="Fat"
          value={fat}
          onChangeText={setFat}
        />
        <TextInput
          style={styles.input}
          placeholder="Carb"
          value={carb}
          onChangeText={setCarb}
        />

        <View style={styles.buttonContainer}>
          <Button title="Close" onPress={onClose} />
          <Button title="Submit" onPress={handleSubmission} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
});

export default CustomModal;
