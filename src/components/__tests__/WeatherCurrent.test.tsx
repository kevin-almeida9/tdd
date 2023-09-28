import React from 'react';
import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import WeatherCurrent from '../WeatherCurrent';
import {useNavigation} from '@react-navigation/native';
import LocationService from '../../services/LocationService';

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

  test('Should render label', () => {
    const wrapper = render(<WeatherCurrent />);
    wrapper.getByText('Weather at my position');
  });

  test('Should navigate to weather screen', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({navigate: mockNavigate});

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

  describe('Loader', () => {
    test('Should be rendered when position is begin fetched', async () => {
      let mockResolve!: (position: {
        latitude: number;
        longitude: number;
      }) => void;

      jest.spyOn(LocationService, 'getCurrentPosition').mockReturnValueOnce(
        () =>
          new Promise((resolve) => {
            mockResolve = resolve;
          }),
      );

      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-current');

      fireEvent.press(button);

      await expect(
        wrapper.getByTestId('button-loading'),
      ).resolves.toBeDefined();

      await act(async () => {
        await mockResolve({latitude: 0, longitude: 0});
      });
    });
  });
});
