import React from 'react';

export interface ComponentMockProps {
	onClick: () => void;
	onChange: () => void;
	'data-testid': string;
	className?: string;
}

export function createMockComponent(
	componentName: string,
	defaultDataTestId: string = '',
): React.FC<ComponentMockProps> {
	const NamedComponentMock: React.FC<ComponentMockProps> = ({
		children,
		'data-testid': dataTestId = defaultDataTestId || componentName,
		onClick,
		onChange,
		className,
		...props
	}) => (
		<div
			data-mock={`Mock${componentName}`}
			data-testid={dataTestId}
			data-props={props}
			onClick={onClick}
			onChange={onChange}
			className={className}
		>
			{children}
		</div>
	);
	const component = jest.fn().mockImplementation(NamedComponentMock);
	// @ts-ignore HACK so that snapshots do not suffer from `mockConstructor` instead of the component name
	component.displayName = componentName;
	return component;
}
