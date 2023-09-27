import React from 'react';
import {render} from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import {View} from 'react-native';
import WeatherCurrent from '../../components/WeatherCurrent';
import WeatherCoordinates from '../../components/WeatherCoordinates';

jest.mock('../../components/WeatherCoordinates.tsx', () =>
  jest.fn().mockReturnValue(null),
);

jest.mock('../../components/WeatherCurrent.tsx', () =>
  jest.fn().mockReturnValue(null),
);

describe('HomeScreen', () => {
  test('Should render correctly', () => {
    const wrapper = render(<HomeScreen />);
    wrapper.getByTestId('home-screen');
  });

  describe('Title section', () => {
    beforeEach(() => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(1695843156208); // Wed Sep 27 2023 16:32:36 GMT-0300 (Horário Padrão de Brasília)
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('Should contain current date', () => {
      const wrapper = render(<HomeScreen />);
      wrapper.getByText('Sep 27, 2023');
    });

    test('Should contain current day', () => {
      const wrapper = render(<HomeScreen />);
      wrapper.getByText('Wednesday');
    });

    test('Should contain a section to get current weather', () => {
      (WeatherCurrent as jest.Mock).mockReturnValue(
        <View testID="mock-weather-current" />,
      );

      const wrapper = render(<HomeScreen />);
      wrapper.getByTestId('mock-weather-current');
    });

    test('Should contain a divider', () => {
      const wrapper = render(<HomeScreen />);
      wrapper.getByTestId('home-screen-divider');
    });

    test('Should contain a section to get weather at given latitude & longitude', () => {
      (WeatherCoordinates as jest.Mock).mockReturnValue(
        <View testID="mock-weather-coordinates" />,
      );

      const wrapper = render(<HomeScreen />);
      wrapper.getByTestId('mock-weather-coordinates');
    });
  });
});
