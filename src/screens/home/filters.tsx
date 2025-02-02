import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheetModal from '../../components/BottomSheet';
import Chip from '../../components/chip';

interface BlogFiltersProps {
  selectedExpertise: string;
  selectedLanguage: string;
  onExpertiseChange: (expertise: string) => void;
  onLanguageChange: (language: string) => void;
}

const FilterContent: React.FC<BlogFiltersProps> = ({
  selectedExpertise,
  selectedLanguage,
  onExpertiseChange,
  onLanguageChange,
}) => {
  const expertise = ['Technology', 'Design', 'Business', 'Lifestyle'];
  const languages = ['English', 'Hindi', 'Bengali'];

  return (
    <View className="p-4">
      <Text className="text-text-primary font-medium mb-3">Expertise</Text>
      <View className="flex-row flex-wrap mb-6">
        {expertise.map(exp => (
          <Chip
            key={exp}
            label={exp}
            active={selectedExpertise === exp}
            onPress={() => onExpertiseChange(exp)}
            onClear={
              selectedExpertise === exp
                ? () => onExpertiseChange('')
                : undefined
            }
          />
        ))}
      </View>

      <Text className="text-text-primary font-medium mb-3">Language</Text>
      <View className="flex-row flex-wrap">
        {languages.map(lang => (
          <Chip
            key={lang}
            label={lang}
            active={selectedLanguage === lang}
            onPress={() => onLanguageChange(lang)}
            onClear={
              selectedLanguage === lang ? () => onLanguageChange('') : undefined
            }
          />
        ))}
      </View>
    </View>
  );
};

const BlogFilters: React.FC<BlogFiltersProps> = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const {selectedExpertise, selectedLanguage} = props;
  const activeFiltersCount = [selectedExpertise, selectedLanguage].filter(
    Boolean,
  ).length;

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="flex-row relative size-14 items-center justify-center bg-background-secondary px-3 py-2 rounded-full">
        <MaterialCommunityIcons
          name="filter-variant"
          size={20}
          color="#64748B"
        />
        {activeFiltersCount > 0 && (
          <View className="bg-accent-primary w-5 h-5 rounded-full items-center justify-center absolute right-2 top-2">
            <Text className="text-white text-xs">{activeFiltersCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      <BottomSheetModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        title="Filter Blogs"
        height={400}>
        <FilterContent {...props} />
      </BottomSheetModal>
    </>
  );
};

export default BlogFilters;
