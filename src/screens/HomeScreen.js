import React, { useEffect, useState } from "react";
import { FlatList, HStack, VStack, Text } from "native-base";
import CoinItem from "../components/CoinItem";
//import { getMarketData } from "../api";
import { getMarketAsync } from "../redux/contentSlice";
import { selectMarketData } from "../redux/contentSlice";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const marketData = useSelector(selectMarketData);
  
  useEffect(() => {
    dispatch(getMarketAsync());
  }, [])
  //
  // const [coins, setCoins] = useState([]);

  // const fetchCoins = async (pageNumber) => {
  //   const coinsData = await getMarketData(pageNumber);
  //   setCoins(coinsData);
  // };

  // useEffect(() => {
  //   fetchCoins(1);
  // }, []);

  return (
    <VStack flex={1} mx={2}>
      <HStack justifyContent="space-between" >
        <Text fontSize={25} alignSelf="center">Cryptoassets</Text>
        <Text fontSize={12} alignSelf="center">Powered by CoinGecko</Text>
      </HStack>
      <FlatList
        data={marketData}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        keyExtractor={(item) => item.market_cap_rank}
      />
    </VStack>
  );
};

export default HomeScreen;
