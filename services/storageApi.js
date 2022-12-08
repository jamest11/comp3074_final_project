import AsyncStorage from '@react-native-async-storage/async-storage';

const emptyRestaurant = {
  id: null,
  name: '',
  phoneNumber: '',
  description: '',
  address: '',
  tags: '',
  rating: 0
}

//AsyncStorage.clear();

const getRestaurants = async () => {
  return AsyncStorage.getItem('@restaurants');
};

const saveRestaurant = async (data) => {
  const restaurant = { ...emptyRestaurant, ...data };
  let restaurants = await getRestaurants();
  restaurants = JSON.parse(restaurants);

  if(!restaurants) {
    restaurants = [];
  }

  restaurants.push(restaurant)

  return AsyncStorage.setItem('@restaurants', JSON.stringify(restaurants));
};

const exports = { getRestaurants, saveRestaurant }
export default exports;
