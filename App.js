import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';

import Navigation from "./src/navigations"
import { customTheme } from './src/Theme';
import { store } from './src/redux/store';


const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NativeBaseProvider theme={customTheme}>
          <Navigation />
        </NativeBaseProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;