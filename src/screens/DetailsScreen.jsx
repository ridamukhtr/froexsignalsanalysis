import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomView from '../components/customComponents/CustomView'
import ViewIndicesDetails from '../components/views/ViewIndicesDetails'
import ViewIndicesRating from '../components/views/ViewIndicesRating'
import { useRoute } from '@react-navigation/native'
import CustomModal from '../components/customComponents/CustomModal'
import ViewModalData from '../components/views/ViewModalData'
import { COLORS } from '../styles/theme-styles'
import CustomText from '../components/customComponents/CustomText'
import HorizontalView from '../components/views/HorizontalView'
import AdvanceReport from '../components/views/AdvanceReport'

const DetailsScreen = () => {

    const route = useRoute();
    const [isModalVisible, setModalVisible] = useState(false);

    const { item } = route.params;

    const fnOnpress = () => {
        console.log("Button pressed inside modal!");
        setModalVisible(true);
    };
    return (
        <CustomView showBackIcon title={"Details"} >

            <ViewIndicesRating />
            <AdvanceReport />

            <ViewIndicesDetails onPress={fnOnpress} title={"Moving Averages"} />
            <ViewIndicesDetails onPress={fnOnpress} title={"Technical Indicator"} />

            <AdvanceReport />

            <CustomModal isVisible={isModalVisible} setIsVisible={setModalVisible} showBackIcon={true}>
                <View style={{ backgroundColor: COLORS.DARK_BLUE, }}>

                    <ViewModalData title={"Moving Average Lines"} />
                </View>
            </CustomModal>

        </CustomView>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({})