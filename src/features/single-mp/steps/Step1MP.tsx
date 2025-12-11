import React from 'react';

type Step1MPProps<T> = {
	label: string;
	someThing?: T;
}
const Step1MP = <T, >(props: Step1MPProps<T>) => {
	return (
		<React.Fragment>
			<div>Hello world! {props.label}</div>
		</React.Fragment>
	)
};

export { Step1MP, Step1MPProps };
