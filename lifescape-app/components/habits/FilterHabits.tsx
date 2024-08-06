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
  {
    label: "Oldest",
    value: "oldest",
  },
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Streak",
    value: "streak",
  },
  {
    label: "Qutting?",
    value: "quitting",
  },
];

const FilterHabits = () => {
  const { habits, setHabits, sortBy, setSortBy } = useHabitContext();

  useEffect(() => {
    if (sortBy === "hardest") {
      setHabits(
        [...habits].sort((a, b) => {
          return a.difficultyRank.localeCompare(b.difficultyRank);
        }),
      );
    } else if (sortBy === "easiest") {
      setHabits(
        [...habits].sort((a, b) => {
          return b.difficultyRank.localeCompare(a.difficultyRank);
        }),
      );
    } else if (sortBy === "oldest") {
      setHabits(
        [...habits].sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          } else if (a.createdAt) {
            return -1;
          } else if (b.createdAt) {
            return 1;
          } else {
            return 0;
          }
        }),
      );
    } else if (sortBy === "newest") {
      setHabits(
        [...habits].sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          } else if (b.createdAt) {
            return -1;
          } else if (a.createdAt) {
            return 1;
          } else {
            return 0;
          }
        }),
      );
    } else if (sortBy === "streak") {
      setHabits(
        [...habits].sort((a, b) => {
          return b.streak - a.streak;
        }),
      );
    } else if (sortBy === "quitting") {
      setHabits(
        [...habits].sort((a, b) => {
          return a.quitting === b.quitting ? 0 : a.quitting ? -1 : 1;
        }),
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
      maxHeight={150}
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
    width: 120,
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
