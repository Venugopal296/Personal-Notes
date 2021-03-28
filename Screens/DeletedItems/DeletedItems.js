import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, Alert, Button, FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';

import ItemList from '../../Components/Item/Item';
import { 
  deleteAllPersonalItems, 
  deletePersonalItem, 
  fetchPersonalList, 
  revertItemToList 
} from '../../Store/Actions/Action';
import Colors from '../../Constants/Colors';

const Home = ({ navigation }) => {
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const personalLists = useSelector(state => state.personalList.personalNoteList.filter(el => !el.isActive));
  const dispatch = useDispatch();

  const loadPersonalNotes = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    setIsLoading(true);
    try {
      await dispatch(fetchPersonalList());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  }, [dispatch, setError, setIsLoading, setIsRefreshing]);

  const deleteAllNotes = useCallback(async () => {
    setError(null);
    try {
      await dispatch(deleteAllPersonalItems(personalLists));
    } catch (err) {
      setError(err.message);
    }
  }, [personalLists, dispatch, setError]);

  const revertItem = useCallback((item) => {
    setError(null);

    Alert.alert(
      'Caution!', 
      'Revert back to Active list?', 
      [
        { text: 'No', style: 'default' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(revertItemToList(item));
            } catch (err) {
              setError(err.message);
            }
          }
        }
      ]
    );
  }, [dispatch, setError]);

  const deleteNote = (id) => {
    setError(null);

    Alert.alert(
      'Caution!', 
      'Are you sure want to delete', 
      [
        { text: 'No', style: 'default' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(deletePersonalItem(id));
            } catch (err) {
              setError(err.message);
            }
          }
        }
      ]
    );
  };

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <HeaderButtons HeaderButtonComponent={HeaderButton}>
  //         <Item
  //           title="Delete All"
  //           onPress={deleteAllNotes}
  //           color={Colors.primary}
  //         />
  //       </HeaderButtons>
  //     )
  //   });
  // }, [deleteAllNotes]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try{
        await dispatch(fetchPersonalList());
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    })();
  }, [dispatch, loadPersonalNotes]);

  const listClicked = (item) => {
    navigation.navigate('Details',{
      items: item
    });
  }

  const renderItem = ({ item }) => {
    return(
      <ItemList 
        title={item.title}
        color={item.color}
        isActive={item.isActive}
        listClicked={() => listClicked(item)}
        deleteItem={() => deleteNote(item.id)}
        revertItem={() => revertItem(item)}
      />
    );
  }

  if (error) {
      Alert.alert('Error occured', 'Not loaded properly', [{ text: 'Okay' }]);
  }

  if(isLoading) {
    return (
      <View style={styles.centered}>
        <ImageBackground source={require('../../assets/1.jpg')} style={styles.imageStyle}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </ImageBackground>
      </View>
    );
  }

  if (!isLoading && personalLists.length === 0) {
    return (
      <View style={styles.centered}>
        <ImageBackground source={require('../../assets/1.jpg')} style={styles.imageStyle}>
          <Text>Empty Trash</Text>
          <Button title='Refresh' onPress={loadPersonalNotes} />
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/1.jpg')} style={styles.imageStyle}>
        <FlatList
          onRefresh={loadPersonalNotes}
          refreshing={isRefreshing}
          numColumns={2}
          data={personalLists}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.listContainer}
        />
      </ImageBackground>
    </View>
  );
};

export const deletedItemsScreenOptions = navData => {
  return {
    headerTitle: 'Trash'
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    width: '100%'
  },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  imageStyle: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    height: '100%'
  }
});

export default Home;
