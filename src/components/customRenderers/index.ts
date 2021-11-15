import { tester as textFieldTester, TextField } from './TextField';
import { tester as dateFieldTester, DateField } from './DateField';
import { tester as checkboxTester, Checkbox } from './Checkbox';

export default [
	{ tester: textFieldTester, renderer: TextField },
	{ tester: dateFieldTester, renderer: DateField },
	{ tester: checkboxTester, renderer: Checkbox },
];
