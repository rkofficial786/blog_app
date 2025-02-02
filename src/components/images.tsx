import React, {useState} from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  ViewToken,
  ViewabilityConfig,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import sizer from '../helpers/sizer';

interface PostImagesProps {
  images: string[];
}

interface ViewableItemsChanged {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

const PostImages: React.FC<PostImagesProps> = ({images}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  // Convert images array to ImageViewer format
  const imageUrls = images.map(url => ({url}));

  const renderImage = ({item, index}: {item: string; index: number}) => (
    <TouchableWithoutFeedback
      onPress={() => {
        setSelectedImageIndex(index);
        setIsFullscreen(true);
      }}>
      <View style={{width: screenWidth}}>
        <Image
          source={{uri: item}}
          style={{
            width: screenWidth,
            height: sizer.horizontalScale(256),
          }}
          resizeMode="cover"
        />
      </View>
    </TouchableWithoutFeedback>
  );

  const renderFullscreenImage = () => (
    <Modal visible={isFullscreen} transparent={true} statusBarTranslucent>
      <ImageViewer
        imageUrls={imageUrls}
        index={selectedImageIndex}
        onCancel={() => setIsFullscreen(false)}
        enableSwipeDown
        onSwipeDown={() => setIsFullscreen(false)}
        backgroundColor="black"
        renderIndicator={(currentIndex?: number, allSize?: number) => (
          <View className="absolute top-12 self-center bg-black px-3 py-1 rounded-full z-50">
            <Text className="text-14 text-white">
              {`${(currentIndex || 0) + 1}/${allSize}`}
            </Text>
          </View>
        )}
        renderHeader={() => (
          <SafeAreaView className="z-50">
            <TouchableWithoutFeedback onPress={() => setIsFullscreen(false)}>
              <View className="absolute right-5 top-8 w-10 h-10 items-center justify-center">
                <View className="w-6 h-6 items-center justify-center bg-black/0">
                  <View className="absolute w-6 h-0.5 bg-white rounded-sm transform rotate-45" />
                  <View className="absolute w-6 h-0.5 bg-white rounded-sm transform -rotate-45" />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        )}
        enablePreload
        saveToLocalByLongPress={false}
        menus={({ cancel }) => (<></>)}
      />
    </Modal>
  );

  const renderDot = (index: number) => (
    <View
      key={index}
      style={{borderRadius: sizer.horizontalScale(100)}}
      className={`h-2 w-2 mx-0.5 ${
        activeIndex === index
          ? 'bg-light-accent-primary dark:bg-dark-accent-primary'
          : 'bg-white'
      }`}
    />
  );

  const onViewableItemsChanged = ({viewableItems}: ViewableItemsChanged) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  };

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  if (!images || images.length === 0) return null;

  return (
    <View className="mb-3">
      <FlatList
        data={images}
        renderItem={renderImage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={screenWidth}
        decelerationRate="fast"
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        keyExtractor={(_, index) => `image-${index}`}
      />

      {images.length > 1 && (
        <View className="flex-row justify-center items-center absolute bottom-2 w-full">
          {images.map((_, index) => renderDot(index))}
        </View>
      )}

      {renderFullscreenImage()}
    </View>
  );
};

export default PostImages;
