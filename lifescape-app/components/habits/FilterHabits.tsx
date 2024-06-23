import { StyleSheet } from "react-native";
import React, { useEffect } from "react";

import { useHabitContext } from "@/context/HabitProvider";

import { Dropdown } from "react-native-element-dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const differentSortOptions = [
  {
    label: "Hardest",
    value: "hardest",
  },
  {
    label: "Easiest",
    value: "easiest",
  },
];

const FilterHabits = () => {
  const { habits, setHabits, sortBy, setSortBy } = useHabitContext();

useEffect(() => {
    if (sortBy === "hardest") {
        setHabits(
            [...habits].sort((a, b) => {
                return a.difficultyRank.localeCompare(b.difficultyRank);
            })
        );
    } else if (sortBy === "easiest") {
        setHabits(
            [...habits].sort((a, b) => {
                return b.difficultyRank.localeCompare(a.difficultyRank);
            })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [sortBy, setSortBy]);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      itemContainerStyle={styles.itemContainerStyle}
      iconStyle={styles.iconStyle}
      data={differentSortOptions}
      search={false}
      labelField="label"
      valueField="value"
      placeholder="Sort By..."
      value={sortBy}
      onChange={(item) => {
        setSortBy(item.value);
      }}
      renderLeftIcon={() => (
        <MaterialIcons name="sort" size={24} color="black" />
      )}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    margin: 2,
    width: 140,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    marginLeft: 5,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemContainerStyle: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
});

export default FilterHabits;
