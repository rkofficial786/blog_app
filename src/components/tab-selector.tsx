import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useColorScheme} from 'nativewind';

interface TabSelectorProps {
  tabs: string[];
  onTabChange?: (tab: string) => void;
}

const TabSelector = ({tabs, onTabChange}: TabSelectorProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const {colorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row py-2 ">
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          onPress={() => handleTabPress(tab)}
          className={`min-w-[100px] py-2 px-4 rounded-full mr-1 ${
            tab === activeTab
              ? 'bg-light-accent-primary dark:bg-dark-accent-primary'
              : 'bg-light-background-secondary border border-light-border-medium  dark:border-0 dark:bg-dark-background-secondary/50'
          }`}>
          <Text
            className={`text-center text-sm font-medium ${
              tab === activeTab
                ? 'text-white dark:text-white'
                : 'text-black dark:text-gray-400'
            }`}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default TabSelector;
