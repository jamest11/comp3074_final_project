import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import AboutScreen from './components/screens/AboutScreen';
import ListScreen from './components/screens/ListScreen';
import RestaurantScreen from './components/screens/RestaurantScreen';
import StorageContextProvider from './components/StorageContextProvider';
import AddButton from './components/common/AddButton';
import FormScreen from './components/screens/FormScreen';
import MapScreen from './components/screens/MapScreen';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0097A7'
        },
        headerTintColor: 'white'
      }}
    >
      <Drawer.Screen
        name="Home"
        component={ListScreen}
        options={{
          headerRight: () => <AddButton />,
          drawerLabel: 'Restaurants',
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
/>
    </Drawer.Navigator>
  );
};

function App() {
  return (
    <StorageContextProvider>
      <PaperProvider theme={DefaultTheme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Drawer"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#0097A7'
              },
              headerTintColor: 'white',
            }}
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
                title: 'View Restaurant'
              }}
            />
            <Stack.Screen
              name="Add"
              component={FormScreen}
              options={{
                title: 'Add Restaurant'
              }}
            />
            <Stack.Screen
              name="Edit"
              component={FormScreen}
              options={{
                title: 'Edit Restaurant'
              }}
            />
            <Stack.Screen
              name="Map"
              component={MapScreen}
              options={{
                title: 'Restaurant Map'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StorageContextProvider>
  );
};

registerRootComponent(App);