import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ViewIndicesRating from './ViewIndicesRating'
import CustomView from '../customComponents/CustomView'
import ViewIndicesDetails from './ViewIndicesDetails'
import HorizontalView from './HorizontalView'
import CustomScrollView from '../customComponents/CustomScrollView'

const tabs = ["Technical", "Monthly", "Week", "year", "tue", "wke", "rjeks"];

const ViewTechnical = () => {

    return (
        <CustomScrollView>
            <ViewIndicesRating />
                <View style={{ marginTop:30 }}>

                    <ViewIndicesDetails />
                </View>
                <ViewIndicesDetails />
                <ViewIndicesDetails />
                <ViewIndicesDetails />
                <ViewIndicesDetails />
                <ViewIndicesDetails />
                <HorizontalView  variant tabs={tabs} />

        </CustomScrollView>

    )
}

export default ViewTechnical

const styles = StyleSheet.create({
    titleText: { fontSize: 19, fontWeight: '500', lineHeight: 40 },

})