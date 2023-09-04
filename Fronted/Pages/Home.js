import LottieView from "lottie-react-native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const MyComponent = ({ navigation }) => {
  return (
    <View style={styles.centeredImageContainer}>
      <Image source={require("../assets/renew-logo-r.png")} />
      <View style={styles.container}>
        <View style={styles.box}>
          <Image
            source={{
              uri:
                "https://t4.ftcdn.net/jpg/02/28/16/55/240_F_228165555_xvmpvr3qg9VAaOlbWFGe4CIrUWd1twah.jpg",
            }}
            style={styles.logo}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={styles.button}
          >
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <Image
            source={{
              uri:
                "https://t4.ftcdn.net/jpg/02/28/16/03/240_F_228160380_9ALhlByxvBHGfXxO6UJwuKP4tA7ml1sk.jpg",
            }}
            style={styles.logo}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.button}
          >
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  centeredImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20, // Adjust the left margin as needed
    marginRight: 20, // Adjust the right margin as needed
  },

  box: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ECECEC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
    margin: 8,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "transparent",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007BFF", // You can change the border color as needed
  },
});

export default MyComponent;
