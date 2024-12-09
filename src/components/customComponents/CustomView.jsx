import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import React from 'react'
import { COLORS, IS_IOS } from '../../styles/theme-styles'
import CustomScrollView from './CustomScrollView'
import CustomText from './CustomText'
import CustomTouchableOpacity from './CustomTouchableOpacity'
import { BackIcon } from '../../../assets/svg'
import { FONTS } from '../../styles/global-styles'
import useThemeManager from '../../lib/customHooks/useThemeManager'
import useNavigationManager from '../../lib/customHooks/useNavigationContainer'
import Ioniicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Entypo'


const CustomView = ({ children, style, showDrawer, contentContainerStyle, scrollViewRef, showsHorizontalScrollIndicator, centered, title = false, showsVerticalScrollIndicator, showScreenHeader, showBackIcon = false, headerStyle, onPressBackIcon, right }) => {


    const { bgColor } = useThemeManager();
    const { fnOpenDrawer, fnNavigateGoBack } = useNavigationManager();

    return (
        <>
            {showDrawer ?
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_IOS ? 'padding' : 'height'}>
                    <CustomScrollView scrollViewRef={scrollViewRef} style={[styles.container(bgColor), style]} contentContainerStyle={contentContainerStyle} showsHorizontalScrollIndicator={showsHorizontalScrollIndicator} showsVerticalScrollIndicator={showsVerticalScrollIndicator}>
                        {showBackIcon ? (
                            <View style={[styles.headerContainer, headerStyle]}>
                                <CustomTouchableOpacity highlight={true} onPress={onPressBackIcon ? onPressBackIcon : fnNavigateGoBack}>
                                    <BackIcon />
                                </CustomTouchableOpacity>
                                <CustomText style={styles.titleContainer} >{title}</CustomText>
                                {right}
                            </View>
                        ) : (
                            <View style={[styles.headerContainer, headerStyle]}>
                                <CustomTouchableOpacity onPress={fnOpenDrawer}>
                                    <Ioniicons name={"menu"} size={30} />
                                </CustomTouchableOpacity>
                                {right}
                            </View>
                        )

                        }
                        {children}
                    </CustomScrollView>
                </KeyboardAvoidingView>
                :


                <KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_IOS ? 'padding' : 'height'}>
                    <View style={[styles.container(bgColor), style]}>
                        {showBackIcon ? (
                            <View style={[styles.headerContainer, headerStyle]}>
                                <CustomTouchableOpacity highlight={true} onPress={onPressBackIcon ? onPressBackIcon : fnNavigateGoBack}>
                                    <Icon name={"chevron-left"} size={25} color={COLORS.WHITE} width={34} />
                                </CustomTouchableOpacity>
                                <View style={{ flex: 1 }} >

                                    <CustomText style={styles.titleContainer} >{title}</CustomText>
                                </View>

                                {right}
                            </View>
                        ) : (
                            <View style={[styles.headerContainer, headerStyle]}>
                                {/* <View style={styles.headerContainer} > */}
                                <CustomTouchableOpacity onPress={fnOpenDrawer}>
                                    <Ioniicons name={"menu"} size={30} />
                                </CustomTouchableOpacity>
                                {right}

                            </View>
                        )

                        }
                        {children}

                    </View>
                </KeyboardAvoidingView>

            }
        </>
    )
}

export default CustomView

const styles = StyleSheet.create({
    container: (bgColor) => ({ flex: 1, backgroundColor: bgColor ? COLORS.PRIMARY : COLORS.WHITE, paddingHorizontal: '4%', }),
    flexContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    centerContainer: {
        width: '100%',
        alignItems: 'center',
    },
    headerContainer: { flexDirection: 'row', alignItems: "center", paddingTop: 30, paddingBottom: 15, },
    headerFullWidthContainer: { justifyContent: 'space-between', flexDirection: 'row', alignItems: "center", gap: 10, paddingTop: 52, paddingBottom: 16, paddingHorizontal: 10, },
    titleContainer: { color: COLORS.WHITE, fontWeight: '500', fontSize: 18, fontFamily: FONTS.semi_bold },
})