import AsyncStorage from '@react-native-async-storage/async-storage';

const emptyRestaurant = {
  id: null,
  name: '',
  phoneNumber: '',
  description: '',
  address: '',
  tags: '',
  rating: 0
};

//AsyncStorage.clear();

const getRestaurants = async () => {
  return AsyncStorage.getItem('@restaurants');
};

const addRestaurant = async (data) => {
  const restaurant = { ...emptyRestaurant, ...data };
  let restaurants = await getRestaurants();
  restaurants = JSON.parse(restaurants);

  if(!restaurants) {
    restaurants = [];
  }

  restaurants.push(restaurant);

  return AsyncStorage.setItem('@restaurants', JSON.stringify(restaurants));
};

const updateRestaurant = async (data) => {
  let restaurants = await getRestaurants();
  restaurants = JSON.parse(restaurants);

  for(let i = 0; i < restaurants.length; i++) {
    if(data.id === restaurants[i].id) {
      restaurants[i] = {...restaurants[i], ...data};
    }
  }

  await AsyncStorage.setItem('@restaurants', JSON.stringify(restaurants));
};

const deleteRestaurant = async (id) => {
  let restaurants = await getRestaurants();
  restaurants = JSON.parse(restaurants);

  restaurants = restaurants.filter((r) => r.id !== id);

  await AsyncStorage.setItem('@restaurants', JSON.stringify(restaurants));
};

const exports = { getRestaurants, addRestaurant, updateRestaurant, deleteRestaurant };
export default exports;
