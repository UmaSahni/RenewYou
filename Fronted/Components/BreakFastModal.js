import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import CustomModal from "./CustomModal";

const BreakFastModal = ({meal_type, onDataUpdate }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.container}>
        <Button title={meal_type} onPress={openModal} />
        <CustomModal
          onDataUpdate={onDataUpdate}
          visible={modalVisible}
          onClose={closeModal}
          endpoint={meal_type}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
});

export default BreakFastModal;
