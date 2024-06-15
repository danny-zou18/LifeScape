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
      <Text className="ml-2 text-md text-neutral-700 pb-1">
        Difficulty Rank
      </Text>
      <View className="flex flex-row justify-between p-1 bg-gray-400 rounded-lg h-[50px] w-full">
        <TouchableHighlight
          className={`flex items-center justify-center w-[13.3%] bg-${
            difficulty === DifficultyRank.F ? "[#b93df2]" : "[#e1abf740]"
          } rounded-md`}
          onPress={() => setDifficulty(DifficultyRank.F)}
          underlayColor="#b93df200"
        >
          <Text>F</Text>
        </TouchableHighlight>
        <TouchableHighlight
          className={`flex items-center justify-center w-[13.3%] bg-${
            difficulty === DifficultyRank.E ? "[#b93df2]" : "[#e1abf740]"
          } rounded-md`}
          onPress={() => setDifficulty(DifficultyRank.E)}
          underlayColor="#b93df200"
        >
          <Text>E</Text>
        </TouchableHighlight>
        <TouchableHighlight
          className={`flex items-center justify-center w-[13.3%] bg-${
            difficulty === DifficultyRank.D ? "[#b93df2]" : "[#e1abf740]"
          } rounded-md`}
          onPress={() => setDifficulty(DifficultyRank.D)}
          underlayColor="#b93df200"
        >
          <Text>D</Text>
        </TouchableHighlight>
        <TouchableHighlight
          className={`flex items-center justify-center w-[13.3%] bg-${
            difficulty === DifficultyRank.C ? "[#b93df2]" : "[#e1abf740]"
          } rounded-md`}
          onPress={() => setDifficulty(DifficultyRank.C)}
          underlayColor="#b93df200"
        >
          <Text>C</Text>
        </TouchableHighlight>
        <TouchableHighlight
          className={`flex items-center justify-center w-[13.3%] bg-${
            difficulty === DifficultyRank.B ? "[#b93df2]" : "[#e1abf740]"
          } rounded-md`}
          onPress={() => setDifficulty(DifficultyRank.B)}
          underlayColor="#b93df200"
        >
          <Text>B</Text>
        </TouchableHighlight>
        <TouchableHighlight
          className={`flex items-center justify-center w-[13.3%] bg-${
            difficulty === DifficultyRank.A ? "[#b93df2]" : "[#e1abf740]"
          } rounded-md`}
          onPress={() => setDifficulty(DifficultyRank.A)}
          underlayColor="#b93df200"
        >
          <Text>A</Text>
        </TouchableHighlight>
        <TouchableHighlight
          className={`flex items-center justify-center w-[13.3%] bg-${
            difficulty === DifficultyRank.S ? "[#b93df2]" : "[#e1abf740]"
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
