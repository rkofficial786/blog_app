import {SafeAreaView} from 'react-native';
import './global.css';
import React from 'react';
import store, {persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {Navigation} from './src/routes/Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CustomStatusBar from './src/components/status-bar';
import sizer from './src/helpers/sizer';
import {useColorScheme, colorScheme} from 'nativewind';
import Colors from './src/constants/colors';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/utils/toast-config';

function App(): React.JSX.Element {
  colorScheme?.set('light');

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <GestureHandlerRootView>
            <CustomStatusBar />
            <SafeAreaView
              style={{
                flex: 1,
                paddingTop: sizer.horizontalScale(60),
                backgroundColor: Colors.light.background.primary,
              }}>
              <Navigation />
              <Toast config={toastConfig} position="top" />
            </SafeAreaView>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
