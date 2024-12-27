// import packages
import React, { useEffect, useState } from 'react';
import Favourite from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
// import styling
import { COLORS } from '../../styles/theme-styles';
import globalStyles from '../../styles/global-styles';
// import components
import CustomText from '../customComponents/CustomText';
import CustomTouchableOpacity from '../customComponents/CustomTouchableOpacity';
// import hooks
import useCommonFunctions from '../../lib/customHooks/useCommonFunctions';
import { Loader } from '../loader/Loader';
import useThemeManager from '../../lib/customHooks/useThemeManager';

const ViewScreens = ({ data, onPressItem, favourite, isFavoriteScreen = false, refreshControlProps }) => {
	const [favorites, setFavorites] = useState([]);
	const [isFavItem, setIsFavItem] = useState([]);

	const { bgColor } = useThemeManager()

	useEffect(() => {
		const loadFavorites = async () => {
			try {
				const storedFavorites = await AsyncStorage.getItem('favorites');
				if (storedFavorites) {
					setFavorites(JSON.parse(storedFavorites));
				}
			} catch (error) {
				console.error('Error loading favorites:', error);
			}
		};

		loadFavorites();
	}, []);

	// Toggle favorite and update AsyncStorage
	const toggleFavorite = async itemId => {
		try {
			let updatedFavorites;

			// Check if item is already in favorites
			const isItemFavorite = favorites?.includes(itemId);

			if (isItemFavorite) {
				// Remove item from favorites
				updatedFavorites = favorites?.filter(id => id !== itemId);
			} else {
				// Add item to favorites
				updatedFavorites = [...favorites, itemId];
			}

			// Update state
			setFavorites(updatedFavorites);

			// Save to AsyncStorage
			await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
		} catch (error) {
			console.error('Error toggling favorite:', error);
		}
	};

	const displayData = isFavoriteScreen ? data?.filter(item => favorites?.includes(item?.page_id)) : data;

	const renderItem = ({ item }) => {
		const { getMaSummaryColor } = useCommonFunctions();

		const maSummaryColor = getMaSummaryColor(item?.ma_summery);
		return (
			<View style={styles.itemContainer}>
				<CustomTouchableOpacity onPress={() => toggleFavorite(item?.page_id)}>
					{favorites.includes(item?.page_id) ? (
						<Favourite name="heart" size={17} color={COLORS.GREEN} />
					) : (
						<Favourite name="hearto" color={COLORS.GREEN} size={17} />
					)}
					{/* {isFavItem?.find((fav) => fav == item?.page_id) ? (<Favourite
                        name="heart"
                        size={17}
                        color={COLORS.GREEN}
                    />
                    ) : (
                        <Favourite
                            name="hearto"
                            color={COLORS.GREEN}
                            size={17}
                        />)} */}
				</CustomTouchableOpacity>

				<CustomTouchableOpacity style={{ flex: 1 }} onPress={() => onPressItem?.(item)}>
					<View style={globalStyles.container}>
						<View style={[globalStyles.container, { gap: 7 }]}>
							{/* <View style= {{ width: 130,}}> */}

							<CustomText style={globalStyles.titleText} numberOfLines={1}>
								{item?.symbol}
							</CustomText>
							{/* </View>  */}
							<CustomText style={globalStyles.titleText}>|</CustomText>
							<CustomText style={[globalStyles.titleText, { color: maSummaryColor }]}>{item?.ma_summery}</CustomText>
						</View>
						<CustomText style={[globalStyles.titleText, { color: maSummaryColor }]}>{`Price: ${item?.price}`}</CustomText>
					</View>
					<View style={globalStyles.container}>
						<View style={[globalStyles.container, { fontSize: 10, gap: 7, width: '60%' }]}>
							<CustomText style={[globalStyles.timeText]}>{item?.symbol2}</CustomText>
						</View>
						<View style={[globalStyles.container, { gap: 4 }]}>
							<CustomText style={[globalStyles.timeText, { color: maSummaryColor }]}>{item?.summaryChange}</CustomText>
							<CustomText style={[globalStyles.timeText, { color: maSummaryColor }]}>{'('}</CustomText>
							<CustomText style={[globalStyles.timeText, { color: maSummaryColor }]}>
								{item?.summaryChangeP}
								{'%'}
							</CustomText>
							<CustomText style={[globalStyles.timeText, { color: maSummaryColor }]}>{')'}</CustomText>
						</View>
					</View>
				</CustomTouchableOpacity>
			</View>
		);
	};

	return (
		<SafeAreaView style={{}}>
			<FlatList
				data={displayData}
				renderItem={renderItem}
				keyExtractor={item => item?.page_id?.toString()}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: '55%' }}
				refreshControl={
					refreshControlProps ? (
						<RefreshControl
							refreshing={false}
							onRefresh={refreshControlProps?.onRefresh}
							progressBackgroundColor="transparent"
							style={{ display: 'none', position: "absolute", top: 0, }}
						/>
					) : null
				}
				ListHeaderComponent={
					refreshControlProps?.isRefreshing ? (
						<View style={{ color: bgColor }}>
							<Loader loaderStyle={{}} />
						</View>
					) : null
				}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	itemContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		paddingVertical: 14,
		borderBottomWidth: 1,
		borderColor: COLORS.GREY
	}
	// loaderContainer: {
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// 	top: 30,
	// 	marginVertical: 10
	// }
});

export default ViewScreens;
