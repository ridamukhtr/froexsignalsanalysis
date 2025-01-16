// import packages
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Check from 'react-native-vector-icons/Entypo';
import DotsVerticalIcon from 'react-native-vector-icons/Entypo';
// import components
import CustomTouchableOpacity from './CustomTouchableOpacity';
import CustomText from './CustomText';
// import styles
import { COLORS } from '../../styles/theme-styles';
// import hooks
import { useThemeManager } from '../../lib/customHooks/useThemeManager';

const CustomDropdown = ({ item, onPress }) => {

	const [modalVisible, setModalVisible] = useState(false);
	const [selectedItemIndex, setSelectedItemIndex] = useState(null);

	const toggleModal = () => {
		setModalVisible(!modalVisible);
	};

	return (
		<View style={styles.container}>
			<CustomTouchableOpacity style={styles.menuButton} onPress={toggleModal}>
				<DotsVerticalIcon />
			</CustomTouchableOpacity>

			<Modal
				visible={modalVisible}
				transparent={true}
				animationType="fade"
				onBackdropPress={toggleModal}
				onBackButtonPress={toggleModal}
			>
				<CustomTouchableOpacity activeOpacity={1} style={styles.modalOverlay} >
					<View style={styles.dropdown}>
						{item?.map((item, index) => (
							<CustomTouchableOpacity key={index} style={[styles.menuItemContainer, { backgroundColor: selectedItemIndex == index ? COLORS.DIM : COLORS.WHITE }]} onPress={onPress} >
								<DZText style={styles.menuItemText}>{item?.label}</DZText>
							</CustomTouchableOpacity>
						))}
					</View>
				</CustomTouchableOpacity>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		position: 'absolute',
		top: '10%',
		alignSelf: 'flex-end',
		alignItems: 'flex-end',
	},
	dropdown: {
		width: 200,
		backgroundColor: COLORS.WHITE,
		borderRadius: 20,
		padding: 10,
		gap: 5,
		borderColor: COLORS.DIM,
		borderWidth: 1,
		elevation: 5,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	menuItemContainer: {
		paddingVertical: 10,
		borderRadius: 15,
		padding: 15,
	},
	menuItemText: {
		fontSize: 16,
		color: COLORS.GREY_TEXT,
	},
});

export default CustomDropdown;
