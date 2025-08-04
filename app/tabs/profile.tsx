import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const router = useRouter();

  const handleLogout = async () => {
  await AsyncStorage.removeItem('isLoggedIn'); // ⬅️ Clear login flag
  router.replace('/'); // ⬅️ Send user back to login (which now redirects through auth-loader)
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/profile.png')}
        style={styles.avatar}
      />
      <Text>Profile: </Text>
      <Text style={styles.username}>Mikhail Modesto</Text>
      <Text style={styles.description}>BSIT GRADUATE</Text>
      <Text>Age: 22</Text>
      <Text>Experience: Prometric Agent</Text>
      <Text>Skills:</Text>
      <Text>Java: 7/10 </Text>
      <Text>C#: 7/10</Text>
      <Text>Flutter/Dart: 4/10</Text>
      <Text>Communication & Showmanship</Text>
      <Text>Problem Solving and Logic</Text>

      <View>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontWeight: '500',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    backgroundColor: '#ca680cff',
    borderColor: '#ac641dff',
    marginTop: 20,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
