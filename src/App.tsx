import React from 'react';
import AppNavigator from './screens';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={{} as any}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
