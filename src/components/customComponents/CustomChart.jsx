import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { COLORS } from "../../styles/theme-styles";

const CustomChart = () => {
    return (
        <View style={styles.container}>
            <LineChart
                data={{
                    labels: ["21:05", "22:25", "23:45", "01:00", "02:20"],
                    datasets: [
                        {
                            data: [25.1, 25.4, 25.2, 25.5, 25.6],
                            color: () => COLORS.YELLOW,
                        },
                    ],
                }}
                width={Dimensions.get("window").width - 30} 
                height={250}
                chartConfig={{
                    backgroundColor: "#1A1A2E",
                    backgroundGradientFrom: "#1A1A2E",
                    backgroundGradientTo: "#1A1A2E",
                    decimalPlaces: 1, // Number of decimal places in data
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    propsForDots: {
                        r: "4",
                        strokeWidth: "2",
                        stroke: COLORS.WHITE,
                    },
                }}
                bezier
                style={{
                    marginVertical: 10,
                    borderRadius: 10,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
     
    },
});

export default CustomChart;
