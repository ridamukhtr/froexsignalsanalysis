// import packages
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://massyart.com/ringsignal/inv';
const TAG_TYPES = { marketData: 'marketData', innerScreenData: 'innerScreenData', detailsReport: 'detailsReport' };
const forexSignalapi = createApi({
	reducerPath: 'forexSignalapi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	tagTypes: [TAG_TYPES.marketData, TAG_TYPES?.innerScreenData, TAG_TYPES?.detailsReport],
	endpoints: builder => ({
		getMarketData: builder.query({
			query: ({ type, time }) => `/api_data?type=${type}&time=${time}`,
			providesTags: () => [TAG_TYPES.marketData]
		}),
		getInnerScreenData: builder.query({
			query: ({ id, msg_id }) => `/api_data?id=${id}&msg_id=${msg_id}`,
			providesTags: () => [TAG_TYPES.innerScreenData]
		}),
		getDetailsAdvanceReport: builder.query({
			query: msg_id => `/app_details_pp?msg_id=${msg_id}`,
			providesTags: () => [TAG_TYPES.detailsReport]
		}),
		fetchData: builder.query({
			query: id => `api_data?id=${id}`
		})
	})
});

export const { useGetMarketDataQuery, useGetInnerScreenDataQuery, useGetDetailsAdvanceReportQuery, useFetchDataQuery } = forexSignalapi;

export default forexSignalapi;
