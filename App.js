import React from 'react';
import {StyleSheet, View} from 'react-native';
import Screen from './src/components/Screen';
import Controls from './src/components/Controls';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
import {init} from './src/helpers/db';

init()
  .then(() => console.log('initialized database'))
  .catch((err) => console.log('database failed', err));

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.plastic}>
        <Screen />
        <Controls />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  plastic: {
    backgroundColor: '#ee5253',
    flex: 1,
  }
});

export default App;
