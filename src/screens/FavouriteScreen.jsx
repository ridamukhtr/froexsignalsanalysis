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

import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';
import data from '../../assets/all_data.json';
import CustomSearchField from '../components/customComponents/CustomSearchField';

const FavouriteScreen = () => {
    // State to store the favorite items
    const [favoriteItems, setFavoriteItems] = useState([]);

    // Fetch favorite items when the screen loads
    useEffect(() => {
        const loadFavoriteItems = async () => {
            try {
                // Retrieve favorite IDs from AsyncStorage
                const storedFavorites = await AsyncStorage.getItem('favorites');
                
                if (storedFavorites) {
                    // Parse the stored favorite IDs
                    const favoriteIds = JSON.parse(storedFavorites);
                    console.log('Stored Favorites:', storedFavorites);
                    // Transform the data from the JSON file
                    const transformedData = data ;
                    
                    // Filter items that are in favorites
                    const favItems = transformedData.filter(item => 
                        favoriteIds.includes(item.page_id)
                    );
                    
                    // Set the favorite items state
                    setFavoriteItems(favItems);
                }
            } catch (error) {
                console.error('Error loading favorite items:', error);
            }
        };

        loadFavoriteItems();
    }, []);

    const handlePressItem = (item) => {
        console.log('Item pressed:', item);
        // Add navigation logic if needed
    };

    return (
        <CustomView right={<CustomSearchField />}>
            <ViewScreens
                data={favoriteItems}
                onPressItem={handlePressItem}
                isFavoriteScreen={true}
                favourite={true}
            />
        </CustomView>
    );
};

export default FavouriteScreen;

const styles = StyleSheet.create({});