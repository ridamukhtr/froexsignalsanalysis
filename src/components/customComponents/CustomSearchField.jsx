// import packages
import React, { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { StyleSheet, TextInput, View } from 'react-native';
// import styles
import { COLORS } from '../../styles/theme-styles';
import globalStyles from '../../styles/global-styles';
// import components
import CustomTouchableOpacity from './CustomTouchableOpacity';

const CustomSearchField = ({ onSearch }) => {
	const inputRef = useRef(null);

	const [searchText, setSearchText] = useState('');
	const [isSearchActive, setIsSearchActive] = useState(false);

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
		<View style={[globalStyles.searchContainer, styles.container]}>
			<TextInput
				ref={inputRef}
				value={searchText}
				placeholder="Search..."
				onChangeText={fnSearchTextChange}
				onFocus={() => setIsSearchActive(true)}
				style={[globalStyles.searchInput, styles.input]}
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
	container: { flexDirection: 'row', alignItems: 'center' }
	// input: { height: 30, lineHeight: 30 },
	// clearButton: { padding: 5 }
});
