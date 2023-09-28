import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import LocationService from '../services/LocationService';
import {RootStackParamList} from '../screens';
import Button from './Button';

function WeatherCurrent() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleFetchWeather = useCallback(async () => {
    const position = await LocationService.getCurrentPosition();
    navigation.navigate('Weather', position);
  }, [navigation]);

  return (
    <Button testID="weather-current" label="" onPress={handleFetchWeather} />
  );
}

export default WeatherCurrent;
