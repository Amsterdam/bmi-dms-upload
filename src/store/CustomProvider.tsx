import React from 'react';
import { Provider, createStoreHook, createDispatchHook, createSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './dataSlice';

export const CustomContext = React.createContext<any>(null);

export const useStore = createStoreHook(CustomContext);
export const useDispatch = createDispatchHook(CustomContext);
export const useSelector = createSelectorHook(CustomContext);

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
				// Ignore these action types
				ignoredActions: ['file/setFile'],
				ignoredPaths: ['file'],
			},
		}),
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
