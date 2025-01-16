// import packeges
import React from 'react';
// import screens
import ViewScreens from '../components/views/ViewScreens';
// import hook
import useInnerScreens from '../lib/customHooks/useInnerScreens';

const ComoditiesScreen = ({ data, refreshControlProps, activeSort, searchQuery }) => {

	const { handlePressItem, transformAndSortData, filterData } = useInnerScreens();

	const transformedData = data?.commo ? transformAndSortData(data?.commo, activeSort) : [];

	const filteredData = filterData(transformedData, searchQuery);

	return <ViewScreens data={filteredData} onPressItem={handlePressItem} refreshControlProps={refreshControlProps} />;
};

export default ComoditiesScreen;
