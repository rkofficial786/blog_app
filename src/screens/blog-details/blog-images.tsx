import React from 'react';
import {Image, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

interface BlogImagesProps {
  images: string[];
  mainImage?: boolean;
}

const BlogImages: React.FC<BlogImagesProps> = ({images, mainImage = false}) => {
  if (mainImage) {
    return images[0] ? (
      <Image
        source={{uri: images[0]}}
        style={{width, height: width * 0.6}}
        resizeMode="cover"
      />
    ) : null;
  }

  return (
    <>
      {images.map((image, index) => (
        <Image
          key={index}
          source={{uri: image}}
          style={{width: width - 32, height: (width - 32) * 0.6}}
          className="rounded-xl mb-4"
          resizeMode="cover"
        />
      ))}
    </>
  );
};

export default BlogImages;