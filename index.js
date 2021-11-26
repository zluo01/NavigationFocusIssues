/**
 * @format
 */
import React from 'react';
import {Navigation} from 'react-native-navigation';
import App from './App';
import {NavigationProvider} from 'react-native-navigation-hooks';
import {QueryClientProvider} from 'react-query';
import {getQueryClient} from './query';

const queryClient = getQueryClient();

Navigation.registerComponent(
  'com.myApp.WelcomeScreen',
  () => props => {
    return (
      <NavigationProvider value={{componentId: props.componentId}}>
        <QueryClientProvider client={queryClient}>
          <App {...props} />
        </QueryClientProvider>
      </NavigationProvider>
    );
  },
  () => App,
);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.myApp.WelcomeScreen',
            },
          },
        ],
      },
    },
  });
});
