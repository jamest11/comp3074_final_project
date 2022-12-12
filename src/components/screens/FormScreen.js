import { ToastAndroid, View } from 'react-native';
import { HelperText, TextInput, useTheme } from 'react-native-paper';
import { useEffect, useRef, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GOOGLE_API_KEY } from '@env';
import CheckButton from '../common/CheckButton';
import { useStorage } from '../StorageContextProvider';
import styles from '../../styles';
import DeleteDialog from '../common/DeleteDialog';

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
  const fields = ['name', 'phone', 'description', 'tags', 'address'];
  const id = route.params?.id;

  const {addRestaurant, updateRestaurant, findRestaurant} = useStorage();
  const [formData, setFormData] = useState(createForm(fields));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const address = useRef();
  const theme = useTheme();

  const setFormText = (field, value) => {
    setFormData(data => ({...data, [field]: {...data[field], value}}));
  };

  const setFormError = (field, error, message) => {
    setFormData(data => ({...data, [field]: {...data[field], error, message}}));
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

    const phone = formData.phone.value.replace(/\D/g,'');
    if(phone.length > 0 && phone.length < 10) {
      errors = true;
      setFormError('phone', true, 'Phone number must be at least 10 digits');
    }
    else {
      setFormError('phone', false, '');
    }

    setIsSubmitted(false);

    if(!errors) {
      let data = {
        name: formData.name.value.trim(),
        phone,
        description: formData.description.value,
        tags: formData.tags.value,
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
        <View style={{ flexDirection: 'row' }}>
        {id && (
          <DeleteDialog id={id} />
        )}
        <CheckButton
          onPress={() => setIsSubmitted((prevState) => !prevState)}
        />
        </View>)
    });
  }, [navigation, setIsSubmitted, id]);

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
    <View style={[styles.container,{flex: 1} ]}>
      {formData.name.error && (
        <HelperText type="error" visible={formData.name.error} padding="none">{formData.name.message}</HelperText>
      )}
      {formData.name.error}
      <TextInput
        label="Name"
        onChangeText={text => setFormText('name', text)}
        error={formData.name.error}
        value={formData.name.value}
        style={styles.textInput}
      />

      <GooglePlacesAutocomplete
        onPress={(data, details = null) => {
          setFormText('address', data.description);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
          components: 'country:ca',
        }}
        textInputProps={{
          InputComp: TextInput,
          label: 'Address',
          mode: 'flat',
          right: (<TextInput.Icon icon="map-marker" color={(focus) => focus ? theme.colors.primary : undefined} />)
        }}
        styles={{
          textInput: {
            height: 56,
            backgroundColor: theme.colors.elevation.level1,
            marginBottom: 10
          },
          container: {
            flex: 0,
          }
        }}
        ref={address}
      />

      <KeyboardAwareScrollView>
        {formData.phone.error && (
          <HelperText type="error" visible={formData.phone.error} padding="none">{formData.phone.message}</HelperText>
        )}
        <TextInput
          label="Phone"
          onChangeText={text => setFormText('phone', text)}
          value={formData.phone.value}
          error={formData.phone.error}
          style={styles.textInput}
          keyboardType="number-pad"
        />

        <TextInput
          label="Description"
          onChangeText={text => setFormText('description', text)}
          value={formData.description.value}
          multiline
          numberOfLines={3}
          style={styles.textInput}
        />

        <TextInput
          label="Tags"
          onChangeText={text => setFormText('tags', text)}
          value={formData.tags.value}
          error={formData.tags.error}
          style={[styles.textInput, {marginBottom: 0}]}
        />
        <HelperText padding="none">Separate tags with a comma</HelperText>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default FormScreen;