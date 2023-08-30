import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyApp</Text>
      <Text style={styles.subtitle}>Explore and Connect</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("Signup")}
          title='Sign Up'
          style={styles.button}
        />
        <Button
          onPress={() => navigation.navigate("Login")}
          title='Login'
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',

    
  },
  button: {
    width: 50,
   
  },
});

export default Home;
