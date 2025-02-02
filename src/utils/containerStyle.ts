import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import {useSelector} from 'react-redux';

export const container = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: COLORS.backgroundThird,
  },
});
