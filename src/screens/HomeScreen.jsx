import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from '../components/customComponents/CustomText';
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';

const data = [
    {
        id: '1',
        title: 'Peagout',
        amount: '25,598.95',
        type: 'O',
        status:"Strong",
        time: '11:43:21',
        description: 'Nasa',
        change: '+0.75',
        percentage: '(+0.75%)',
    },
    {
        id: '2',
        title: 'Peagout',
        amount: '25,598.95',
        type: 'O',
        time: '11:43:21',
        status:"Week",
        description: 'Nasa',
        change: '+0.75',
        percentage: '(+0.75%)',
    },
];

const HomeScreens = () => {
    const handlePressItem = (item) => {
        console.log('Item pressed:', item);
    };

    return (
        <CustomView addScroll={true}>
            <ViewScreens
                data={data}
                onPressItem={handlePressItem}
                renderRightSection={(item) => (
                    <View style={{ flexDirection: 'row', gap: 7 }}>
                        <CustomText>{item.change}</CustomText>
                        <CustomText>{item.percentage}</CustomText>
                    </View>
                )}
            />
        </CustomView>
    );
};

export default HomeScreens;

const styles = StyleSheet.create({});
