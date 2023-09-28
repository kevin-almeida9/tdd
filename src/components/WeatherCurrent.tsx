import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import LocationService from '../services/LocationService';
import {RootStackParamList} from '../screens';
import Button from './Button';

function WeatherCurrent() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleFetchWeather = useCallback(async () => {
    setLoading(true);
    const position = await LocationService.getCurrentPosition();
    navigation.navigate('Weather', position);
    setLoading(false);
  }, [navigation]);

  return (
    <Button
      testID="weather-current"
      label="Weather at my position"
      onPress={handleFetchWeather}
      loading={loading}
    />
  );
}

export default WeatherCurrent;
