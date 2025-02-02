import React, {useState} from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/button';

const RoleCard = ({
  title,
  description,
  iconName,
  isSelected,
  onSelect,
}: any) => (
  <Pressable
    onPress={onSelect}
    className={`p-6 rounded-xl mb-4 border-2 ${
      isSelected
        ? 'border-accent-primary bg-background-secondary'
        : 'border-border-light'
    }`}>
    <View className="flex-row items-center mb-4">
      <View
        className={`p-3 rounded-full ${
          isSelected ? 'bg-accent-primary' : 'bg-background-tertiary'
        }`}>
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={isSelected ? '#FFFFFF' : '#64748B'}
        />
      </View>
      <Text className="text-xl font-semibold text-text-primary ml-4">
        {title}
      </Text>
    </View>
    <Text className="text-text-secondary">{description}</Text>
  </Pressable>
);

const RoleSelectionScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'blogger',
      title: 'Blog Poster',
      description:
        'Share your thoughts and stories with the world. Create engaging content and build your audience.',
      iconName: 'pencil-plus-outline',
    },
    {
      id: 'subscriber',
      title: 'Blog Viewer',
      description:
        'Discover amazing content from talented writers. Connect and engage with your favorite bloggers.',
      iconName: 'book-open-page-variant-outline',
    },
  ];

  return (
    <View className="flex-1 bg-background-primary">
      {/* Header */}
      <View className="p-6">
        <Text className="text-2xl font-bold text-text-primary">
          Choose your role
        </Text>
        <Text className="text-base text-text-secondary mt-2">
          Select how you want to use BlogMingle
        </Text>
      </View>

      {/* Role Cards */}
      <ScrollView className="flex-1 px-6">
        {roles.map(role => (
          <RoleCard
            key={role.id}
            title={role.title}
            description={role.description}
            iconName={role.iconName}
            isSelected={selectedRole === role.id}
            onSelect={() => setSelectedRole(role.id)}
          />
        ))}
      </ScrollView>

      {/* Action Button */}
      <View className="p-6">
        <Button
          onPress={() => navigation.navigate('Register', {role: selectedRole})}
          disabled={!selectedRole}
          className="w-full"
          icon={
            <MaterialCommunityIcons
              name="arrow-right"
              size={20}
              color="#FFFFFF"
            />
          }>
          Continue
        </Button>
      </View>
    </View>
  );
};

export default RoleSelectionScreen;
