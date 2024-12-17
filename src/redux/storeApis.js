import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://massyart.com/ringsignal/inv/api_data';

const forexSignalapi = createApi({
  reducerPath: 'forexSignalapi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getMarketData: builder.query({
      query: ({ type, time }) => `?type=${type}&time=${time}`,
  }),
}),
});

export const { useGetMarketDataQuery } = forexSignalapi;

export default forexSignalapi;
