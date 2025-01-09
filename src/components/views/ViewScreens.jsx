// import packages
import React from 'react';
import Favourite from 'react-native-vector-icons/MaterialIcons';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
// import styling
import { COLORS } from '../../styles/theme-styles';
import globalStyles from '../../styles/global-styles';
// import components
import CustomText from '../customComponents/CustomText';
import CustomTouchableOpacity from '../customComponents/CustomTouchableOpacity';
import { Loader } from '../loader/Loader';
// import hooks
import { useThemeManager } from '../../lib/customHooks/useThemeManager';
import { useCommonFunctions } from '../../lib/customHooks/useCommonFunctions';
import { useFavManager } from '../../lib/customHooks/useFavManager';

const ViewScreens = ({ data, onPressItem, isFavoriteScreen = false, refreshControlProps }) => {

	const { favorites, saveFavorites } = useFavManager();
	const { bgColor, textColor, borderColor } = useThemeManager();

	const toggleFavorite = async (item) => {
		const isAddedFav = favorites?.find((addItem) => addItem?.page_id == item?.page_id);
		const updatedFavorites = isAddedFav ? favorites?.filter((fav) => fav?.page_id != item?.page_id) : [...favorites, item]
		await saveFavorites(updatedFavorites);
		if (isFavoriteScreen && refreshControlProps?.onRefresh) {
			refreshControlProps?.onRefresh();
		}
	};

	const renderItem = ({ item }) => {
		const { getMaSummaryColor } = useCommonFunctions();
		const maSummaryColor = item?.ma_summery ? getMaSummaryColor(item?.ma_summery) : textColor;


		return (
			<View style={[styles.itemContainer, { borderColor }]}>
				<CustomTouchableOpacity onPress={() => toggleFavorite(item)}>
					{favorites?.find((fav) => fav?.page_id == item?.page_id) ? (
						<Favourite name="star" size={17} color={COLORS.GREEN} />
					) : (
						<Favourite name="star-outline" color={COLORS.GREEN} size={17} />
					)}
				</CustomTouchableOpacity>

				<CustomTouchableOpacity style={{ flex: 1 }} onPress={() => onPressItem?.(item)}>
					<View style={[globalStyles.container, { gap: 7 }]}>
						<CustomText style={globalStyles.titleText} numberOfLines={1}>
							{item?.symbol}
						</CustomText>
						<CustomText style={[globalStyles.titleText, { color: textColor }]}>{item?.price}</CustomText>
					</View>
					<View style={globalStyles.container}>
						<View style={[globalStyles.container, { gap: 7 }]}>
							<CustomText style={[globalStyles.titleText, { color: maSummaryColor }]}>{item?.ma_summery}</CustomText>
						</View>
						<View style={[globalStyles.container, { gap: 4 }]}>
							<CustomText style={[globalStyles.timeText, { fontSize: 12, color: maSummaryColor }]}>{item?.summaryChange}</CustomText>
							<CustomText style={[globalStyles.timeText, { fontSize: 12, color: maSummaryColor }]}>
								{`( ${item?.summaryChangeP} %)`}
							</CustomText>
						</View>
					</View>
				</CustomTouchableOpacity>
			</View>
		);
	};

	return (
		<SafeAreaView>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item?.page_id?.toString()}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: '50%' }}
				refreshControl={
					refreshControlProps ? (
						<RefreshControl
							refreshing={false}
							onRefresh={refreshControlProps?.onRefresh}
							progressBackgroundColor="transparent"
							style={{ display: 'none', position: 'absolute', top: 0 }}
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
		paddingVertical: 7,
		borderBottomWidth: 1,
	}
});

export default ViewScreens;
