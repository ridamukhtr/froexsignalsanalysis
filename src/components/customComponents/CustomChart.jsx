import React from "react";
import { View, ScrollView, StyleSheet, Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import CustomScrollView from "./CustomScrollView";

const CustomChart = () => {
    const chartData = [25.1, 25.4, 25.2, 25.5, 25.6,];
    const chartLabels = ["21:05", "22:25", "23:45", "01:00", "02:20",];

    return (
        <View style={styles.container}>
            {/* Fixed Labels */}
            <View style={styles.fixedHeader}>
                {chartLabels.map((label, index) => (
                    <Text key={index} style={styles.label}>
                        {label}
                    </Text>
                ))}
            </View>
            <View style={{ flexDirection: "row" }}>
                <View style={{ justifyContent: "space-between", flexDirection: "column-reverse", alignItems: "center", paddingBottom: 25, paddingHorizontal: 15, }} >

                    {chartData.map((data, index) => (
                        <Text key={index} style={styles.label}>
                            {data}
                        </Text>
                    ))}
                </View>


                {/* Scrollable Graph */}
                <CustomScrollView horizontal>
                    <LineChart
                        data={{
                            labels: chartLabels, 
                            datasets: [
                                {
                                    data: chartData,
                                    color: () => "yellow",
                                },
                            ],
                        }}
                        width={Dimensions.get("window").width * 2} 
                        height={Dimensions.get("window").height - 50}
                        chartConfig={{
                            backgroundColor: "#1A1A2E",
                            backgroundGradientFrom: "#1A1A2E",
                            backgroundGradientTo: "#1A1A2E",
                            decimalPlaces: 1,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: () => `transparent`, 
                            propsForDots: {
                                r: "4",
                                strokeWidth: "2",
                                stroke: "#ffffff",
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 10,
                            borderRadius: 10,
                        }}
                    />
                </CustomScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1A1A2E",
        justifyContent: "center",
    },
    fixedHeader: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 10,
        marginBottom: 15,
        marginTop: 20
    },
    label: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    scrollableGraphContainer: {
        flexGrow: 1,
    },
});

export default CustomChart;

