import { createContext, useContext, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import storageApi from '../services/storageApi';

const StorageContext = createContext(null);

const StorageContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);

  const emptyRestaurant = {
    id: null,
    name: '',
    phoneNumber: '',
    description: '',
    address: '',
    tags: '',
    rating: 0
  };

  const getRestaurants = () => {
    storageApi.getRestaurants()
      .then(data => {
        if(data != null) {
          setRestaurants(JSON.parse(data));
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const findRestaurant = (id) => {
    return restaurants.find((r) => r.id === id);
  };

  const addRestaurant = (data) => {
    data.id = uuid.v4();
    storageApi.addRestaurant(data)
      .then(getRestaurants)
      .catch(console.error);
  };

  const updateRestaurant = (data) => {
    storageApi.updateRestaurant(data)
      .then(getRestaurants)
      .catch(console.error);
  };

  const value = {
    restaurants,
    addRestaurant,
    updateRestaurant,
    emptyRestaurant,
    findRestaurant
  };

  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  );
};

const useStorage = () => {
  return useContext(StorageContext);
};

export default StorageContextProvider;
export { useStorage };