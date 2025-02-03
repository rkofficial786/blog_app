import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {User} from '../../types/blogs';

interface BloggerCardProps {
  blogger: User;
  renderMarkerImage: (blogger: User) => React.ReactNode;
}

export const BloggerCard: React.FC<BloggerCardProps> = ({
  blogger,
  renderMarkerImage,
}) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
      }}
      onPress={() => navigation.navigate('Profile', {authorId: blogger.id})}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {renderMarkerImage(blogger)}
        <View style={{marginLeft: 12, flex: 1}}>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#1F2937'}}>
            {blogger.name}
          </Text>
          <Text style={{fontSize: 14, color: '#64748B', marginTop: 2}}>
            {blogger.location?.city}, {blogger.location?.state}
          </Text>
        </View>
      </View>

      <Text
        style={{fontSize: 14, color: '#4B5563', marginTop: 8, marginBottom: 12}}
        numberOfLines={2}>
        {blogger.bio}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginBottom: 12}}>
        {blogger?.expertise?.map((skill, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#F3F4F6',
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 16,
              marginRight: 8,
            }}>
            <Text style={{fontSize: 12, color: '#4B5563'}}>{skill}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MaterialCommunityIcons
          name="account-group"
          size={16}
          color="#64748B"
        />
        <Text style={{fontSize: 12, color: '#64748B', marginLeft: 4}}>
          {blogger?.followersCount?.toLocaleString()} followers
        </Text>
      </View>
    </TouchableOpacity>
  );
};
