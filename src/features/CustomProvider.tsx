import React from 'react';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { store, history } from './store';

export type Props = {
	children?: React.ReactNode | React.ReactNode[] | any;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const CustomProvider: React.FC<Props> = ({ children }: Props) => {
	return (
		<Provider store={store}>
			<Router history={history}>{children}</Router>
		</Provider>
	);
};

export default CustomProvider;
