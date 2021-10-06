import React from 'react';
import { Provider, createStoreHook, createDispatchHook, createSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
import { Store } from '~/store/store';
import { rootReducer } from './dataSlice';

const initialState: Store.DMSUpload = {
	file: null,
	metadata: {},
};
export const CustomContext = React.createContext<any>(null);

export const useStore = createStoreHook(CustomContext);
export const useDispatch = createDispatchHook(CustomContext);
export const useSelector = createSelectorHook(CustomContext);
// const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: rootReducer,
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
	preloadedState: initialState,
	// devTools: process.env.NODE_ENV !== 'production', disable on production??
});

type Props = {
	children?: React.ReactNode | React.ReactNode[] | any;
};

const CustomProvider: React.FC<Props> = ({ children }: Props) => {
	return (
		<Provider context={CustomContext} store={store}>
			{children}
		</Provider>
	);
};

export default CustomProvider;
