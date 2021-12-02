import React from 'react';

import { Meta } from '@storybook/react';
import StaticMetadata from './StaticMetadata';
import { metadataList } from './__stubs__';

export default {
	component: StaticMetadata,
	title: 'StaticMetadata',
} as Meta;

export const Default = () => <StaticMetadata list={metadataList} />;
