import React from 'react';
import CustomProvider from './CustomProvider';

function withCustomProvider<T>(Component: React.ComponentType<T>) {
	const displayName = Component.displayName || Component.name || 'Component';

	const componentWithCustomProvider = (props: T) => {
		return (
			<CustomProvider>
				<Component {...props} />
			</CustomProvider>
		);
	};

	componentWithCustomProvider.displayName = displayName;

	return componentWithCustomProvider;
}

export default withCustomProvider;
