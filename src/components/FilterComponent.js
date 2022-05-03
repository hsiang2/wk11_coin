import React, { memo } from "react";
import { HStack, Text, Pressable, useColorMode } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedRange, setSelectedRange } from "../redux/selectedRangeSlice";
import { getCoinMarketChartAsync, getCandleChartAsync} from "../redux/contentSlice";

const filterDaysArray = [
  { filterDay: "1", filterText: "24h" },
  { filterDay: "7", filterText: "7d" },
  { filterDay: "30", filterText: "30d" },
  { filterDay: "365", filterText: "1y" },
  { filterDay: "max", filterText: "All" },
];

const FilterComponent = (props) => {
  //const dispatch = useDispatch();
  //const selectedRange = useSelector(selectSelectedRange);
  const { selectedRange, setSelectedRange } = props;
  const { colorMode } = useColorMode();
  const isFilterSelected = (filter) => filter === selectedRange;
  const filteredColor = colorMode === "dark" ? "#1e1e1e" : '#0e7490';
  const unFilteredColor = "transparent";

  return (
    <HStack
      justifyContent={"space-around"}
      bg={colorMode === "dark" ? "#2B2B2B" : "lightgray"}
      py="1"
      borderRadius="md"
      my="2"
      mb="3"
      w="80%"
    >
      {filterDaysArray.map((day) => {
        const isFilterSelectedDay = isFilterSelected(day.filterDay);
        return (
          <Pressable
            px="2"
            py="1"
            borderRadius="md"
            bg={isFilterSelectedDay ? filteredColor : unFilteredColor}
            key={day.filterText}
            onPress={() => {setSelectedRange(day.filterDay)
                // dispatch(setSelectedRange(day.filterDay))
                // dispatch(getCandleChartAsync(day.filterDay))
                // dispatch(getCoinMarketChartAsync(day.filterDay))
                
              }
            }
          >
            <Text
              color={isFilterSelectedDay
                ? "white"
                : colorMode === "dark" ? "lightgray" : "black"}
            >
              {day.filterText}
            </Text>
          </Pressable>)
      }
      )}
    </HStack>

  );
};

export default memo(FilterComponent);
