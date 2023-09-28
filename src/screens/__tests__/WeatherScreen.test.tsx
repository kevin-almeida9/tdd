import React from 'react';
import WeatherScreen from '../WeatherScreen';
import {render} from '@testing-library/react-native';

describe('WeatherScreen', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeatherScreen />);
    wrapper.getByTestId('weather-screen');
  });
});
