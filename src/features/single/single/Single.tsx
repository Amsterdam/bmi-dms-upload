import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { muiTheme } from '@amsterdam/bmi-component-library';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';

import theme from '../../../theme';
import SingleButton from '../button/SingleButton';
import { Props } from './types';
import Step1 from '../steps/Step1';
import Step2 from '../steps/Step2';
import CustomProvider from '../../../features/CustomProvider';

const NoRoute = () => <></>;

export default function Bulk<T>(props: Props<T>) {
	return (
		<MUIThemeProvider theme={muiTheme}>
			<ThemeProvider overrides={theme}>
				<GlobalStyle />
				<CustomProvider>
					<SingleButton />
					<Routes>
						<Route path="/single/step1" element={<Step1 {...props} />} />
						<Route path="/single/step2" element={<Step2 {...props} />} />
						<Route path="*" element={<NoRoute />} />
					</Routes>
				</CustomProvider>
			</ThemeProvider>
		</MUIThemeProvider>
	);
}
