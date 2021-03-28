import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import {
  PersonalTabNavigator,
  LoginAuthNavigator,
} from './PersonalNoteNavigator';
import StartupScreen from '../Screens/Startup/StartupScreen';

const AppNavigator = () => {
  const isAuth = useSelector(state => !!state.authentication.token);
  const didTryAutoLogin = useSelector(state => {
    return state.authentication.didAutoTryLogin;
  });

  return (
    <NavigationContainer>
      {isAuth && <PersonalTabNavigator />}
      {!isAuth && didTryAutoLogin && <LoginAuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
