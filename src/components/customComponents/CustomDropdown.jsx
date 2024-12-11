import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import CustomTouchableOpacity from './CustomTouchableOpacity';
import CustomText from './CustomText';
import DotsVerticalIcon from 'react-native-vector-icons/Entypo'
import Check from 'react-native-vector-icons/Entypo'
import { COLORS } from '../../styles/theme-styles';
import useThemeManager from '../../lib/customHooks/useThemeManager';


const CustomDropdown = ({ item, onPress, activeTheme }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const { textColor, bgColor } = useThemeManager()

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
                <DotsVerticalIcon name={"dots-three-vertical"} size={20} color={textColor} />
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}
            >
                <CustomTouchableOpacity activeOpacity={1} style={styles.modalOverlay}>
                    <View style={[styles.dropdown(bgColor)]}>
                        {item?.map((themeItem, index) => (
                            <CustomTouchableOpacity
                                key={index}
                                style={[
                                    styles.menuItemContainer,
                                ]}
                                onPress={() => onPress(themeItem.label)}
                            >
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <CustomText style={styles.menuItemText}>{themeItem?.label}</CustomText>
                                    {activeTheme === themeItem.label && (
                                        <Check name={"check"} size={20} color={COLORS.GREEN} />
                                    )}
                                </View>
                            </CustomTouchableOpacity>
                        ))}
                    </View>
                </CustomTouchableOpacity>
            </Modal>
        </View>
    );
};



// const CustomDropdown = ({ item, onPress }) => {

//     const [modalVisible, setModalVisible] = useState(false);
//     const [selectedItemIndex, setSelectedItemIndex] = useState(null);

//     const toggleModal = () => {
//         setModalVisible(!modalVisible);
//     };

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
//                 <DotsVerticalIcon name={"dots-three-vertical"} size={20} />
//             </TouchableOpacity>

//             <Modal
//                 visible={modalVisible}
//                 transparent={true}
//                 animationType="fade"
//                 onBackdropPress={toggleModal}
//                 onBackButtonPress={toggleModal}
//             >
//                 <CustomTouchableOpacity activeOpacity={1} style={styles.modalOverlay} >
//                     <View style={styles.dropdown}>
//                         {item?.map((item, index) => (
//                             <CustomTouchableOpacity key={index} style={[styles.menuItemContainer, { backgroundColor: selectedItemIndex == index ? COLORS.DIM : COLORS.WHITE }]} onPress={onPress} >
//                                 <View style={{ flexDirection: "row", justifyContent:"space-between" }}>
//                                     <CustomText style={styles.menuItemText}>{item?.label}</CustomText>
//                                     <Check name={"check"} size={20} color={COLORS.GREEN} />

//                                 </View>
//                             </CustomTouchableOpacity>
//                         ))}
//                     </View>
//                 </CustomTouchableOpacity>
//             </Modal>
//         </View>
//     );
// };

const styles = StyleSheet.create({
    modalOverlay: {
        position: 'absolute',
        top: '11%',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
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
        shadowRadius: 2,
    }),
    menuItemContainer: {
        paddingVertical: 10,
        borderRadius: 15,
        padding: 15,
    },
    menuItemText: {
        fontSize: 16,
        color: COLORS.NAV_BLUE,
    },
});

export default CustomDropdown;