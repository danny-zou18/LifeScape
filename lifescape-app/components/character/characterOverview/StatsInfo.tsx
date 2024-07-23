import { View, Text, Image } from "react-native";
import React, { useMemo, ReactNode } from "react";
import { calculatePercentage } from "@/functions";

import { useGlobalContext } from "@/context/GlobalProvider";

const StatsInfo = () => {
  const { userCharacter } = useGlobalContext();
  return (
    <View className="mt-6">
      <Text className="ml-2">Stats</Text>
      <View className="mt-1 rounded-md border-[1px] px-2">
        <IndividualStat
          stat="Strength"
          value={userCharacter?.Strength ?? 0}
          currentXp={userCharacter?.strengthXp ?? 0}
          icon={
            <View className="h-[100%] w-[30%]">
              <Image
                source={require("../../../assets/images/rewardicons/strength.png")}
                resizeMode="contain"
                style={{ flex: 1, aspectRatio: 1 }}
              />
            </View>
          }
        />
        <IndividualStat
          stat="Defense"
          value={userCharacter?.Defense ?? 0}
          currentXp={userCharacter?.defenseXp ?? 0}
          icon={
            <View className="h-[100%] w-[30%]">
              <Image
                source={require("../../../assets/images/rewardicons/defense.png")}
                resizeMode="contain"
                style={{ flex: 1, aspectRatio: 1 }}
              />
            </View>
          }
        />
        <IndividualStat
          stat="Agility"
          value={userCharacter?.Agility ?? 0}
          currentXp={userCharacter?.agilityXp ?? 0}
          icon={
            <View className="h-[100%] w-[30%]">
              <Image
                source={require("../../../assets/images/rewardicons/agility.png")}
                resizeMode="contain"
                style={{ flex: 1, aspectRatio: 1 }}
              />
            </View>
          }
        />
        <IndividualStat
          stat="Vitality"
          value={userCharacter?.Vitality ?? 0}
          currentXp={userCharacter?.vitalityXp ?? 0}
          icon={
            <View className="h-[100%] w-[30%]">
              <Image
                source={require("../../../assets/images/rewardicons/vitality.png")}
                resizeMode="contain"
                style={{ flex: 1, aspectRatio: 1 }}
              />
            </View>
          }
        />
        <IndividualStat
          stat="Endurance"
          value={userCharacter?.Endurance ?? 0}
          currentXp={userCharacter?.enduranceXp ?? 0}
          icon={
            <View className="h-[100%] w-[30%]">
              <Image
                source={require("../../../assets/images/rewardicons/endurance.png")}
                resizeMode="contain"
                style={{ flex: 1, aspectRatio: 1 }}
              />
            </View>
          }
        />
        <IndividualStat
          stat="Will"
          value={userCharacter?.Will ?? 0}
          currentXp={userCharacter?.willXp ?? 0}
          icon={
            <View className="h-[100%] w-[30%]">
              <Image
                source={require("../../../assets/images/rewardicons/will.png")}
                resizeMode="contain"
                style={{ flex: 1, aspectRatio: 1 }}
              />
            </View>
          }
          style="border-b-0"
        />
      </View>
    </View>
  );
};

interface IndividualStatProps {
  stat: string;
  value: number;
  currentXp: number;
  style?: string;
  icon?: ReactNode;
}

const IndividualStat: React.FC<IndividualStatProps> = ({
  stat,
  value,
  currentXp,
  style,
  icon,
}) => {
  const percentage = useMemo(() => {
    let next_level = Math.round((0.21 * value + 1) * 100) / 100;
    return calculatePercentage(currentXp, next_level);
  }, [currentXp, value]);
  return (
    <View
      className={`flex flex-row items-center justify-between border-b-[1px] py-2 ${style}`}
    >
      <View className="flex w-[25%] flex-col items-center">
        <Text className="font-[500]">{stat}</Text>
        <View className="flex flex-row justify-between">
          {icon}
          <Text>{value}</Text>
        </View>
      </View>
      <View className="flex w-[70%] flex-col items-end">
        <View className="flex h-2 w-full flex-row bg-transparent">
          <View className="min-w-[100%] overflow-hidden rounded-full bg-[#00000090]">
            <View
              style={{ width: percentage }}
              className={`flex h-full items-center justify-center rounded-l-full rounded-r-lg bg-green-400`}
            ></View>
          </View>
        </View>
        <Text className="mr-1">
          {currentXp} / {Math.round((0.21 * value + 1) * 100) / 100}
        </Text>
      </View>
    </View>
  );
};

export default StatsInfo;
