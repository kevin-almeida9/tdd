import React, {ReactNode} from 'react';
import {ReactElement} from 'react';
import {createStore} from 'redux';
import rootReducer from '../store/reducers';
import {RenderOptions, render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {runSaga} from 'redux-saga';

type Action = {
  type?: any;
  payload?: any;
};

const store = createStore(rootReducer);

export async function recordSaga(worker: any, initialAction: Action) {
  const dispatched: Array<Function> = [];

  await runSaga(
    {dispatch: (action: Function) => dispatched.push(action)},
    worker,
    initialAction,
  ).toPromise();

  return dispatched;
}

type CustomRenderOptions = {
  store?: typeof store;
};

const AllTheProviders =
  (options: CustomRenderOptions) =>
  ({children}: {children: ReactNode}) => {
    return <Provider store={options.store || store}>{children}</Provider>;
  };

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions & Omit<RenderOptions, 'queries'> = {},
) => {
  const {store, ...rest} = options;

  return render(ui, {
    wrapper: AllTheProviders({store}) as React.ComponentType,
    ...rest,
  });
};

export * from '@testing-library/react-native';
export {customRender as render};
