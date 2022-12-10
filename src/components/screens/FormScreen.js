import { ToastAndroid, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import styles from '../../styles';
import { useEffect, useRef, useState } from 'react';
import { useStorage } from '../StorageContextProvider';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CheckButton from '../common/CheckButton';

const createForm = (fields) => {
  const formField = {
    value: '',
    error: false,
    message: ''
  };
  const form = {};
  fields.forEach(field => {
    form[field] = formField;
  });

  return form;
};

const FormScreen = ({ navigation, route }) => {
  const fields = ['name', 'phone', 'description', 'address'];
  const id = route.params?.id;

  const {addRestaurant, updateRestaurant, findRestaurant} = useStorage();
  const [formData, setFormData] = useState(createForm(fields));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const address = useRef();


  const apiKey = 'AIzaSyBIykz6gl4NQebgTkxuEmzXlonylu3mEXM';

  const setFormText = (field, value) => {
    setFormData(data => ({...data, [field]: {...data[field], value}}));
  };

  const setFormError = (field, error, message) => {
    setFormData({...formData, [field]: {...formData[field], error, message}});
  };

  const handleSubmit = () => {
    let errors = false;

    if(formData.name.value.trim().length === 0) {
      errors = true;
      setFormError('name', true, 'Name is required');
    }
    else {
      setFormError('name', false, '');
    }
    setIsSubmitted(false);

    if(!errors) {
      let data = {
        name: formData.name.value.trim(),
        phone: formData.phone.value,
        description: formData.description.value,
        address: formData.address.value
      };
      if(id) {
        data = {...data, id};
        updateRestaurant(data);
        navigation.goBack();
        ToastAndroid.showWithGravity('Restaurant updated', ToastAndroid.SHORT, ToastAndroid.TOP);
      }
      else {
        addRestaurant(data);
        navigation.navigate('Home');
        ToastAndroid.showWithGravity('Restaurant added', ToastAndroid.SHORT, ToastAndroid.TOP);
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CheckButton
          onPress={() => setIsSubmitted((prevState) => !prevState)}
        />)
    });
  }, [navigation, setIsSubmitted]);

  useEffect(() => {
    if(isSubmitted) {
      handleSubmit();
    }
  }, [isSubmitted]);

  useEffect(() => {
    if(id) {
      const restaurant = findRestaurant(id);
      fields.forEach(field => {
        if(field === 'address') {
          address.current?.setAddressText(restaurant.address);
        }
        else {
          setFormText(field, restaurant[field]);
        }
      });
    }
  }, [id]);

  return (
    <View style={[styles.container, {flex: 1, width: 'auto'}]}>
      <TextInput
        label="Name"
        onChangeText={text => setFormText('name', text)}
        error={formData.name.error}
        value={formData.name.value}
        activeUnderlineColor="#0097A7"
        style={styles.textInput}
      />
      {formData.name.error && (
        <HelperText type="error" visible={formData.name.error} padding="none">{formData.name.message}</HelperText>
      )}
      
      <TextInput
        label="Phone"
        onChangeText={text => setFormText('phone', text)}
        value={formData.phone.value}
        error={formData.phone.error}
        activeUnderlineColor="#0097A7"
        style={styles.textInput}
      />
      {formData.phone.error && (
        <HelperText type="error" visible={formData.phone.error} padding="none">{formData.phone.message}</HelperText>
      )}

      <TextInput
        label="Description"
        onChangeText={text => setFormText('description', text)}
        value={formData.description.value}
        multiline
        numberOfLines={3}
        activeUnderlineColor="#0097A7"
        style={styles.textInput}
      />

      <GooglePlacesAutocomplete
        onPress={(data, details = null) => {
          setFormText('address', data.description);
        }}
        query={{
          key: apiKey,
          language: 'en',
          components: 'country:ca',
        }}
        textInputProps={{
          InputComp: TextInput,
          label: 'Address',
          mode: 'flat',
          activeUnderlineColor: '#0097A7'
        }}
        styles={{
          textInput: {
            height: 56,
          },
        }}
        ref={address}
      />

    </View>
  );
};

export default FormScreen;