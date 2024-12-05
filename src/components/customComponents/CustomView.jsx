import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import React from 'react'
import { IS_IOS } from '../../styles/theme-styles'
import CustomScrollView from './CustomScrollView'
import CustomText from './CustomText'
import CustomTouchableOpacity from './CustomTouchableOpacity'

const CustomView = ({ children, style, addScroll, contentContainerStyle, scrollViewRef, showsHorizontalScrollIndicator, centered, title = false, showsVerticalScrollIndicator, showScreenHeader, showBackIcon = false, headerStyle, onPressBackIcon, right }) => {
    return (
        <>
            {addScroll ?
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_IOS ? 'padding' : 'height'}>
                    <CustomScrollView scrollViewRef={scrollViewRef} style={[styles.container, style]} contentContainerStyle={contentContainerStyle} showsHorizontalScrollIndicator={showsHorizontalScrollIndicator} showsVerticalScrollIndicator={showsVerticalScrollIndicator}>
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
                    <View style={[styles.container, style]}>
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

const styles = StyleSheet.create({})