// // import packages
// import _ from 'lodash';
// import { useState, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
// // import store
// import { useGetInnerScreenDataQuery } from '../../redux/storeApis';
// // import routes
// import { ROUTES } from '../../routes/RouteConstants';

// const useInnerScreens = () => {

//   const navigation = useNavigation();

//   const [selectedItem, setSelectedItem] = useState(null);


//   const { data: detailData, } = useGetInnerScreenDataQuery(
//     {
//       id: selectedItem?.id,
//       msg_id: selectedItem?.msg_id
//     },
//     {
//       skip: !selectedItem,
//       enabled: !!selectedItem
//     }
//   );

//   useEffect(() => {
//     if (detailData && selectedItem) {
//       const params = {
//         id: selectedItem?.id,
//         msg_id: selectedItem?.msg_id,
//         item: selectedItem,
//         detailData
//       };

//       navigation.navigate(ROUTES.screenDetails, { item: selectedItem, params });
//       setSelectedItem(null);
//     }
//   }, [detailData, selectedItem, navigation]);

//   const handlePressItem = (item) => {
//     setSelectedItem(item);
//   };

//   const transformAndSortData = (data, sortKey, sortOrder = 'asc') => {
//     if (!data || Object?.keys(data)?.length === 0) return [];

//     const dataArray = Object?.values(data);

//     switch (sortKey) {
//       case 'name':
//         return _.orderBy(dataArray, ['symbol'], [sortOrder]);

//       case 'price':
//         return _.orderBy(
//           dataArray,
//           [(item) => (item?.price ? parseFloat(item?.price) : Number.MIN_VALUE)],
//           [sortOrder]
//         );

//       case 'change%':
//         return _.orderBy(
//           dataArray,
//           [(item) => (item?.summaryChangeP ? parseFloat(item?.summaryChangeP) : Number.MIN_VALUE)],
//           [sortOrder]
//         );

//       case 'signal': {
//         const baseSignalOrder = ['Strong Buy', 'Buy', 'Neutral', 'Sell', 'Strong Sell'];
//         const signalOrder = sortOrder === 'asc' ? baseSignalOrder : [...baseSignalOrder].reverse();

//         return _.orderBy(
//           dataArray,
//           [(item) => {
//             const index = signalOrder?.indexOf(item?.ma_summery);
//             return index !== -1 ? index : Number?.MAX_VALUE;
//           }],
//           [sortOrder]
//         );
//       }

//       default:
//         return dataArray;
//     }
//   };



//   const filterData = (data, searchQuery) => {
//     if (!searchQuery) return data;

//     return data.filter(item =>
//       item?.symbol?.toLowerCase()?.includes(searchQuery?.toLowerCase())
//     );
//   };

//   return { handlePressItem, transformAndSortData, filterData };
// };

// export default useInnerScreens;


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


  // const { data: detailData, } = useGetInnerScreenDataQuery(
  //   {
  //     id: selectedItem?.id,
  //     msg_id: selectedItem?.msg_id
  //   },
  //   {
  //     skip: !selectedItem,
  //     enabled: !!selectedItem
  //   }
  // );

  const { data: detailData, error, isLoading } = useGetInnerScreenDataQuery(
    { page_id: selectedItem?.page_id, msg_id: selectedItem?.msg_id }
  );

  console.log("detail inner", JSON.stringify(detailData));


  useEffect(() => {
    if (detailData && detailData?.all?.page_id) {
      const page_id = detailData?.all?.page_id;
      console.log("ids-->>", page_id);

      if (page_id) {
        console.log("Navigating to screenDetails with:", { page_id, });
        navigation.navigate(ROUTES.screenDetails, { page_id, });
        setSelectedItem(null);
      } else {
        console.error("Missing page_id or msg_id in detailData:", detailData);
      }
    }
  }, [detailData, navigation]);

  const handlePressItem = (item) => {
    if (item?.page_id && item?.msg_id) {
      console.log("Setting selected item:", item);
      setSelectedItem(item); // Update state for API call if needed
      navigation.navigate(ROUTES.screenDetails, {
        page_id: item.page_id,
        msg_id: item.msg_id,
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
