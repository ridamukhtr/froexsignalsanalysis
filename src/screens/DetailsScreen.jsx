import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomView from '../components/customComponents/CustomView'
import ViewIndicesDetails from '../components/views/ViewIndicesDetails'
import ViewIndicesRating from '../components/views/ViewIndicesRating'
import { useNavigation, useRoute } from '@react-navigation/native'
import CustomModal from '../components/customComponents/CustomModal'
import ViewModalData from '../components/views/ViewModalData'
import { COLORS } from '../styles/theme-styles'
import Icon from 'react-native-vector-icons/AntDesign'
import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity'
import { ROUTES } from '../routes/RouteConstants'
import CustomScrollView from '../components/customComponents/CustomScrollView'
import SignalSummery from '../components/views/SignalSummery'

const DetailsScreen = ({ itemId }) => {
    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = useState(false);

    const fnNavigateToDetails = () => navigation.navigate(ROUTES?.screenChart);

    const route = useRoute();
    const { item } = route.params;
    const [detailData, setDetailData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMsgId, setSelectedMsgId] = useState(null);
    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
        fetchDetailData();
    }, []);

    const fetchDetailData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://massyart.com/ringsignal/inv/api_data?id=${item?.page_id}`);
            const data = await response?.json();

            if (data?.all?.length > 0) {
                const relevantData = data?.all?.find(item => item?.page_id === item?.page_id);
                if (relevantData) {
                    setDetailData(relevantData);
                } else {
                    console.log('No matching item found');
                    setError('No matching item found');
                }
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err?.message);
        } finally {
            setLoading(false);
        }
    };

    const parseActiveFromTime = (activeFrom) => {
        try {
            const parsedData = JSON?.parse(activeFrom);
            return parsedData?.ma?.time || null;
        } catch (error) {
            console.error('Error parsing active_from:', error);
            return null;
        }
    };

    const activeFromTime = parseActiveFromTime(detailData?.active_from);

    const handlePressItem = () => {
        fnNavigateToDetails();
        console.log('Item pressed:',);
    };
    const fnOnPress = () => {
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
        <CustomView showBackIcon title={item?.symbol} right={<ChartIcon />} >

            <ViewIndicesRating price={item?.price}
                summaryChange={item?.summaryChange}
                summaryChangeP={item?.summaryChangeP}
                ma_summery={item?.ma_summery}
                ago={detailData?.ago}
                active_from={activeFromTime}
            />

            <CustomScrollView>
                <SignalSummery
                    symbol={item?.symbol}
                    maSummary={item?.ma_summery}
                    ago={detailData?.ago}
                    ma_summery={item?.ma_summery}
                    updateTime={detailData?.update_time}
                />

                <ViewIndicesDetails onPress={() => fnOnPress()} title={"Moving Averages"} />

                <CustomModal isVisible={isModalVisible} setIsVisible={setModalVisible} showBackIcon={true}>
                    <View style={{ backgroundColor: COLORS.DARK_BLUE, }}>

                        {/* <ViewModalData title={"Moving Average Lines"} msgId={selectedMsgId} data={selectedData}
                            maBuy={item?.maBuy}
                            tiBuy={detailData?.tiBuy} /> */}
                    </View>
                </CustomModal>
            </CustomScrollView>
        </CustomView>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({})