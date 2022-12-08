import { ToastAndroid, View } from 'react-native';
import { HelperText, IconButton, Text, TextInput } from 'react-native-paper';
import styles from '../../styles';
import { useEffect, useState } from 'react';
import { useStorage } from '../StorageContextProvider';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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

const FormScreen = ({ navigation, ...props }) => {
  const {addRestaurant} = useStorage();
  const [formData, setFormData] = useState(createForm(['name', 'phone', 'description', 'address']));
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      const data = {
        name: formData.name.value.trim(),
        phone: formData.phone.value,
        description: formData.description.value,
        address: formData.address.value
      };
      addRestaurant(data);
      navigation.navigate('Home');
      ToastAndroid.showWithGravity("Restaurant added", ToastAndroid.SHORT, ToastAndroid.TOP);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="check"
          size={30}
          iconColor="white"
          onPress={() => setIsSubmitted((prev) => !prev)}
        />)
    });
  }, [navigation, setIsSubmitted]);

  useEffect(() => {
    if(isSubmitted) {
      handleSubmit();
    }
  }, [isSubmitted]);

  return (
    <View style={[styles.container, {flex: 1, width: 'auto'}]}>
      <Text>{formData.name.value}</Text>
      <TextInput
        label="Name"
        onChangeText={text => setFormText('name', text)}
        error={formData.name.error}
        activeUnderlineColor="#0097A7"
        style={{
          backgroundColor: 'white',
          marginBottom: 10,
        }}
      />
      {formData.name.error && (
        <HelperText type="error" visible={formData.name.error} padding="none">{formData.name.message}</HelperText>
      )}

      <TextInput
        label="Phone"
        onChangeText={text => setFormText('phone', text)}
        error={formData.phone.error}
        activeUnderlineColor="#0097A7"
        style={{
          backgroundColor: 'white',
          marginBottom: 10,
        }}
      />
      {formData.phone.error && (
        <HelperText type="error" visible={formData.phone.error} padding="none">{formData.phone.message}</HelperText>
      )}

      <TextInput
        label="Description"
        onChangeText={text => setFormText('description', text)}
        multiline
        numberOfLines={3}
        activeUnderlineColor="#0097A7"
        style={{
          backgroundColor: 'white',
          marginBottom: 10,
        }}
      />

      <GooglePlacesAutocomplete
        onPress={(data, details = null) => {
          setFormText('address', data.description);
        }}
        query={{
          key: apiKey,
          language: 'en',
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
      />

    </View>
  );
};

export default FormScreen;