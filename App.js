/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useQueryWithRefocus} from './query';
import {useNavigationComponentDidAppear} from 'react-native-navigation-hooks';

function App() {
  const {data, refetch} = useQueryWithRefocus('key', () => {
    return 'test123';
  });

  console.log('focus');

  useNavigationComponentDidAppear(e => {
    console.log('Appear', e);
    refetch();
  });

  return (
    <SafeAreaView>
      <View>
        <Text>Main Page</Text>
        <Text>{data}</Text>
      </View>
    </SafeAreaView>
  );
}

export default App;
