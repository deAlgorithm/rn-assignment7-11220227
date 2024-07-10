import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import { Text, View,TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <View style={{ flex: 1, paddingTop: 50, paddingLeft: 20 }}>
      <TouchableOpacity
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
        style={{ marginBottom: 30 }}
      >
        <Text style={{ fontSize: 20 }}>✕</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Otabil Ishaque</Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#000', width: '30%', marginBottom: 30 }} />
      <Text onPress={() => props.navigation.navigate('Store')} style={{ marginBottom: 20 }}>Store</Text>
      <Text onPress={() => props.navigation.navigate('Locations')} style={{ marginBottom: 20 }}>Locations</Text>
      <Text onPress={() => props.navigation.navigate('Blog')} style={{ marginBottom: 20 }}>Blog</Text>
      <Text onPress={() => props.navigation.navigate('Jewelry')} style={{ marginBottom: 20 }}>Jewelry</Text>
      <Text onPress={() => props.navigation.navigate('Electronic')} style={{ marginBottom: 20 }}>Electronic</Text>
      <Text onPress={() => props.navigation.navigate('Clothing')} style={{ marginBottom: 20 }}>Clothing</Text>
    </View>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} 
      screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="stacknavigation" component={StackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
