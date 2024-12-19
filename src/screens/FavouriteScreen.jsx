// import React, { useState } from 'react';
// import { StyleSheet } from 'react-native';
// import CustomView from '../components/customComponents/CustomView';
// import ViewScreens from '../components/views/ViewScreens';
// import data from '../../assets/all_data.json'
// import CustomSearchField from '../components/customComponents/CustomSearchField';

// const FavouriteScreen = () => {

//     const handlePressItem = (item) => {
//         console.log('Item pressed:', item);
//     };

//     return (
//         <CustomView right={<CustomSearchField />} >

//             <ViewScreens
//                 data={''}
//                 onPressItem={handlePressItem}
//                 isFavoriteScreen={true}
//                 favourite = {true}
//             // onFavoriteChange={handleFavoriteChange}
//             />
//         </CustomView>
//     );
// };


// export default FavouriteScreen;

// const styles = StyleSheet.create({});

import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomSearchField from '../components/customComponents/CustomSearchField';
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';

const FavouriteScreen = ({ allData }) => {
    const [favoriteData, setFavoriteData] = useState([]);

    useEffect(() => {
        const loadFavoriteData = async () => {
            try {
                // Get stored favorite IDs
                const storedFavorites = await AsyncStorage.getItem('favorites');
                if (storedFavorites) {
                    const favoriteIds = JSON.parse(storedFavorites);

                    // Safely filter the data if `allData` is valid
                    if (Array.isArray(allData)) {
                        const filteredData = allData.filter(item =>
                            favoriteIds.includes(item.page_id)
                        );
                        setFavoriteData(filteredData);
                    }
                }
            } catch (error) {
                console.error('Error loading favorite data:', error);
            }
        };

        loadFavoriteData();
    }, [allData]);
    console.log('allData', allData);
    

    const handlePressItem = (item) => {
        console.log('Item pressed:', item);
        // Add navigation logic if needed
    };

    return (
        <CustomView right={<CustomSearchField />}>
            <ViewScreens
                data={favoriteData}
                onPressItem={handlePressItem}
                isFavoriteScreen={true}
                favourite={true}
            />
        </CustomView>
    );
};

export default FavouriteScreen;

const styles = StyleSheet.create({});
