import React from 'react';
import { BrowserRouter } from 'react-router-dom-v5-compat';
import CustomProvider from './CustomProvider';

export interface WithCustomProviderProps {
	basePath: string;
}

const withCustomProvider = <P extends object>(
	Component: React.ComponentType<P>,
): React.FC<P & WithCustomProviderProps> => {
	const displayName = Component.displayName || Component.name || 'Component';

	const componentWithCustomProvider = ({ basePath, ...props }: WithCustomProviderProps) => {
		return (
			<CustomProvider>
				<BrowserRouter basename={basePath}>
					<Component {...(props as P)} displayName={displayName} />
				</BrowserRouter>
			</CustomProvider>
		);
	};

	componentWithCustomProvider.displayName = `withCustomProvider(${displayName})`;

	return componentWithCustomProvider;
};

export default withCustomProvider;
