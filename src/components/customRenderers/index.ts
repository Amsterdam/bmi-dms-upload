import { tester as textFieldTester, TextField } from './TextField';
import { tester as dateFieldTester, DateField } from './DateField';
import { tester as creatableSelectTester, CreatableSelect } from './CreatableSelect';
import { tester as creatableSelectArrayTester, CreatableSelectArray } from './CreatableSelectArray';
import { tester as multiSelectTester, MultiSelect } from './MultiSelect';
import { tester as checkboxTester, Checkbox } from './Checkbox';

export default [
	{ tester: textFieldTester, renderer: TextField },
	{ tester: dateFieldTester, renderer: DateField },
	{ tester: creatableSelectTester, renderer: CreatableSelect },
	{ tester: creatableSelectArrayTester, renderer: CreatableSelectArray },
	{ tester: multiSelectTester, renderer: MultiSelect },
	{ tester: checkboxTester, renderer: Checkbox },
];
