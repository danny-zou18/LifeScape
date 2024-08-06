import React, { createContext, useContext, useState, ReactNode } from "react";

import { RewardsType } from "@/types/reward_type";

interface HomeContextTypes {
  currentShownRewards: RewardsType[];
  setCurrentShownRewards: React.Dispatch<React.SetStateAction<RewardsType[]>>;
  showReward: (reward: RewardsType) => void;
}

const defaultState = {
  currentShownRewards: [],
  setCurrentShownRewards: () => {},
  showReward: () => {},
};

const HomeContext = createContext<HomeContextTypes>(defaultState);
export const useHomeContext = () => useContext(HomeContext);

const HomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentShownRewards, setCurrentShownRewards] = useState<RewardsType[]>(
    defaultState.currentShownRewards,
  );

  const showReward = (reward: RewardsType) => {
    const id = Math.random(); // Generate a unique ID for each notification
    setCurrentShownRewards((prev) => [
      ...prev,
      {
        id,
        ...reward,
      },
    ]);
    // Remove the notification after it completes
    setTimeout(() => {
      setCurrentShownRewards((prev) =>
        prev.filter((reward) => reward.id !== id),
      );
    }, 2500); // Adjust the duration as needed
  };

  return (
    <HomeContext.Provider
      value={{ currentShownRewards, setCurrentShownRewards, showReward }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
