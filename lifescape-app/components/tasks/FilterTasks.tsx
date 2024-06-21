import { StyleSheet } from "react-native";
import React, { useEffect } from "react";

import { useTaskContext } from "@/context/TaskProvider";

import { Dropdown } from "react-native-element-dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const differentSortOptions = [
  {
    label: "Due Date",
    value: "dueDate",
  },
  {
    label: "Difficulty",
    value: "difficulty",
  }
];
const FilterTasks = () => {
  const { tasks, setTasks, sortBy, setSortBy } = useTaskContext();

  useEffect(() => {
    if (sortBy === "dueDate") {
      setTasks(
        [...tasks].sort((a, b) => {
          if (a.dueDate && b.dueDate) {
            console.log(a.dueDate, b.dueDate);
            return (new Date(a.dueDate)).getTime() - (new Date(b.dueDate)).getTime();
          } else if (a.dueDate) {
            return -1;
          } else if (b.dueDate) {
            return 1;
          } else {
            return 0;
          }
        })
      );
    } else if (sortBy === "difficulty") {
      setTasks(
        [...tasks].sort((a, b) => {
          return Number(a.difficultyRank) - Number(b.difficultyRank);
        })
      );
    }
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
        maxHeight={110}
        value={sortBy}
        onChange={item => {
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
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    marginLeft: 5,
    color: 'gray',
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
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  }

});



export default FilterTasks;
