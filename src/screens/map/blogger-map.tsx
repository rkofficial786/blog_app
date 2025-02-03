import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BloggerCard} from './bloggers-list';
import MapMarker from './map-marker';
import { User } from '../../types/blogs';

const BloggersMap = ({bloggers}:any) => {
  const mapRef = useRef<MapView>(null);
  const [selectedBlogger, setSelectedBlogger] = useState<string | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (bloggers.length > 0) {
      const coordinates = bloggers.map((blogger:User) => ({
        latitude: blogger.location?.latitude,
        longitude: blogger.location?.longitude,
      }));

      const minLat = Math.min(...coordinates.map((c:any) => c.latitude));
      const maxLat = Math.max(...coordinates.map((c:any)  => c.latitude));
      const minLng = Math.min(...coordinates.map((c:any)  => c.longitude));
      const maxLng = Math.max(...coordinates.map((c:any)  => c.longitude));

      const initialRegion = {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: Math.max((maxLat - minLat) * 1.5, 0.5),
        longitudeDelta: Math.max((maxLng - minLng) * 1.5, 0.5),
      };

      setRegion(initialRegion);
      setTimeout(() => {
        mapRef.current?.animateToRegion(initialRegion, 1000);
      }, 500);
    }
  }, [bloggers]);

  const handleImageError = (bloggerId: string) => {
    setFailedImages(prev => new Set([...prev, bloggerId]));
  };

  const renderMarkerImage = (blogger: User) => {
    if (failedImages.has(blogger.id)) {
      return (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#F3F4F6',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons name="account" size={24} color="#64748B" />
        </View>
      );
    }

    return (
      <Image
        source={{uri: blogger.profileImage}}
        style={{width: 40, height: 40, borderRadius: 20}}
        onError={() => handleImageError(blogger.id)}
      />
    );
  };

  const handleMarkerPress = (bloggerId: string) => {
    setSelectedBlogger(bloggerId);
    const blogger = bloggers.find((b:any)  => b.id === bloggerId);

    if (blogger && mapRef.current) {
      const newRegion = {
        latitude: blogger.location.latitude,
        longitude: blogger.location.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };

      mapRef.current.animateToRegion(newRegion, 500);
    }
  };

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 20}}>
      <MapMarker
        bloggers={bloggers}
        region={region}
        selectedBlogger={selectedBlogger}
        mapRef={mapRef}
        renderMarkerImage={renderMarkerImage}
        onMarkerPress={handleMarkerPress}
      />

      <View style={{padding: 16}}>
        <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 16}}>
          {bloggers.length} Bloggers across India
        </Text>

        <FlatList
          data={bloggers}
          renderItem={({item}) => (
            <BloggerCard blogger={item} renderMarkerImage={renderMarkerImage} />
          )}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default BloggersMap;
