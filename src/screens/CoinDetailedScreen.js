import React, { useState, useEffect } from "react";
import { Text, HStack, Switch, VStack, ScrollView, useColorMode } from "native-base"
import { ActivityIndicator, Dimensions } from "react-native"
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import { useSelector, useDispatch } from "react-redux";

import CoinDetailedHeader from "../components/CoinDetailedHeader";
import FilterComponent from "../components/FilterComponent"
// import {
//   //getDetailedCoinData,
//   getCoinMarketChart,
//   getCandleChartData,
// } from "../api";
import { getDetailedCoinAsync, getCoinMarketChartAsync, getCandleChartAsync } from "../redux/contentSlice";
import { selelectDetailedCoinData, selectCoinMarketChart, selectCandleChartData } from "../redux/contentSlice";
import { selectSelectedRange, setSelectedRange } from '../redux/selectedRangeSlice'
import { selectLoading, setLoading } from "../redux/loadingSlice";

const chartColor = "#16c784";
const screenWidth = Dimensions.get("window").width * 0.8;

const CoinDetailedScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const selectedRange = useSelector(selectSelectedRange);
  const detailedCoinData = useSelector(selelectDetailedCoinData);
  const coinMarketChart = useSelector(selectCoinMarketChart);
  const candleChartData = useSelector(selectCandleChartData);
  const loading = useSelector(selectLoading);
  const { coinId } = route.params;
  
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getDetailedCoinAsync(coinId));
    dispatch(getCoinMarketChartAsync({id: coinId, range: selectedRange}));
    dispatch(getCandleChartAsync({id: coinId, range: selectedRange}));
    dispatch(setLoading(false));
  }, [])

  //const [coin, setCoin] = useState(null);
  //const [coinMarketData, setCoinMarketData] = useState([]);
  //const [coinCandleChartData, setCoinCandleChartData] = useState([]);
  //const [loading, setLoading] = useState(false);
  //const [selectedRange, setSelectedRange] = useState("1");
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);
  //const { coinId } = route.params;
  const { colorMode } = useColorMode();

  // const fetchCoinData = async () => {
  //   const fetchedCoinData = await getDetailedCoinData(coinId);
  //   setCoin(fetchedCoinData);
  // };

  // const fetchMarketCoinData = async (selectedRangeValue) => {
  //   const fetchedCoinMarketData = await getCoinMarketChart(
  //     coinId,
  //     selectedRangeValue
  //   );
  //   setCoinMarketData(fetchedCoinMarketData);
  // };

  // const fetchCandleStickChartData = async (selectedRangeValue) => {
  //   const fetchedSelectedCandleChartData = await getCandleChartData(
  //     coinId,
  //     selectedRangeValue
  //   );
  //   setCoinCandleChartData(fetchedSelectedCandleChartData);
  // };

  const onSelectedRangeChange = (selectedRangeValue) => {
    dispatch(setSelectedRange(selectedRangeValue))
    dispatch(getCandleChartAsync({id: coinId, range: selectedRange}))
    dispatch(getCoinMarketChartAsync({id: coinId, range: selectedRange}))
    
    //getCoinMarketChartAsync(selectedRangeValue);
    //getCandleChartAsync(selectedRangeValue);
    //fetchMarketCoinData(selectedRangeValue);
    //fetchCandleStickChartData(selectedRangeValue);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   // fetchCoinData();
  //   // fetchMarketCoinData(1);
  //   // fetchCandleStickChartData(1);
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    if (detailedCoinData != null) {
      navigation.setOptions({
        headerTitle: () => {
          return (
            <CoinDetailedHeader
              coinId={detailedCoinData.id}
              image={detailedCoinData.image.small}
              symbol={detailedCoinData.symbol}
              marketCapRank={detailedCoinData.market_data.market_cap_rank}
            />
          )
        },
      });
    }
  }, [detailedCoinData])
  //console.log(coinMarketChart);
  
  let line_data = [];
  coinMarketChart.prices?.map(([timestamp, value]) => line_data.push({ timestamp, value }));

  let candle_data = [];
  candleChartData?.map(([timestamp, open, high, low, close]) => candle_data.push({ timestamp, open, high, low, close }));

  return (
    
    loading
      ? <ActivityIndicator size="large" />
      : (
        <ScrollView>
          
          <VStack flex={1} alignItems="center" mt={20}>
            <FilterComponent
              selectedRange={selectedRange}
              setSelectedRange={onSelectedRangeChange}
            />

            <HStack space={8} alignItems="center" mb={12} >
              <Text fontSize="lg">
                {!isCandleChartVisible ? "Line Chart" : "Candle Chart"}
              </Text>
              <Switch
                size="sm"
                colorScheme="emerald"
                name="line Mode"
                isChecked={!isCandleChartVisible}
                onToggle={() => setIsCandleChartVisible(!isCandleChartVisible)}
                accessibilityLabel="line-mode"
                accessibilityHint="line or candle"
              />
            </HStack>
            {
              !isCandleChartVisible
                ? (
                  
                  <LineChart.Provider data={line_data} >
                    <LineChart height={screenWidth / 2} width={screenWidth}>
                      <LineChart.Path color={chartColor}>
                        <LineChart.Gradient color={colorMode === "dark" ? "white" : "black"} />
                      </LineChart.Path>
                      <LineChart.CursorCrosshair color={chartColor}>
                        <LineChart.Tooltip />
                        <LineChart.Tooltip position="bottom">
                          <LineChart.DatetimeText />
                        </LineChart.Tooltip>
                      </LineChart.CursorCrosshair>
                    </LineChart>
                  </LineChart.Provider>
                )
                : (
                  <CandlestickChart.Provider data={candle_data} >
                    <CandlestickChart height={screenWidth / 2} width={screenWidth}>
                      <CandlestickChart.Candles />
                      <CandlestickChart.Crosshair>
                        <CandlestickChart.Tooltip />
                      </CandlestickChart.Crosshair>
                    </CandlestickChart>
                    <CandlestickChart.DatetimeText
                      style={{ color: "white", fontWeight: "600", margin: 10 }}
                    />
                  </CandlestickChart.Provider>
                )
            }

          </VStack>
        </ScrollView>
      )
  );
}

export default CoinDetailedScreen;