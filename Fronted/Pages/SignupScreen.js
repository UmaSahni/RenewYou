import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");

  const handleSignup = async () => {
    // Implement signup logic here
    const user = {
      email,
      password,
      name,
      weight: parseFloat(weight),
      height: parseFloat(height),
      age: parseInt(age),
      sex,
    };

    try {
      const response = await fetch("http://10.0.2.2:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

       const data = await response.json();
      if (response) {
        console.log("User registered successfully:", data.message);
        // You can navigate to another screen or perform other actions here
      } else {
        console.log("Registration failed:", data.message);
        // Handle error case here
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle error case here
    }
  };

  const handleGET = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder=" Name"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Height"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      {/* Other input fields */}
      <Picker
        style={styles.input}
        selectedValue={sex}
        onValueChange={(itemValue) => setSex(itemValue)}
      >
        <Picker.Item label="Select Sex" value="" />
        <Picker.Item label="Male" value="M" />
        <Picker.Item label="Female" value="F" />
        <Picker.Item label="Other" value="O" />
      </Picker>
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default SignupScreen;
