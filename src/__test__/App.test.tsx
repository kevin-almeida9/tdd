import React from 'react';
import {View} from 'react-native';
import {render} from '@testing-library/react-native';
import AppNavigator from '../screens';
import App from '../App';

jest.mock('../screens', () => jest.fn());

describe('App', () => {
  test('Should render routes', () => {
    (AppNavigator as jest.Mock).mockReturnValueOnce(
      <View testID="mock-routes" />,
    );

    const wrapper = render(<App />);
    wrapper.getByTestId('mock-routes');
  });
});
