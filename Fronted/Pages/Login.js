import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { UserProfile } from '../Context/UserProfileContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setuserId, userId } = useContext(UserProfile);

  const handleLogin = async () => {
    const user = {
      email,
      password,
    };

    try {
      const response = await fetch("http://10.0.2.2:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        
        // Assuming the API returns the user ID upon successful login
        setuserId(data.user_id); // Set the user ID in context
        Alert.alert("Login Success", "You have successfully logged in.");
        // Navigate to the desired screen
        // navigation.navigate("Fitness");
      } else {
        const data = await response.json();
        Alert.alert("Login Failed", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Login Failed", "An error occurred during login.");
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default LoginScreen;
