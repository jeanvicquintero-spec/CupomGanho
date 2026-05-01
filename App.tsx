import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import CuponsScreen from './src/screens/CuponsScreen';
import CashbackScreen from './src/screens/CashbackScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import LojaDetailsScreen from './src/screens/LojaDetailsScreen';
import LoginScreen from './src/screens/LoginScreen';

import { COLORS } from './src/styles/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CuponsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="CuponsListar"
        component={CuponsScreen}
        options={{ headerTitle: '🎟️ Cupons Disponíveis' }}
      />
      <Stack.Screen
        name="LojaDetails"
        component={LojaDetailsScreen}
        options={{ headerTitle: 'Detalhes da Loja' }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';
          if (route.name === 'Home') iconName = 'home-outline';
          if (route.name === 'Cupons') iconName = 'ticket-multiple';
          if (route.name === 'Cashback') iconName = 'cash-multiple';
          if (route.name === 'Perfil') iconName = 'account-circle';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: '🏠 Inicio' }}
      />
      <Tab.Screen
        name="Cupons"
        component={CuponsStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cashback"
        component={CashbackScreen}
        options={{ title: '💰 Cashback' }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ title: '👤 Perfil' }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
    }, 1000);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          {isLoggedIn ? (
            <TabNavigator />
          ) : (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
