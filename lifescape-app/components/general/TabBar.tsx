import { View, TouchableOpacity, StyleSheet, Image } from "react-native";

import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

const TabBar = ({ state, descriptors, navigation }: TabBarProps) => {
  const icons: any = {
    home: (props: any) => (
      <View className="h-[80%]">
        <Image
          source={require("../../assets/images/tabicons/home.png")}
          resizeMode="contain"
          style={{ flex: 1, aspectRatio: 1 }}
        />
      </View>
    ),
    character: (props: any) => (
      <View className="h-[80%]">
        <Image
          source={require("../../assets/images/tabicons/inventory.png")}
          resizeMode="contain"
          style={{ flex: 1, aspectRatio: 1 }}
        />
      </View>
    ),
    play: (props: any) => (
      <View className="h-[110%]">
        <Image
          source={require("../../assets/images/tabicons/crossed_swords.png")}
          resizeMode="contain"
          style={{ flex: 1, aspectRatio: 1 }}
        />
      </View>
    ),
    market: (props: any) => (
      <FontAwesome5 name="store" size={24} color="white" {...props} />
    ),
    overview: (props: any) => (
      <MaterialCommunityIcons
        name="face-man-profile"
        size={24}
        color="white"
        {...props}
      />
    ),
  };

  return (
    <View style={styles.tabbar}>
      <View className="flex h-full w-[45%] flex-row items-center justify-around ">
        {state.routes.slice(0, 2).map((route: any, index: number) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={route.key}
              className={`flex max-w-[40%] items-center justify-center ${
                isFocused ? "bg-red-400" : ""
              } h-full `}
            >
              {icons[route.name]({ color: isFocused ? "red" : "white" })}
            </TouchableOpacity>
          );
        })}
      </View>

      {state.routes[2] && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={state.index === 2 ? { selected: true } : {}}
          accessibilityLabel={
            descriptors[state.routes[2].key].options.tabBarAccessibilityLabel
          }
          testID={descriptors[state.routes[2].key].options.tabBarTestID}
          onPress={() => {
            const event = navigation.emit({
              type: "tabPress",
              target: state.routes[2].key,
              canPreventDefault: true,
            });
            if (!(state.index === 2) && !event.defaultPrevented) {
              navigation.navigate(state.routes[2].name, state.routes[2].params);
            }
          }}
          onLongPress={() => {
            navigation.emit({
              type: "tabLongPress",
              target: state.routes[2].key,
            });
          }}
          style={{ transform: [{ translateX: -32 }] }}
          key={state.routes[2].key}
          className="absolute -top-7 left-1/2 flex h-[60px] min-w-[60px] items-center justify-center rounded-full "
        >
          {icons[state.routes[2].name]({
            color: state.index === 2 ? "red" : "white",
          })}
        </TouchableOpacity>
      )}
      <View className="flex h-full w-[45%] flex-row items-center justify-around">
        {state.routes.slice(3, 5).map((route: any, index: number) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index + 3;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={route.key}
              style={{ flex: 1 }}
              className={`flex max-w-[40%] items-center justify-center ${
                isFocused ? "bg-red-400" : ""
              } h-full `}
            >
              {icons[route.name]({ color: isFocused ? "red" : "white" })}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: 50,
    backgroundColor: "black",
    marginHorizontal: 20,
    borderRadius: 10,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
});

export default TabBar;
