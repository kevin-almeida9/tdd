import React from 'react';
import WeatherScreen from '../WeatherScreen';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import {mockStore, renderWithProvider} from '../../utils/test.utils';
import {
  fetchWeather,
  fetchWeatherFailure,
  fetchWeatherSuccess,
} from '../../store/weather/actions';
import {act} from 'react-test-renderer';
import {nullWeather} from '../../types/Weather';
import {Provider} from 'react-redux';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({goBack: jest.fn()}),
    useRoute: jest.fn().mockReturnValue({params: {latitude: 0, logitude: 0}}),
  };
});

describe('WeatherScreen', () => {
  test('Should render correctly', () => {
    const {getByTestId} = renderWithProvider(<WeatherScreen />);
    getByTestId('weather-screen');
  });

  test('Should return to home when button home is pressed', async () => {
    const mockGoBack = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({goBack: mockGoBack});

    const {getByText} = renderWithProvider(<WeatherScreen />);
    const button = getByText('Home');

    fireEvent.press(button);

    expect(mockGoBack).toHaveBeenCalled();
  });

  test('Should fetch weather', async () => {
    const interceptor = jest.fn();
    const store = mockStore(interceptor);

    render(
      <Provider store={store}>
        <WeatherScreen />
      </Provider>,
      {store},
    );

    await waitFor(() => {
      expect(interceptor).toHaveBeenCalledWith(fetchWeather(0, 0));
    });
  });

  test('Should display loader when fetching weather', () => {
    const {getByTestId} = renderWithProvider(<WeatherScreen />);
    getByTestId('weather-screen-loader');
  });

  test('Should display given error', () => {
    const {store, getByText} = renderWithProvider(<WeatherScreen />);

    act(() => {
      store.dispatch(fetchWeatherFailure('mock-error'));
    });

    getByText('mock-error');
  });

  test('Should display image with given weather icon', () => {
    const {store, getByTestId} = renderWithProvider(<WeatherScreen />);

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, icon: 'mock-icon'}));
    });

    const image = getByTestId('weather-screen-icon');
    expect(image).toHaveProp('source', {uri: 'mock-icon'});
  });

  test('Should not display icon when weather has no icon', () => {
    const {store, getByTestId} = renderWithProvider(<WeatherScreen />);

    act(() => {
      store.dispatch(fetchWeatherSuccess(nullWeather));
    });

    expect(() => getByTestId('weather-screen-icon')).toThrow();
  });

  test('Should display description weather has no description', () => {
    const {store, getByText} = renderWithProvider(<WeatherScreen />);

    act(() => {
      store.dispatch(
        fetchWeatherSuccess({...nullWeather, description: 'mock-description'}),
      );
    });

    getByText('mock-description');
  });

  test('Should not display description when  givrn weather has not description', () => {
    const {store, getByTestId} = renderWithProvider(<WeatherScreen />);

    act(() => {
      store.dispatch(fetchWeatherSuccess(nullWeather));
    });

    expect(() => getByTestId('weather-screen-description')).toThrow();
  });

  test('Should display city name from given weather', () => {
    const {store, getByText} = renderWithProvider(<WeatherScreen />);

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, city: 'mock-city'}));
    });

    getByText('mock-city');
  });

  test('Should display formated temperature', () => {
    const {store, getByTestId, getByText} = renderWithProvider(
      <WeatherScreen />,
    );

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, temperature: 10.8}));
    });

    const container = getByTestId('weather-screen-temperature');
    const title = getByText('Temperature');
    const temperature = getByText('11°C');

    expect(container).toContainElement(title);
    expect(container).toContainElement(temperature);
  });

  test('Should display formated wind', () => {
    const {store, getByTestId, getByText} = renderWithProvider(
      <WeatherScreen />,
    );

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, windSpeed: 1}));
    });

    const container = getByTestId('weather-screen-wind');
    const title = getByText('Wind Speed');
    const windSpeed = getByText('1m/s');

    expect(container).toContainElement(title);
    expect(container).toContainElement(windSpeed);
  });

  test('Should display formated humidity', () => {
    const {store, getByTestId, getByText} = renderWithProvider(
      <WeatherScreen />,
    );

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, humidity: 15}));
    });

    const container = getByTestId('weather-screen-humidity');
    const title = getByText('Humidity');
    const humidity = getByText('15%');

    expect(container).toContainElement(title);
    expect(container).toContainElement(humidity);
  });

  test('Should display formated pressure', () => {
    const {store, getByTestId, getByText} = renderWithProvider(
      <WeatherScreen />,
    );

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, pressure: 1000}));
    });

    const container = getByTestId('weather-screen-pressure');
    const title = getByText('Pressure');
    const pressure = getByText('1000 hPa');

    expect(container).toContainElement(title);
    expect(container).toContainElement(pressure);
  });
});
