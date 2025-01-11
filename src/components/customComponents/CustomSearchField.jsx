// import packages
import React, { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Cross from 'react-native-vector-icons/Octicons';
import { StyleSheet, TextInput, View } from 'react-native';
// import components
import CustomTouchableOpacity from './CustomTouchableOpacity';
// import hooks
import { useThemeManager } from '../../lib/customHooks/useThemeManager';

const CustomSearchField = ({ onSearch }) => {
	const inputRef = useRef(null);

	const [searchText, setSearchText] = useState('');
	const [isSearchActive, setIsSearchActive] = useState(false);

	const { dropdownColor, textColor, tabColor, iconColor, borderColor, footerColor } = useThemeManager();

	const fnSearchTextChange = text => {
		setSearchText(text);
		if (onSearch) {
			onSearch(text);
		}
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
		<View style={[styles.searchContainer, { backgroundColor: dropdownColor }]}>
			<Icon name="magnify" size={20} color={iconColor} style={styles.searchIcon} />

			<TextInput
				ref={inputRef}
				value={searchText}
				placeholder="Search..."
				placeholderTextColor={textColor}
				onChangeText={fnSearchTextChange}
				onFocus={() => setIsSearchActive(true)}
				style={[styles.searchInput, { color: textColor }]}
				onBlur={() => {
					if (!searchText) {
						setIsSearchActive(false);
					}
				}}
			/>
			{isSearchActive && searchText && (
				<CustomTouchableOpacity style={{ padding: 5 }} activeOpacity={0.7} onPress={fnClearSearch}>
					<Cross name="x-circle-fill" size={20} color={iconColor} />
				</CustomTouchableOpacity>
			)}
		</View>
	);
};

export default CustomSearchField;

const styles = StyleSheet.create({
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 150 / 1,
		paddingHorizontal: 10,
	},
	searchIcon: {
		marginRight: 8,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
	},

});
