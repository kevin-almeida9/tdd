import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import WeatherCurrent from '../WeatherCurrent';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn(),
  };
});

describe('WeatherCurrent', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeatherCurrent />);
    wrapper.getByTestId('weather-current');
  });

  test('Should navigate to weather screen', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({navigate: mockNavigate});

    const wrapper = render(<WeatherCurrent />);
    const button = wrapper.getByTestId('weather-current');

    fireEvent.press(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Weather', {
        latitude: 0,
        longitude: 0,
      });
    });
  });
});
