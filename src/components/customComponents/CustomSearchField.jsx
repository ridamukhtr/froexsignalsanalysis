// import packages
import React, { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { StyleSheet, TextInput, View } from 'react-native';
// import styles
import { COLORS } from '../../styles/theme-styles';
import globalStyles from '../../styles/global-styles';
// import components
import CustomTouchableOpacity from './CustomTouchableOpacity';
// import hooks
import { useThemeManager } from '../../lib/customHooks/useThemeManager';

const CustomSearchField = ({ onSearch }) => {
	const inputRef = useRef(null);

	const [searchText, setSearchText] = useState('');
	const [isSearchActive, setIsSearchActive] = useState(false);

	const { dropdownColor, textColor } = useThemeManager();

	const fnSearchTextChange = text => {
		setSearchText(text);
		// Add onSearch logic here
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

		<View style={[styles.searchContainer, styles.container, { backgroundColor: dropdownColor }]}>
			<TextInput
				ref={inputRef}
				value={searchText}
				placeholder="Search..."
				placeholderTextColor={textColor}
				onChangeText={fnSearchTextChange}
				onFocus={() => setIsSearchActive(true)}
				style={[styles.searchInput, styles.input, { color: textColor }]}
				onBlur={() => {
					if (!searchText) {
						setIsSearchActive(false);
					}
				}}
			/>
			{isSearchActive && (
				<CustomTouchableOpacity style={styles.clearButton} activeOpacity={0.7} onPress={fnClearSearch}>
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
		alignItems: 'center'
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 10,
		paddingHorizontal: 10,
		marginLeft: 10,
		flex: 1
	},
	searchInput: {
		flex: 1,
		fontSize: 16
	}
	// input: { height: 30, lineHeight: 30 },
	// clearButton: { padding: 5 }
});
