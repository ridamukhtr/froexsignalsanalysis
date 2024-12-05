import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import React from 'react'
import { COLORS, IS_IOS } from '../../styles/theme-styles'
import CustomScrollView from './CustomScrollView'
import CustomText from './CustomText'
import CustomTouchableOpacity from './CustomTouchableOpacity'
import { BackIcon } from '../../../assets/svg'
import { FONTS } from '../../styles/global-styles'
import useThemeManager from '../../lib/customHooks/useThemeManager'

const CustomView = ({ children, style, addScroll, contentContainerStyle, scrollViewRef, showsHorizontalScrollIndicator, centered, title = false, showsVerticalScrollIndicator, showScreenHeader, showBackIcon = false, headerStyle, onPressBackIcon, right }) => {


    const { bgColor } = useThemeManager();
    
    return (
        <>
            {addScroll ?
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_IOS ? 'padding' : 'height'}>
                    <CustomScrollView scrollViewRef={scrollViewRef} style={[styles.container(bgColor), style]} contentContainerStyle={contentContainerStyle} showsHorizontalScrollIndicator={showsHorizontalScrollIndicator} showsVerticalScrollIndicator={showsVerticalScrollIndicator}>
                        {showBackIcon &&
                            <View style={[styles.headerContainer, headerStyle]}>
                                <CustomTouchableOpacity highlight={true} onPress={onPressBackIcon ? onPressBackIcon : fnNavigateGoBack}>
                                    <BackIcon />
                                </CustomTouchableOpacity>
                                <CustomText style={styles.titleContainer} >{title}</CustomText>
                                {right}
                            </View>
                        }
                        {children}
                    </CustomScrollView>
                </KeyboardAvoidingView>
                :
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_IOS ? 'padding' : 'height'}>
                    <View style={[styles.container(bgColor), style]}>
                        {showBackIcon &&
                            <View style={[centered ? styles.headerFullWidthContainer : styles.headerContainer, headerStyle]}>
                                <CustomTouchableOpacity highlight={true} onPress={onPressBackIcon ? onPressBackIcon : fnNavigateGoBack}>
                                    <BackIcon />
                                </CustomTouchableOpacity>
                                {centered ? (
                                    <View style={{ width: '90%' }}>
                                        {centered}
                                    </View>
                                ) : (
                                    <>
                                        <CustomText style={styles.titleContainer}>{title}</CustomText>
                                        {right}
                                    </>
                                )}
                            </View>
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
    headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", paddingTop: 52, paddingBottom: 24, },
    headerFullWidthContainer: { justifyContent: 'space-between', flexDirection: 'row', alignItems: "center", gap: 10, paddingTop: 52, paddingBottom: 16, paddingHorizontal: 10, },
    titleContainer: { color: COLORS.PRIMARY, fontWeight: '500', fontSize: 18, fontFamily: FONTS.semi_bold },
})