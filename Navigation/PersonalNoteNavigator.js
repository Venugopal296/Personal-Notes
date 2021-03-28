import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home, { homeScreenOptions } from '../Screens/Home/Home';
import DeletedItems, {
  deletedItemsScreenOptions,
} from '../Screens/DeletedItems/DeletedItems';
import ListDetails, { ListDetailsOptions } from '../Screens/Details/Details';
import EditPersonalNote, {
  EditPersonalNoteOptions,
} from '../Screens/EditPersonalNote/EditPersonalNote';
import Login, { loginScreenOptions } from '../Screens/Login/Login';

import Colors from '../Constants/Colors';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.secondary,
  },
  headerTintColor: Colors.primary,
  headerTitleStyle: {
    fontWeight: '600',
  },
  headerBackTitle: 'back',
  cardShadowEnabled: true,
};

const PersonalNavigator = createStackNavigator();

export const PersonalNoteNavigator = () => {
  return (
    <PersonalNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <PersonalNavigator.Screen
        name="Home"
        component={Home}
        options={homeScreenOptions}
      />

      <PersonalNavigator.Screen
        name="Details"
        component={ListDetails}
        options={ListDetailsOptions}
      />

      <PersonalNavigator.Screen
        name="EditNote"
        component={EditPersonalNote}
        options={EditPersonalNoteOptions}
      />
    </PersonalNavigator.Navigator>
  );
};

const DeletedNavigator = createStackNavigator();

export const DeletedNoteNavigator = () => {
  return (
    <DeletedNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <DeletedNavigator.Screen
        name="Delete"
        component={DeletedItems}
        options={deletedItemsScreenOptions}
      />

      <DeletedNavigator.Screen
        name="Details"
        component={ListDetails}
        options={ListDetailsOptions}
      />
    </DeletedNavigator.Navigator>
  );
};

/* Tab Navigation */

const TabNavigator = createBottomTabNavigator();

export const PersonalTabNavigator = () => {
  return (
    <TabNavigator.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary,
        labelStyle: {
          fontSize: 16,
        },
        labelPosition: 'below-icon',
      }}
    >
      <TabNavigator.Screen
        name="Active Notes"
        component={PersonalNoteNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="flash" color={color} size={20} />
          ),
        }}
      />
      <TabNavigator.Screen
        name="Trash"
        component={DeletedNoteNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="trash" color={color} size={20} />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
};

/* Authentication Navigation */

const LoginNavigator = createStackNavigator();

export const LoginAuthNavigator = () => {
  return (
    <LoginNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <LoginNavigator.Screen
        name="Login"
        component={Login}
        options={loginScreenOptions}
      />
    </LoginNavigator.Navigator>
  );
};
