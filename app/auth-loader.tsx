import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function AuthLoader() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
          router.replace('/tabs/dashboard'); // ✅ Go to dashboard
        } else {
          router.replace('/login'); // ✅ Go to login
        }
      } catch (error) {
        console.error('Failed to check login:', error);
        router.replace('/');
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#cf6b31ff" />
    </View>
  );
}
