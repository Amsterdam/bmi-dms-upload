import { TextDecoder, TextEncoder } from 'util';

// Ensure TextEncoder/TextDecoder exist before Jest loads the jsdom environment.
if (!global.TextEncoder) global.TextEncoder = TextEncoder;
if (!global.TextDecoder) {
	global.TextDecoder = TextDecoder as (typeof global)['TextDecoder'];
}
