import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { UserProfile } from '../Context/UserProfileContext';

const Profile = () => {
   const [userData, setUserData] = useState(null);
   const [avatarSource, setAvatarSource] = useState(null);
   const {userId} = useContext(UserProfile)
    
   const URL = `http://10.0.2.2:8000/get-user-data/${userId}/`
   
   
   
   console.log(userId)

  useEffect(() => {
    // Replace 'USER_ID' with the actual user ID you want to retrieve
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        // Determine the avatar source based on user's sex
        if (data.sex === 'M') {
          setAvatarSource(require('../assets/male.png'));
        } else if (data.sex === 'F') {
          setAvatarSource(require('../assets/female.png'));
        } else {
          setAvatarSource(require('../assets/avatar.png'));
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userData ? (
        <>
          <View style={styles.profileHeader}>
            <Image source={avatarSource} style={styles.avatar} />
            <Text style={styles.userName}>{userData.name}</Text>
          </View>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{userData.email}</Text>

          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.text}>{userData.weight} kg</Text>

          <Text style={styles.label}>Height:</Text>
          <Text style={styles.text}>{userData.height} cm</Text>

          <Text style={styles.label}>Age:</Text>
          <Text style={styles.text}>{userData.age} years</Text>

          <Text style={styles.label}>Sex:</Text>
          <Text style={styles.text}>{userData.sex}</Text>

          <Text style={styles.label}>Active:</Text>
          <Text style={styles.text}>
            {userData.is_active ? 'Yes' : 'No'}
          </Text>

          <Text style={styles.label}>Staff:</Text>
          <Text style={styles.text}>
            {userData.is_staff ? 'Yes' : 'No'}
          </Text>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading user data...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F0F0F0',
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
});

export default Profile;
