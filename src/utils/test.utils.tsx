import React, {ReactNode, PropsWithChildren} from 'react';
import {ReactElement} from 'react';
import {
  createStore,
  Middleware,
  applyMiddleware,
  Store,
  EmptyObject,
} from 'redux';
import rootReducer, {StateType} from '../store/reducers';
import {RenderOptions, render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {runSaga} from 'redux-saga';

type Action = {
  type?: any;
  payload?: any;
};

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: Store<EmptyObject & StateType>;
}

const store = createStore(rootReducer);

export function renderWithProvider(
  ui: React.ReactElement,
  {store = mockStore(), ...renderOptions}: ExtendedRenderOptions = {},
) {
  function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}

export function mockStore(interceptor?: jest.Mock) {
  const logger: Middleware<{}, StateType> = () => (next) => (action) => {
    interceptor?.(action);
    return next(action);
  };

  return createStore(rootReducer, undefined, applyMiddleware(logger));
}

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
