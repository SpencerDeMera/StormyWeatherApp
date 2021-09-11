import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import homePage from './Pages/HomePage';
import SearchPage from './Pages/SearchPage';
import SettingsPage from './Pages/SettingsPage';
import { setLocation, getIsDark, setIsDark } from './utils/index';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from './utils/colors';

const {PRIMARY_COLOR, SECONDARY_COLOR, TIERTIARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_DARK, TEXT_COLOR_BLACK, TEXT_COLOR_LIGHTGRAY, TEXT_COLOR_DARKGRAY} = colors;

const { Navigator, Screen} = createStackNavigator();

export default function App() {
  const useCurrLocationFlag = true;
  setLocation(useCurrLocationFlag); // uses current location on load

  setIsDark(true);
  let isDark = getIsDark();
  
  const verticalAnimation = {
    gestureDirection: 'vertical',
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.height, 0],
              }),
            },
          ],
        },
      };
    },
  };

  if (isDark) {
    return (
      <View style={{flex: 1, backgroundColor: PRIMARY_COLOR}}>
        <NavigationContainer>
          <Navigator initialRouteName="Home" screenOptions={{ 
            headerShown: true,
            headerTitleStyle: {color: TEXT_COLOR_LIGHT},
            headerTintColor: TEXT_COLOR_LIGHT,
          }}>
            <Screen name="Home" component={homePage} options={{
              verticalAnimation, 
              header: () => null,
            }}/>
            <Screen name="Search" component={SearchPage} options={{
              verticalAnimation, 
              headerTitle: () => <Text style={styles.searchTitle}>Locations</Text>,
              headerStyle: {backgroundColor: SECONDARY_COLOR, elevation: 0, shadowOpacity: 0},
              headerTitleAlign: 'center',
            }}/>
            <Screen name="Settings" component={SettingsPage} options={{
              verticalAnimation, 
              headerTitle: () => <Text style={styles.settingsTitle}>Settings</Text>,
              headerStyle: {backgroundColor: PRIMARY_COLOR, elevation: 0, shadowOpacity: 0},
              headerTitleAlign: 'center',
            }}/>
          </Navigator>
        </NavigationContainer>
      </View> 
    );
  } else {
    return (
      <View style={{flex: 1, backgroundColor: TEXT_COLOR_LIGHT}}>
        <NavigationContainer>
          <Navigator initialRouteName="Home" screenOptions={{ 
            headerShown: true,
            headerTitleStyle: {color: TEXT_COLOR_LIGHT},
            headerTintColor: TEXT_COLOR_BLACK
          }}>
            <Screen name="Home" component={homePage} options={{
              verticalAnimation, 
              header: () => null,
            }}/>
            <Screen name="Search" component={SearchPage} options={{
              verticalAnimation, 
              headerTitle: () => <Text style={lightStyles.searchTitle}>Locations</Text>,
              headerStyle: {backgroundColor: SECONDARY_COLOR, elevation: 0, shadowOpacity: 0},
              headerTitleAlign: 'center',
              headerTintColor: TEXT_COLOR_LIGHT
            }}/>
            <Screen name="Settings" component={SettingsPage} options={{
              verticalAnimation, 
              headerTitle: () => <Text style={lightStyles.settingsTitle}>Settings</Text>,
              headerStyle: {backgroundColor: TEXT_COLOR_LIGHT, elevation: 0, shadowOpacity: 0},
              headerTitleAlign: 'center',
              headerTintColor: TEXT_COLOR_BLACK
            }}/>
          </Navigator>
        </NavigationContainer>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  searchTitle: {
    alignItems: 'center',
    color: TEXT_COLOR_LIGHT,
    fontSize: 22,
    fontWeight: '700',
  },

  settingsTitle: {
    alignItems: 'center',
    color: TEXT_COLOR_LIGHT,
    fontSize: 22,
    fontWeight: '700',
  },
});

const lightStyles = StyleSheet.create({
  searchTitle: {
    alignItems: 'center',
    color: TEXT_COLOR_LIGHT,
    fontSize: 22,
    fontWeight: '700',
  },

  settingsTitle: {
    alignItems: 'center',
    color: TEXT_COLOR_BLACK,
    fontSize: 22,
    fontWeight: '700',
  },
});
