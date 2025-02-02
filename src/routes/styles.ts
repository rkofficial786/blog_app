import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import sizer from '../helpers/sizer';

export const styles = StyleSheet.create({
  tab_bar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: sizer.horizontalScale(76),
    backgroundColor:"none" ,
    position: 'absolute',
    // borderTopWidth: sizer.horizontalScale(0.5),
    paddingHorizontal: sizer.horizontalScale(2),
    borderTopLeftRadius:sizer.horizontalScale(60),
    borderTopRightRadius:sizer.horizontalScale(60),
    bottom: 0,
    right: 0,
    left: 0,
    marginTop: 2,
    shadowRadius: 2,
    // borderWidth:2,
    // borderColor: COLORS.analogous1,
    shadowOffset: {
      width: 0,
      height: 100,
    },
    shadowColor: 'gray',
    // elevation: 12,
    shadowOpacity: 1.0,
    // borderTopColor: 'rgba(0, 0, 0, 0.1)',
    // borderTopWidth: sizer.horizontalScale(1),
    elevation: 3,
  },
  top_bar_bg: {
    elevation: 4,
    borderWidth: 0.1,
    height: sizer.horizontalScale(100),
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowColor: COLORS.textSecondary,

    shadowOpacity: 1.0,
    position: 'relative',
    left: sizer.horizontalScale(-10),
    top: sizer.horizontalScale(-16),
    width: '110%',
    paddingHorizontal: sizer.horizontalScale(10),
  },
});
