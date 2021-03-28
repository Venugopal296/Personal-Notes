import React, { useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../Components/HeaderButton";
import Colors from '../../Constants/Colors';

const Details = ({ route, navigation }) => {
  const { items } = route.params;

  const listClicked = useCallback(() => {
    navigation.navigate('EditNote',{
      items: items
    });
  }, [items]);

  useEffect(() => {
    {items.isActive && navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Edit"
            iconName='ios-pencil'
            onPress={listClicked}
            color={items.color? items.color : Colors.primary}
          />
        </HeaderButtons>
      )
    });}
  }, [listClicked]);

  return (
    <ScrollView style={{...styles.detailsContainer, backgroundColor: items.color}}>
      <Text style={styles.detailText}>{ items.details }</Text>
    </ScrollView>
  );
};

export const ListDetailsOptions = ({route}) => {
  return {
    title: route.params.items.title,
    headerTintColor: route.params.items.color
  }
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    padding: 10,
  },
  detailText: {
    color: '#fff',
    fontSize: 22
  }
});

export default Details;