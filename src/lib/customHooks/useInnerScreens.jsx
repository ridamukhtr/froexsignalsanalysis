// import packages
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
// import store
import { useGetInnerScreenDataQuery } from '../../redux/storeApis';
// import routes
import { ROUTES } from '../../routes/RouteConstants';

const useInnerScreens = () => {

  const navigation = useNavigation();

  const [selectedItem, setSelectedItem] = useState(null);


  const { data: detailData, } = useGetInnerScreenDataQuery(
    {
      id: selectedItem?.id,
      msg_id: selectedItem?.msg_id
    },
    {
      skip: !selectedItem,
      enabled: !!selectedItem
    }
  );

  useEffect(() => {
    if (detailData && selectedItem) {
      const params = {
        id: selectedItem?.id,
        msg_id: selectedItem?.msg_id,
        item: selectedItem,
        detailData
      };

      navigation.navigate(ROUTES.screenDetails, { item: selectedItem, params });
      setSelectedItem(null);
    }
  }, [detailData, selectedItem, navigation]);

  const handlePressItem = item => {
    setSelectedItem(item);
    console.log('Item pressed:', item);
  };

  const transformAndSortData = (data, sortKey) => {
    if (!data || Object?.keys(data)?.length === 0) return [];

    const dataArray = Object.values(data);
    if (sortKey === 'name') {
      return _.orderBy(dataArray, ['symbol'], ['asc']);
    } else if (sortKey === 'price') {
      return _.orderBy(dataArray, [(item) => parseFloat(item?.price)], ['desc']);
    } else if (sortKey === 'change%') {
      return _.orderBy(dataArray, [(item) => parseFloat(item?.summaryChangeP)], ['desc']);
    } else if (sortKey === 'signal') {
      const signalOrder = ['Strong Buy', 'Buy', 'Neutral', 'Sell', 'Strong Sell'];
      return _.orderBy(
        dataArray,
        [(item) => signalOrder.indexOf(item.ma_summery) >= 0 ? signalOrder.indexOf(item.ma_summery) : Number.MAX_VALUE],
        ['asc']
      );
    };
  }

  return { handlePressItem, transformAndSortData };
};

export default useInnerScreens;
