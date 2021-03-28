import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import personalListReducer from './Store/Reducers/Reducers';
import authReducer from './Store/Reducers/AuthReducer';
import AppNavigator from './Navigation/AppNavigator';

const rootReducer = combineReducers({
  personalList: personalListReducer,
  authentication: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

const _loadAssetsAsync = async () => {
  const imageAssets = cacheImages([
    // 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    require('./assets/1.jpg'),
  ]);

  const fontAssets = cacheFonts([
    {
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    },
  ]);

  await Promise.all([...imageAssets, ...fontAssets]);
};

const App = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!imageLoaded) {
    return (
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => setImageLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
