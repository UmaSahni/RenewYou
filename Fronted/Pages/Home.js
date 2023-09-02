import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import WaterIntake from '../Components/WaterIntake';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyApp</Text>
      <Text style={styles.subtitle}>Explore and Connect</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.badge} >
        <Image
        source={require("../assets/water-badge.png")}
        style={{ width: 120, height: 120,  }} // Adjust the width and height as needed
      />
       </View>
        <WaterIntake/>
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
        <Button
          onPress={() => navigation.navigate("Fitness")}
          title='Fitness'
          style={styles.button}
        />
        <Button
          onPress={() => navigation.navigate("Dashboard")}
          title='Dashboard'
          style={styles.button}
        />
        <Button
          onPress={() => navigation.navigate("Profile")}
          title='Profile'
          style={styles.button}
        />
        <Button
          onPress={() => navigation.navigate("AddFood")}
          title='AddFood'
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
  badge :{
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
  }
});

export default Home;
