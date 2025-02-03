import React from 'react';
import {
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import MapView, {Marker, Region, Callout} from 'react-native-maps';
import {User} from '../../types/blogs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

interface BloggerMapProps {
  bloggers: User[];
  region: Region | null;
  selectedBlogger: string | null;
  mapRef: React.RefObject<MapView>;
  renderMarkerImage: (blogger: User) => React.ReactNode;
  onMarkerPress: (bloggerId: string) => void;
}

const MapMarker: React.FC<BloggerMapProps> = ({
  bloggers,
  region,
  selectedBlogger,
  mapRef,
  onMarkerPress,
}) => {
  const navigation = useNavigation<any>();

  if (!region) return null;

  return (
    <MapView
      ref={mapRef}
      initialRegion={region}
      style={{height: 500}}
      showsUserLocation
      showsMyLocationButton
      mapType={Platform.select({ios: 'standard', android: 'standard'})}>
      {bloggers.map(blogger => (
        <Marker
          key={blogger.id}
          coordinate={{
            latitude: blogger.location?.latitude ?? 0,
            longitude: blogger.location?.longitude ?? 0,
          }}
          onPress={() => navigation.navigate('Profile', {authorId: blogger.id})}
          style={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <View
              className="!w-20 rounded-full"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 24,
                padding: 2,
                borderWidth: 2,
                borderColor:
                  selectedBlogger === blogger.id ? '#10B981' : '#3B82F6',
              }}>
              <Pressable
                onPress={() =>
                  navigation.navigate('Profile', {authorId: blogger.id})
                }
                className="!w-20 rounded-full">
                <Image
                  source={{uri: blogger.profileImage}}
                  style={{width: 30, height: 30, borderRadius: 20}}
                />
              </Pressable>
            </View>
            <View
              style={{
                backgroundColor:
                  selectedBlogger === blogger.id ? '#10B981' : '#3B82F6',
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: 2,
                marginTop: 4,
              }}>
              <Text style={{color: '#FFFFFF', fontSize: 12, fontWeight: '500'}}>
                {blogger?.location?.city}
              </Text>
            </View>
          </View>

          <Callout
            tooltip
            onPress={() =>
              navigation.navigate('Profile', {authorId: blogger.id})
            }>
            <View
              className="bg-background-primary p-4 rounded-xl"
              style={{
                width: 280,
                height: 400,
                ...Platform.select({
                  ios: {
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                  },
                  android: {
                    elevation: 4,
                  },
                }),
              }}>
              <View className="flex-row items-center mb-3">
                <Image
                  source={{uri: blogger.profileImage}}
                  className="w-12 h-12 rounded-full"
                />
                <View className="ml-3 flex-1">
                  <Text className="text-text-primary text-base font-semibold">
                    {blogger.name}
                  </Text>
                  <Text className="text-text-secondary text-sm">
                    {blogger?.location?.city}, {blogger?.location?.state}
                  </Text>
                </View>
              </View>

              {blogger.bio && (
                <Text
                  className="text-text-secondary text-sm mb-3 leading-5"
                  numberOfLines={2}>
                  {blogger.bio}
                </Text>
              )}

              <View className="flex-row items-center mb-3">
                <MaterialCommunityIcons
                  name="account-group"
                  size={16}
                  color="#64748B"
                />
                <Text className="text-text-secondary text-sm ml-1">
                  {blogger.followersCount?.toLocaleString() || 0} followers
                </Text>
              </View>

              {blogger.expertise && blogger.expertise.length > 0 && (
                <View className="flex-row flex-wrap gap-2 mb-3">
                  {blogger.expertise.slice(0, 3).map((skill, index) => (
                    <View
                      key={index}
                      className="bg-background-secondary px-3 py-1 rounded-full">
                      <Text className="text-text-secondary text-xs">
                        {skill}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <TouchableOpacity
                className="bg-accent-primary py-2 px-4 rounded-lg items-center"
                onPress={() =>
                  navigation.navigate('Profile', {authorId: blogger.id})
                }>
                <Text className="text-background-primary text-sm font-medium">
                  View Full Profile
                </Text>
              </TouchableOpacity>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

export default MapMarker;
