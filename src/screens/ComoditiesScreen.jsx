// import packeges
import React from 'react';
// import screens
import ViewScreens from '../components/views/ViewScreens';
// import hook
import useInnerScreens from '../lib/customHooks/useInnerScreens';

const ComoditiesScreen = ({ data, refreshControlProps, activeSort }) => {

	const { handlePressItem, transformAndSortData } = useInnerScreens();

	const transformedData = data?.commo ? transformAndSortData(data?.commo, activeSort) : [];

	return <ViewScreens data={transformedData} onPressItem={handlePressItem} refreshControlProps={refreshControlProps} />;
};

export default ComoditiesScreen;
