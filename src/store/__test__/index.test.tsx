import {render} from '@testing-library/react-native';
import React from 'react';
import {View} from 'react-native';
import store from '..';

describe('Store', () => {
  test('Should be a valid store', () => {
    const wrapper = render(<View testID="mock-component" />, {store});
    wrapper.getByTestId('mock-component');
  });
});
