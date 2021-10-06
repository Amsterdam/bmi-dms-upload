import React from 'react';
import { Provider, createStoreHook, createDispatchHook, createSelectorHook } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import * as dmsUploadReducers from './reducers';
import { DEFAULT_STATE } from './reducers';
import { IState } from './store';

const initialState: IState = {
	dmsUpload: DEFAULT_STATE,
};
export const CustomContext = React.createContext<any>(null);

export const useStore = createStoreHook(CustomContext);
export const useDispatch = createDispatchHook(CustomContext);
export const useSelector = createSelectorHook(CustomContext);

const sagaMiddleware = createSagaMiddleware();
const store = composeWithDevTools(applyMiddleware(sagaMiddleware))(createStore)(
	combineReducers({
		dmsUpload: dmsUploadReducers.rootReducer,
	}),
	initialState,
);

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
