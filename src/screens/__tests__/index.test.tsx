import React, {useEffect} from 'react';

import HomeScreen from '../HomeScreen';
import WeatherScreen from '../WeatherScreen';
import {View} from 'react-native';
import {render, waitFor} from '@testing-library/react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import AppNavigator, {RootStackParamList} from '..';

jest.mock('../HomeScreen', () => jest.fn());

jest.mock('../WeatherScreen', () => jest.fn());

describe('AppNavigator', () => {
  test('Should render HomeScreen by default', async () => {
    (HomeScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-home-screen" />,
    );

    const wrapper = render(<AppNavigator />);
    await waitFor(() => {
      wrapper.getByTestId('mock-home-screen');
    });
  });

  test('Should render WeatherScreen on "Weather" route', async () => {
    (HomeScreen as jest.Mock)
      .mockImplementationOnce(() => {
        const navigation = useNavigation<NavigationProp<RootStackParamList>>();

        useEffect(() => {
          navigation.navigate('Weather', {latitude: 0, longitude: 0});
        }, [navigation]);

        return null;
      })(WeatherScreen as jest.Mock)
      .mockReturnValueOnce(<View testID="mock-weather-screen" />);

    const wrapper = render(<AppNavigator />);

    await waitFor(() => {
      wrapper.getByTestId('mock-weater-screen');
    });
  });
});
