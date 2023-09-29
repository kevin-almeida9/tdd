import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {RootStackParamList} from '../screens';
import Button from './Button';
import {Colors} from '../screens/constants';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

type FormValues = {
  latitude: string;
  longitude: string;
};

const defaultValues: FormValues = {
  latitude: '',
  longitude: '',
};

const validationSchema = Yup.object({
  latitude: Yup.number().min(-90).max(90),
  longitude: Yup.number().min(-180).max(180).required().defined(),
});

function WeatherCoordinates() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const form = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onChange',
  });

  const handleSubmit = form.handleSubmit(
    (values: {latitude: number; longitude: number}) => {
      navigation.navigate('Weather', values);
    },
  );

  return (
    <View testID="weather-coordinates">
      <View style={styles.inputs}>
        <Controller
          control={form.control}
          name="latitude"
          render={({field}: {field: any}) => (
            <TextInput
              {...field}
              testID="weather-coordinates-latitude"
              onChangeText={field.onChange}
              style={styles.input}
              placeholder="Lat."
              placeholderTextColor={Colors.GRAY}
            />
          )}
        />
        {form.formState.errors?.latitude && (
          <Text style={styles.error}>Latitude most be a valid number</Text>
        )}
        <Controller
          name="longitude"
          control={form.control}
          render={({field}: {field: any}) => (
            <TextInput
              {...field}
              testID="weather-coordinates-longitude"
              onChangeText={field.onChange}
              style={styles.input}
              placeholder="Lon."
              placeholderTextColor={Colors.GRAY}
            />
          )}
        />
        {form.formState.errors?.longitude && (
          <Text style={styles.error}>Longitude most be a valid number</Text>
        )}
      </View>
      <Button
        testID="weather-coordinates-button"
        label="Find"
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputs: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  input: {
    backgroundColor: Colors.TRANSPARENT,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: Colors.WHITE,
  },
  error: {
    marginHorizontal: 5,
    color: Colors.ERROR,
  },
});

export default WeatherCoordinates;
