import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { muiTheme } from '@amsterdam/bmi-component-library';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';

import theme from '../../../theme';
import BulkButton from '../button/BulkButton';
import { Props } from './types';
import Step1 from '../steps/Step1';
import Step2 from '../steps/Step2';
import Step3 from '../steps/Step3';
import CustomProvider from '../../../features/CustomProvider';

const NoRoute = () => <></>;

export default function Bulk<T>(props: Props<T>) {
	return (
		<MUIThemeProvider theme={muiTheme}>
			<ThemeProvider overrides={theme}>
				<GlobalStyle />
				<CustomProvider>
					<BulkButton />
					<Routes>
						<Route path="/bulk/step1" element={<Step1 {...props} />} />
						<Route path="/bulk/step2" element={<Step2 {...props} />} />
						<Route path="/bulk/step3" element={<Step3 {...props} />} />
						<Route path="*" element={<NoRoute />} />
					</Routes>
				</CustomProvider>
			</ThemeProvider>
		</MUIThemeProvider>
	);
}
