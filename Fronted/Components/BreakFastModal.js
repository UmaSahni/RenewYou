import React, { useState } from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import CustomModal from "./CustomModal";

const BreakFastModal = ({ meal_type, onDataUpdate }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer} >
      <Text>{meal_type}</Text>
      <TouchableOpacity onPress={openModal} style={styles.plusButton}>
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>
      </View>
      <CustomModal
        onDataUpdate={onDataUpdate}
        visible={modalVisible}
        onClose={closeModal}
        endpoint={meal_type}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  plusButton: {
    backgroundColor: '#f0f0f0',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  plusButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
});



export default BreakFastModal;
