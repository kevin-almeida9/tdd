import '@testing-library/jest-native/extend-expect';

jest.mock('expo-router', () => ({
  useSegments: () => ['(auth)', '(tabs)'],
  useRouter: () => ({}),
}));

jest.mock('expo-font');
jest.mock('expo-asset');
