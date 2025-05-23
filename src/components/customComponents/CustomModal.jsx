// import packages
import { StyleSheet, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
// import components
import CustomTouchableOpacity from './CustomTouchableOpacity';
// import styles
import { COLORS } from '../../styles/theme-styles';
import { useThemeManager } from '../../lib/customHooks/useThemeManager';

const CustomModal = ({ isVisible, setIsVisible, children, modalStyle }) => {
	const { dropdownColor, iconColor } = useThemeManager();
	return (
		<Modal isVisible={isVisible} style={[styles.modal, modalStyle]} animationIn="zoomIn" animationOut="zoomOut" animationOutTiming={700}>
			<View style={[styles.modalContainer, { backgroundColor: dropdownColor }]}>
				<CustomTouchableOpacity onPress={() => setIsVisible(false)} style={styles.iconBox}>
					<Icon name="cross" size={20} color={iconColor} />
				</CustomTouchableOpacity>
				{children}
			</View>
		</Modal>
	);
};

export default CustomModal;

const styles = StyleSheet.create({
	modalContainer: { borderRadius: 20, padding: 20 },
	modal: { margin: 15 },
	iconBox: { alignSelf: 'flex-end', marginBottom: 16 }
});
