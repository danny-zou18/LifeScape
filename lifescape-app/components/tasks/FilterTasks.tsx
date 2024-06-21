import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

import { useTaskContext } from "@/context/TaskProvider";

import { Dropdown } from "react-native-element-dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const differentSortOptions = [
  {
    label: "Due Date",
    value: "dueDate",
  },
];

const FilterTasks = () => {
  const { tasks, setTasks } = useTaskContext();
  const [sortBy, setSortBy] = useState<string>("");

  useEffect(() => {
    if (sortBy === "dueDate") {
      setTasks(
        [...tasks].sort((a, b) => {
          if (a.dueDate && b.dueDate) {
            return a.dueDate.getTime() - b.dueDate.getTime();
          } else if (a.dueDate) {
            return -1;
          } else if (b.dueDate) {
            return 1;
          } else {
            return 0;
          }
        })
      );
    }
  }, [sortBy]);

  return (
    <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={differentSortOptions}
        search={false}
        maxHeight={50}
        labelField="label"
        valueField="value"
        placeholder="Sort By..."
        searchPlaceholder="Search..."
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
    height: 30,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    marginLeft: 5,
    textDecorationColor: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});



export default FilterTasks;
