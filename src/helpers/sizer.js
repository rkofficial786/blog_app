import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 430;
const guidelineBaseHeight = 932;

const horizontalScale = size => {
  return Math.ceil((width / guidelineBaseWidth) * size);
};

const verticalScale = size => {
  return Math.ceil((height / guidelineBaseHeight) * size);
};

const moderateScale = (size, factor = 1) => {
  return Math.ceil(size + (horizontalScale(size) - size) * factor);
};

const moderateVerticalScale = (size, factor = 1) => {
  return Math.ceil(size + (verticalScale(size) - size) * factor);
};

const fontScale = size => {
  return (width / guidelineBaseWidth) * size;
};

const lineHeight = size => {
  return (width / guidelineBaseWidth) * size * 1.25;
};

export default {
  fontScale,
  moderateScale,
  moderateVerticalScale,
  horizontalScale,
  verticalScale,
  lineHeight,
};
