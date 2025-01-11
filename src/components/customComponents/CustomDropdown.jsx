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

const CustomDropdown = ({ item, onPress, activeTheme }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const { textColor, bgColor } = useThemeManager();

	const toggleModal = () => {
		setModalVisible(!modalVisible);
	};

	return (
		<View>
			<CustomTouchableOpacity style={styles.menuButton} onPress={toggleModal}>
				<DotsVerticalIcon name={'dots-three-vertical'} size={20} color={textColor} style={{ marginRight: -5 }} />
			</CustomTouchableOpacity>

			<Modal visible={modalVisible} transparent={true} animationType="fade" onBackdropPress={toggleModal} onBackButtonPress={toggleModal}>
				<CustomTouchableOpacity activeOpacity={1} style={styles.modalOverlay}>
					<View style={[styles.dropdown(bgColor)]}>
						{item?.map((themeItem, index) => (
							<CustomTouchableOpacity key={index} style={[styles.menuItemContainer]} onPress={() => onPress(themeItem.label)}>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<CustomText style={styles.menuItemText}>{themeItem?.label}</CustomText>
									{activeTheme === themeItem?.label && <Check name={'check'} size={20} color={COLORS.GREEN} />}
								</View>
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
		alignItems: 'flex-end'
	},
	dropdown: (textColor, bgColor) => ({
		width: 200,
		backgroundColor: COLORS.MED_GRAY,
		borderRadius: 8,
		padding: 10,
		gap: 5,
		borderColor: COLORS.DIM_GRAY,
		borderWidth: 1,
		elevation: 5,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		shadowRadius: 2
	}),
	menuItemContainer: {
		paddingVertical: 10,
		borderRadius: 15,
		padding: 15
	},
	menuItemText: {
		fontSize: 16,
		color: COLORS.NAV_BLUE
	}
});

export default CustomDropdown;
