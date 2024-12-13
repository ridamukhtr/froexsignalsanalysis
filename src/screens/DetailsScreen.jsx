import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomView from '../components/customComponents/CustomView'
import ViewIndicesDetails from '../components/views/ViewIndicesDetails'
import ViewIndicesRating from '../components/views/ViewIndicesRating'
import { useNavigation, useRoute } from '@react-navigation/native'
import CustomModal from '../components/customComponents/CustomModal'
import ViewModalData from '../components/views/ViewModalData'
import { COLORS } from '../styles/theme-styles'
import AdvanceReport from '../components/views/AdvanceReport'
import Icon from 'react-native-vector-icons/AntDesign'
import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity'
import { ROUTES } from '../routes/RouteConstants'


const DetailsScreen = () => {
    const navigation = useNavigation()

    const route = useRoute();
    const [isModalVisible, setModalVisible] = useState(false);

    const { item } = route.params;
    const fnNavigateToDetails = () => navigation.navigate(ROUTES.screenChart);


    const handlePressItem = () => {
        fnNavigateToDetails(); // Pass item data to details screen
        console.log('Item pressed:',);
    };
    const fnOnpress = () => {
        console.log("Button pressed inside modal!");
        setModalVisible(true);
    };

    const ChartIcon = () => {
        return (
            <CustomTouchableOpacity onPress={handlePressItem} >
                <Icon name={"linechart"} size={20} color={COLORS.WHITE} />
            </CustomTouchableOpacity>
        )
    }

    return (
        <CustomView showBackIcon title={item} right={<ChartIcon />} >

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