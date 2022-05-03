import axios from "axios";

export const getMarketData = async (pageNumber = 1) => {
  return await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`)
  // try {
  //   const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`)
  //   return response.data;
  // } catch (e) {
  //   console.log(e)
  // }
}

export const getDetailedCoinData = async (coinId) => {
  return await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`)
  // try {
  //   const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`)
  //   return response.data;
  // } catch (e) {
  //   console.log(e);
  // }
}

export const getCoinMarketChart = async (coinId, selectedRange) => {
  return await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectedRange}&interval=hourly`)
  // try {
  //   const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectedRange}&interval=hourly`)
  //   return response.data;
  // } catch (e) {
  //   console.log(e)
  // }
}

export const getCandleChartData = async (coinId, days = 1) => {
  return await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`);
  // try {
  //   const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`)
  //   return response.data;
  // } catch (e) {
  //   console.log(e);
  // }
}

