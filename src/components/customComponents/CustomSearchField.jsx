import { StyleSheet, TextInput, View } from 'react-native';
import React, { useRef, useState } from 'react';
import globalStyles from '../../styles/global-styles';
import { COLORS } from '../../styles/theme-styles';
import CustomTouchableOpacity from './CustomTouchableOpacity';
import Icon from 'react-native-vector-icons/Entypo';

const CustomSearchField = ({ onSearch }) => {
	const [isSearchActive, setIsSearchActive] = useState(false);
	const [searchText, setSearchText] = useState('');
	const inputRef = useRef(null);

	const fnSearchTextChange = text => {
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
	input: {
		height: 30,
		lineHeight: 30
	},
	clearButton: {
		padding: 5
	}
});
