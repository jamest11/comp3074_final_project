import 'react-native-gesture-handler';
import { StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme, Button } from 'react-native-paper';
import AboutScreen from './components/screens/AboutScreen';
import ListScreen from './components/screens/ListScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RestaurantScreen from './components/screens/RestaurantScreen';
import StorageContextProvider from './components/StorageContextProvider';
import AddButton from './components/common/AddButton';
import FormScreen from './components/screens/FormScreen';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={ListScreen}
        options={{
          headerStyle: {
            backgroundColor: '#0097A7',
          },
          headerRight: () => <AddButton />,
          headerTintColor: 'white',
          drawerLabel: 'Restaurants',
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerStyle: {
            backgroundColor: '#0097A7',
          },
          headerTintColor: 'white'
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <StorageContextProvider>
      <PaperProvider theme={DefaultTheme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Drawer"
          >
            <Stack.Screen
              name="Drawer"
              component={DrawerNav}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="View"
              component={RestaurantScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#0097A7',
                },
                headerTintColor: 'white'
              }}
            />
            <Stack.Screen
              name="Add"
              component={FormScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#0097A7',
                },
                headerTintColor: 'white',
                title: 'Add Restaurant'
              }}
            />
            <Stack.Screen
              name="Edit"
              component={FormScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#0097A7',
                },
                headerTintColor: 'white',
                title: 'Edit Restaurant'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StorageContextProvider>
  );
};
