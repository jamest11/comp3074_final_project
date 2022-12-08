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

const getRestaurant = async () => {
  let restaurants = await getRestaurants();
  restaurants = JSON.parse(restaurants)
}

const addRestaurant = async (data) => {
  const restaurant = { ...emptyRestaurant, ...data };
  let restaurants = await getRestaurants();
  restaurants = JSON.parse(restaurants);

  if(!restaurants) {
    restaurants = [];
  }

  restaurants.push(restaurant)

  return AsyncStorage.setItem('@restaurants', JSON.stringify(restaurants));
};

const updateRestaurant = async (data) => {
  let restaurants = await getRestaurants();
  restaurants = JSON.parse(restaurants);

  for(let i = 0; i < restaurants.length; i++) {
    if(data.id === restaurants[i].id) {
      restaurants[i] = {...restaurants[i], ...data}
    }
  }

  return AsyncStorage.setItem('@restaurants', JSON.stringify(restaurants))
}

const exports = { getRestaurants, addRestaurant, updateRestaurant }
export default exports;
