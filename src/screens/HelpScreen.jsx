// import packages
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
// import components
import CustomText from '../components/customComponents/CustomText'
import CustomView from '../components/customComponents/CustomView'
import CustomScrollView from '../components/customComponents/CustomScrollView'
import CustomAccordion from '../components/customComponents/CustomAccordion'
import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity'
// import styling
import { COLORS } from '../styles/theme-styles'
import globalStyles from '../styles/global-styles'
// import hooks
import { useThemeManager } from '../lib/customHooks/useThemeManager'
// static data
import { all_data } from '../../assets/all_data'

const tableData = [
    { id: 1, fiveMin: "Strong Sell", fifteenMin: "Strong Sell", thirtyMin: "Strong Sell", future: "You can sell your order" },
    { id: 2, fiveMin: "Strong Buy", fifteenMin: "Strong Sell", thirtyMin: "Strong Sell", future: "Normal - Keep your order" },
    { id: 3, fiveMin: "Strong Buy", fifteenMin: "Strong Buy", thirtyMin: "Strong Sell", future: "Wait - market is changing" },
    { id: 4, fiveMin: "Strong Sell", fifteenMin: "Strong Buy", thirtyMin: "Strong Sell", future: "Again - market in sell direction" },
    { id: 5, fiveMin: "Strong Buy", fifteenMin: "Strong Buy", thirtyMin: "Strong Buy", future: "Alert - close SELL order" },
];


const HelpScreen = () => {

    const [openAccordion, setOpenAccordion] = useState(null);

    const { borderColor, textColor } = useThemeManager();

    const toggleAccordion = (id) => {
        setOpenAccordion((prev) => (prev === id ? null : id));
    };

    const getSignalColor = (signal) => {
        if (signal === "Strong Sell") return COLORS.RED;
        if (signal === "Strong Buy") return COLORS.GREEN;
        return textColor;
    };

    return (
        <CustomView showBackIcon title={"Help"} >
            <CustomScrollView>
                <View >
                    <CustomText>{all_data.introduction}</CustomText>
                    <CustomAccordion
                        title="How To Use?"
                        isCollapsed={openAccordion === 'howToUse'}
                        onPress={() => toggleAccordion('howToUse')}
                    >
                        <CustomText>{all_data.howToUse}</CustomText>
                        <CustomText style={globalStyles.titleText}> Basic Example 1:</CustomText>
                        <CustomText>{all_data.basicExample1}</CustomText>
                        <CustomText style={globalStyles.titleText}> Basic Example 2:</CustomText>
                        <CustomText>{all_data.basicExample2}</CustomText>
                    </CustomAccordion>
                </View>
                <View >
                    <CustomAccordion
                        title="How to know when market change:"
                        isCollapsed={openAccordion === 'marketChange'}
                        onPress={() => toggleAccordion('marketChange')}
                    >
                        <CustomText>
                            Assume 1Hr is strong SEL🔻🔻 : Then this is how you look into signals table.
                        </CustomText>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", }}>
                            <View style={{ width: "23%", }}>

                                <CustomText style={[globalStyles.titleText, { fontSize: 15 }]}>
                                    {'5 minutes'}
                                </CustomText>
                            </View>
                            <View style={{ width: "23%", }}>
                                <CustomText style={[globalStyles.titleText, { fontSize: 15 }]}>
                                    {"15 minutes"}
                                </CustomText>
                            </View>
                            <View style={{ width: "23%", }}>
                                <CustomText style={[globalStyles.titleText, { fontSize: 15 }]}>
                                    {"30 minutes"}
                                </CustomText>
                            </View>
                            <View style={{ width: "35%", }}>
                                <CustomText style={[globalStyles.titleText, { fontSize: 15 }]}>
                                    {"Future"}
                                </CustomText>
                            </View>

                        </View>

                        {tableData.map((row) => (
                            <View key={row.id} style={[styles.container, { borderColor: borderColor, }]}>
                                <View style={styles.content}>
                                    <View style={{ width: "23%", }}>
                                        <CustomText style={{ fontSize: 12, color: getSignalColor(row.fiveMin) }}>{row.fiveMin}</CustomText>
                                    </View>
                                    <View style={{ width: "23%", }}>
                                        <CustomText style={{ fontSize: 12, color: getSignalColor(row.fifteenMin) }}>{row.fifteenMin}</CustomText>
                                    </View>
                                    <View style={{ width: "23%", }}>
                                        <CustomText style={{ fontSize: 12, color: getSignalColor(row.thirtyMin) }}>{row.thirtyMin}</CustomText>
                                    </View>
                                    <View style={{ width: "35%", }}>
                                        <CustomText style={{ fontSize: 10, }}>{row.future}</CustomText>
                                    </View>
                                </View>
                            </View>
                        ))}

                        <CustomText style={globalStyles.titleText}>Note:</CustomText>
                        <CustomText>{all_data.note}</CustomText>
                        <CustomText style={globalStyles.titleText}>Warning:</CustomText>
                        <CustomText>{all_data.warning}</CustomText>
                    </CustomAccordion>
                </View>

                <View >
                    <CustomAccordion
                        title="Tips before using Signals"
                        isCollapsed={openAccordion === 'tips'}
                        onPress={() => toggleAccordion('tips')}
                    >
                        <CustomText>{all_data.tips}</CustomText>

                    </CustomAccordion>
                </View>
                <View >
                    <CustomAccordion
                        title="Subscription Features"
                        isCollapsed={openAccordion === 'SubscriptionFeatures'}
                        onPress={() => toggleAccordion('SubscriptionFeatures')}
                    >
                        <CustomText>{all_data.subscription}</CustomText>

                        <CustomText>{'Features:'}</CustomText>
                        <CustomText>{all_data.features}</CustomText>
                        <CustomTouchableOpacity>{"If you didn't subscribe click here to "}</CustomTouchableOpacity>
                    </CustomAccordion>
                </View>
                <View >
                    <CustomAccordion
                        title="Notification Setting"
                        isCollapsed={openAccordion === 'NotificationSetting'}
                        onPress={() => toggleAccordion('NotificationSetting')}
                    >
                        <CustomText>{all_data.notificationSetting}</CustomText>

                    </CustomAccordion>
                </View>
                <View >
                    <CustomAccordion
                        title="Notification not received?"
                        isCollapsed={openAccordion === 'Notificationrecieved'}
                        onPress={() => toggleAccordion('Notificationrecieved')}
                    >
                        <CustomText style={globalStyles.titleText}>{"Check things before submit complain."}</CustomText>
                        <CustomText>{all_data.notificationrecieved}</CustomText>

                    </CustomAccordion>
                </View>
                <View >
                    <CustomAccordion
                        title="How to cancel subscription?"
                        isCollapsed={openAccordion === 'CancelSubscription'}
                        onPress={() => toggleAccordion('CancelSubscription')}
                    >
                        <CustomText>{all_data.cancelSubscription}</CustomText>

                    </CustomAccordion>
                </View>
                <View >
                    <CustomAccordion
                        title="Need more help??"
                        isCollapsed={openAccordion === 'moreHelp'}
                        onPress={() => toggleAccordion('moreHelp')}
                    >
                        <CustomText>{all_data.moreHelp}</CustomText>

                    </CustomAccordion>
                </View>

            </CustomScrollView>

        </CustomView>
    )
}

export default HelpScreen

const styles = StyleSheet.create({

    container: { paddingVertical: 7, borderBottomWidth: 1, },
    content: { flexDirection: 'row', alignItems: 'center', }
})