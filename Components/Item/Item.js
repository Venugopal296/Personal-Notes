import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../Constants/Colors';

const ListItem = ({ title, color, isActive, listClicked, deleteItem, revertItem }) => {
  return (
    <TouchableOpacity style={{...styles.item, backgroundColor: color}} onPress={listClicked}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {!isActive && <TouchableOpacity style={styles.undoIcon}>
        <Icon 
          name="arrow-undo"
          size={25} 
          color={Colors.secondary} 
          onPress={revertItem}  
        />
      </TouchableOpacity> }
      <TouchableOpacity style={styles.deleteIcon}>
        <Icon 
          name="trash" 
          size={25} 
          color={Colors.secondary} 
          onPress={deleteItem}  
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    maxWidth: '45%',
    height: 150,
    padding: 15,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 8
  },
  title: {
    color: Colors.secondary,
    fontSize: 20,
    fontWeight: '600'
  },
  titleBox: {
    flex: 1,
    justifyContent: 'center'
  },
  undoIcon: {
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  deleteIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10
  }
});

export default ListItem;