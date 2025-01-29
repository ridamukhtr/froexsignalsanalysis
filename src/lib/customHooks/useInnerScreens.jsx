import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
// import store
import { useGetInnerScreenDataQuery } from '../../redux/storeApis';
// import routes
import { ROUTES } from '../../routes/RouteConstants';

const useInnerScreens = () => {

  const navigation = useNavigation();

  const handlePressItem = (item) => {
    if (item?.page_id && item?.msg_id) {
      navigation.navigate(ROUTES.screenDetails, {
        page_id: item.page_id,
        msg_id: item.msg_id,
        time: item.time,
      });
    } else {
      console.error("Invalid item passed to handlePressItem:", item);
    }
  };


  const transformAndSortData = (data, sortKey, sortOrder = 'asc') => {
    if (!data || Object?.keys(data)?.length === 0) return [];

    const dataArray = Object?.values(data);

    switch (sortKey) {
      case 'name':
        return _.orderBy(dataArray, ['symbol'], [sortOrder]);

      case 'price':
        return _.orderBy(
          dataArray,
          [(item) => (item?.price ? parseFloat(item?.price) : Number.MIN_VALUE)],
          [sortOrder]
        );

      case 'change%':
        return _.orderBy(
          dataArray,
          [(item) => (item?.summaryChangeP ? parseFloat(item?.summaryChangeP) : Number.MIN_VALUE)],
          [sortOrder]
        );

      case 'signal': {
        const baseSignalOrder = ['Strong Buy', 'Buy', 'Neutral', 'Sell', 'Strong Sell'];
        const signalOrder = sortOrder === 'asc' ? baseSignalOrder : [...baseSignalOrder].reverse();

        return _.orderBy(
          dataArray,
          [(item) => {
            const index = signalOrder?.indexOf(item?.ma_summery);
            return index !== -1 ? index : Number?.MAX_VALUE;
          }],
          [sortOrder]
        );
      }

      default:
        return dataArray;
    }
  };



  const filterData = (data, searchQuery) => {
    if (!searchQuery) return data;

    return data.filter(item =>
      item?.symbol?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
  };

  return { handlePressItem, transformAndSortData, filterData };
};

export default useInnerScreens;