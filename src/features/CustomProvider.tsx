import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

export type Props = {
	children?: React.ReactNode | React.ReactNode[] | any;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

function CustomProvider({ children }: Props) {
	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
}

export default CustomProvider;
