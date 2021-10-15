import React from 'react';
import { Provider, createStoreHook, createDispatchHook, createSelectorHook, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './dataSlice';

export const CustomContext = React.createContext<any>(null);

export const useStore = createStoreHook(CustomContext);
export const useDispatch = createDispatchHook<AppDispatch>(CustomContext);
export const useSelector: TypedUseSelectorHook<RootState> = createSelectorHook(CustomContext);

const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
				// Ignore these action types
				ignoredActions: ['dmsupload/setFile'],
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default CustomProvider;
