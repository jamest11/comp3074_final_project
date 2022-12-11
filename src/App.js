import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import AboutScreen from './components/screens/AboutScreen';
import ListScreen from './components/screens/ListScreen';
import RestaurantScreen from './components/screens/RestaurantScreen';
import StorageContextProvider from './components/StorageContextProvider';
import AddButton from './components/common/AddButton';
import FormScreen from './components/screens/FormScreen';
import MapScreen from './components/screens/MapScreen';
import SearchScreen from './components/screens/SearchScreen';
import { appTheme } from './styles';

// LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNav = () => {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary
        },
        headerTintColor: 'white',
        drawerStyle:{
          backgroundColor: theme.colors.surface
        }
      }}
      drawerContentContainerStyle={{
        backgroundColor: 'black',
        color: 'black'
      }}

    >
      <Drawer.Screen
        name="Home"
        component={ListScreen}
        options={{
          headerRight: () => <AddButton />,
          drawerLabel: 'Restaurants',
          drawerIcon: ({size, color}) => <MaterialIcons name="restaurant" size={size} color={color} />
        }}
      />
      <Drawer.Screen
        name="Search"
        component={SearchScreen}
        options={{
          drawerIcon: ({size, color}) => <MaterialIcons name="search" size={size} color={color} />
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerIcon: ({size, color}) => <MaterialIcons name="info-outline" size={size} color={color} />
        }}
      />
    </Drawer.Navigator>
  );
};

// TODO Splash screen
function App() {
  return (
    <StorageContextProvider>
      <PaperProvider theme={appTheme}>
        <NavigationContainer theme={appTheme}>
          <Stack.Navigator
            initialRouteName="Drawer"
            screenOptions={{
              headerStyle: {
                backgroundColor: appTheme.colors.primary
              },
              headerTintColor: 'white',
              presentation: 'modal'
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
}

registerRootComponent(App);