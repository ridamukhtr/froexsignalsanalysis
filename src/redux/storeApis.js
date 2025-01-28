// import packages
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://massyart.com/ringsignal/inv';
const TAG_TYPES = { marketData: 'marketData', innerScreenData: 'innerScreenData', detailsAdvanceReport: 'detailsAdvanceReport' };
const forexSignalapi = createApi({
	reducerPath: 'forexSignalapi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	tagTypes: [TAG_TYPES.marketData, TAG_TYPES?.innerScreenData, TAG_TYPES?.detailsAdvanceReport],
	endpoints: builder => ({
		getMarketData: builder.query({
			query: ({ type, time }) => `/api_data?type=${type}&time=${time}`,
			providesTags: () => [TAG_TYPES.marketData]
		}),
		getInnerScreenData: builder.query({
			query: ({ page_id, msg_id, }) => `/api_data?id=${page_id}&msg_id=${msg_id}`,
			providesTags: () => [TAG_TYPES.innerScreenData]
		}),
		getDetailsAdvanceReport: builder.query({
			query: ({ msg_id, period, type }) =>
				`/app_details_pp?msg_id=${msg_id}&period=${period}&type=${type}`,
			providesTags: () => [TAG_TYPES.detailsAdvanceReport],
		}),

	})
});

export const { useGetMarketDataQuery, useGetInnerScreenDataQuery, useGetDetailsAdvanceReportQuery, } = forexSignalapi;

export default forexSignalapi;
