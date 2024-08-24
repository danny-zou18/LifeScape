import { View, Text, TouchableHighlight } from "react-native";
import React from "react";

import { DifficultyRank } from "@/types/db_types";

interface DifficultySelectionProps {
  difficulty: DifficultyRank;
  setDifficulty: React.Dispatch<React.SetStateAction<DifficultyRank>>;
}

const DifficultySelection: React.FC<DifficultySelectionProps> = ({
  difficulty,
  setDifficulty,
}) => {
  return (
    <View className="mt-4 w-[85%]">
      <Text className="text-md ml-2 pb-1 text-neutral-700">
        Difficulty Rank
      </Text>
      <View className="flex h-[50px] w-full flex-row justify-between rounded-lg bg-gray-400 p-1">
        <TouchableHighlight
          className={`flex w-[13.3%] items-center justify-center ${
            difficulty === DifficultyRank.F ? "bg-[#b93df2]" : "bg-[#e1abf740]"
          } rounded-md`}
          onPress={() => setDifficulty(DifficultyRank.F)}
          underlayColor="#b93df200"
        >
          <Text>F</Text>
        </TouchableHighlight>
        <TouchableHighlight
          className={`flex w-[13.3%] items-center justify-center ${
            difficulty === DifficultyRank.E ? "bg-[#b93df2]" : "bg-[#e1abf740]"
          } rounded-md`}
          onPress={() => setDifficulty(DifficultyRank.E)}
          underlayColor="#b93df200"
        >
          <Text>E</Text>
        </TouchableHighlight>
        <TouchableHighlight
          className={`flex w-[13.3%] items-center justify-center ${
            difficulty === DifficultyRank.D ? "bg-[#b93df2]" : "bg-[#e1abf740]"
          } rounded-md`}
          onPress={() => setDifficulty(DifficultyRank.D)}
          underlayColor="#b93df200"
        >
          <Text>D</Text>
        </TouchableHighlight>
        <TouchableHighlight
          className={`flex w-[13.3%] items-center justify-center ${
            difficulty === DifficultyRank.C ? "bg-[#b93df2]" : "bg-[#e1abf740]"
          } rounded-md`}
          onPress={() => setDifficulty(DifficultyRank.C)}
          underlayColor="#b93df200"
        >
          <Text>C</Text>
        </TouchableHighlight>
        <TouchableHighlight
          className={`flex w-[13.3%] items-center justify-center ${
            difficulty === DifficultyRank.B ? "bg-[#b93df2]" : "bg-[#e1abf740]"
          } rounded-md`}
          onPress={() => setDifficulty(DifficultyRank.B)}
          underlayColor="#b93df200"
        >
          <Text>B</Text>
        </TouchableHighlight>
        <TouchableHighlight
          className={`flex w-[13.3%] items-center justify-center ${
            difficulty === DifficultyRank.A ? "bg-[#b93df2]" : "bg-[#e1abf740]"
          } rounded-md`}
          onPress={() => setDifficulty(DifficultyRank.A)}
          underlayColor="#b93df200"
        >
          <Text>A</Text>
        </TouchableHighlight>
        <TouchableHighlight
          className={`flex w-[13.3%] items-center justify-center ${
            difficulty === DifficultyRank.S ? "bg-[#b93df2]" : "bg-[#e1abf740]"
          } rounded-md`}
          onPress={() => setDifficulty(DifficultyRank.S)}
          underlayColor="#b93df200"
        >
          <Text>S</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default DifficultySelection;
