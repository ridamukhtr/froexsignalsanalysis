import { StyleSheet, View } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import CustomTouchableOpacity from './CustomTouchableOpacity';
import { COLORS } from '../../styles/theme-styles';
import Icon from 'react-native-vector-icons/Entypo'

const CustomModal = ({ isVisible, setIsVisible, children, modalStyle, showBackIcon }) => {

  return (
    <Modal isVisible={isVisible} style={[styles.modal, modalStyle]} animationIn="zoomIn"
      animationOut="zoomOut"
      animationOutTiming={700} >

      <View style={styles.modalContainer}>
        <CustomTouchableOpacity onPress={() => setIsVisible(false)} style={styles.iconBox}>
          <Icon name="cross" size={20} color={COLORS.WHITE} />
        </CustomTouchableOpacity>
        {children}
      </View>
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.DARK_BLUE,
    borderRadius: 20,
    padding: 20,
  },
  modal: { margin: 15 },
  iconBox: { alignSelf: 'flex-end', marginBottom: 16 },
})