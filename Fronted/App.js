import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './Pages/SignupScreen';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Fitness from './Pages/Fitness';
import NutritionPlan from './Pages/NutritionPlan';
import Dashboard from './Pages/Dashboard';
import { FoodDataProvider } from './Context/FoodDataContext';
import Profile from './Pages/Profile';
import { UserProfileProvider } from './Context/UserProfileContext';
import AddFood from './Pages/AddFood';


export default function App() {
  const Stack = createStackNavigator();
  
  return (
    <UserProfileProvider>
    <FoodDataProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' >
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Fitness" component={Fitness} />
        <Stack.Screen name="NutritionPlan" component={NutritionPlan} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="AddFood" component={AddFood} />
        {/* Other screens can be added here */}
      </Stack.Navigator>
    </NavigationContainer>
    </FoodDataProvider>
    </UserProfileProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
