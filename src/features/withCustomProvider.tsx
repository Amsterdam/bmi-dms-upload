import React from 'react';
import CustomProvider from './CustomProvider';

export interface WithCustomProviderProps {
	basePath: string;
}

const withCustomProvider = <P extends object>(
	Component: React.ComponentType<P>,
): React.FC<P & WithCustomProviderProps> => {
	const displayName = Component.displayName || Component.name || 'Component';

	const componentWithCustomProvider = (props: WithCustomProviderProps) => {
		return (
			<CustomProvider>
				<Component {...(props as P)} displayName={displayName} />
			</CustomProvider>
		);
	};

	componentWithCustomProvider.displayName = `withCustomProvider(${displayName})`;

	return componentWithCustomProvider;
};

export default withCustomProvider;
