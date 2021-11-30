import React from 'react';
import { DescriptionList } from '@amsterdam/bmi-component-library';
import { DescriptionListStyle } from './StaticMetadataStyles';

export type Props = {
	list: DescriptionList;
};

const StaticMetadata: React.FC<Props> = ({ list }) => <DescriptionListStyle list={list} />;

export default StaticMetadata;
