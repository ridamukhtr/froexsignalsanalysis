// import { StyleSheet, Text, TextInput, View } from 'react-native'
// import React, { useCallback, useState } from 'react'
// import globalStyles from '../../styles/global-styles';
// import { COLORS } from '../../styles/theme-styles';
// import CustomTouchableOpacity from './CustomTouchableOpacity';
// import Icon from 'react-native-vector-icons/Entypo'
// import { useFocusEffect } from '@react-navigation/native';


// const CustomSearchField = () => {
//     const [isSearchActive, setIsSearchActive] = useState(false);
//     const [searchText, setSearchText] = useState('');

//     const fnSearchTextChange = (text) => {
//         setSearchText(text);
//         if (onSearch) {
//             onSearch(text);
//         }
//     };

//     const fnClearSearch = () => {
//         setSearchText('');
//         if (onSearch) {
//             onSearch('');
//         }
//         setIsSearchActive(false);
//     };

//     useFocusEffect(
//         useCallback(() => {
//             setIsSearchActive(false);
//             setSearchText('');
//         }, [])
//     );
//     return (
//         <View style={globalStyles.searchContainer}>
//             <TextInput
//                 style={globalStyles.searchInput}
//                 placeholder="Search..."
//                 value={searchText}
//                 onChangeText={fnSearchTextChange}
//                 autoFocus
//             />
//             <CustomTouchableOpacity style={{ padding: 5, }} activeOpacity={0.7} onPress={fnClearSearch}>
//                 <Icon name={"cross"} size={20} color={COLORS.WHITE} style={styles.searchIconInside} />
//             </CustomTouchableOpacity>
//         </View>
//     )
// }

// export default CustomSearchField

// const styles = StyleSheet.create({})

import { StyleSheet, TextInput, View } from 'react-native';
import React, { useRef, useState } from 'react';
import globalStyles from '../../styles/global-styles';
import { COLORS } from '../../styles/theme-styles';
import CustomTouchableOpacity from './CustomTouchableOpacity';
import Icon from 'react-native-vector-icons/Entypo';

const CustomSearchField = ({onSearch}) => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchText, setSearchText] = useState('');
    const inputRef = useRef(null);

    const fnSearchTextChange = (text) => {
        setSearchText(text);
        // Add onSearch logic here if needed
    };

    const fnClearSearch = () => {
        setSearchText('');
        setIsSearchActive(false); 
        inputRef.current.blur(); 
        if (onSearch) {
            onSearch(''); 
        }
    };

    return (
        <View style={[globalStyles.searchContainer, styles.container]}>
            <TextInput
                ref={inputRef}
                style={[globalStyles.searchInput, styles.input]}
                placeholder="Search..."
                value={searchText}
                onChangeText={fnSearchTextChange}
                onFocus={() => setIsSearchActive(true)}
                onBlur={() => {
                    if (!searchText) {
                        setIsSearchActive(false);
                    }
                }}
            />
            {isSearchActive && (
                <CustomTouchableOpacity
                    style={styles.clearButton}
                    activeOpacity={0.7}
                    onPress={fnClearSearch}
                >
                    <Icon name="cross" size={20} color={COLORS.WHITE} />
                </CustomTouchableOpacity>
            )}
        </View>
    );
};

export default CustomSearchField;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
    },
    clearButton: {
        padding: 5,
    },
});
