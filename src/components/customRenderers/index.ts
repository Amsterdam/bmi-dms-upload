import { tester as textFieldTester, TextField } from './TextField';
import { tester as dateFieldTester, DateField } from './DateField';

export default [
	{ tester: textFieldTester, renderer: TextField },
	{ tester: dateFieldTester, renderer: DateField },
];
