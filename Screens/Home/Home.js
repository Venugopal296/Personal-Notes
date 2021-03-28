import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ItemList from '../../Components/Item/Item';
import HeaderButton from '../../Components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { moveItemToTrash, fetchPersonalList } from '../../Store/Actions/Action';
import Colors from '../../Constants/Colors';
import { Logout } from '../../Store/Actions/AuthAction';

const Home = ({ navigation }) => {
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const personalLists = useSelector(state =>
    state.personalList.personalNoteList.filter(el => el.isActive)
  );
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
  }, [dispatch, setError, setIsRefreshing, setIsLoading]);

  const moveToTrash = item => {
    setError(null);

    Alert.alert('Caution!', 'Move to Trash', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          try {
            await dispatch(moveItemToTrash(item));
          } catch (err) {
            setError(err.message);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchPersonalList());
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    })();
  }, [dispatch, loadPersonalNotes]);

  const listClicked = item => {
    navigation.navigate('Details', {
      items: item,
    });
  };

  const renderItem = ({ item }) => {
    return (
      <ItemList
        title={item.title}
        color={item.color}
        isActive={item.isActive}
        listClicked={() => listClicked(item)}
        deleteItem={() => moveToTrash(item)}
      />
    );
  };

  if (error) {
    Alert.alert('Error occured', 'Not loaded properly', [{ text: 'Okay' }]);
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ImageBackground
          source={require('../../assets/1.jpg')}
          style={styles.imageStyle}
        >
          <ActivityIndicator size="large" color={Colors.primary} />
        </ImageBackground>
      </View>
    );
  }

  if (!isLoading && personalLists.length === 0) {
    return (
      <View style={styles.centered}>
        <ImageBackground
          source={require('../../assets/1.jpg')}
          style={styles.imageStyle}
        >
          <Text>No Personal Notes found. Maybe start adding some!</Text>
          <Button title="Refresh" onPress={loadPersonalNotes} />
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/1.jpg')}
        style={styles.imageStyle}
      >
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

export const homeScreenOptions = navData => {
  const dispatch = useDispatch();
  return {
    headerTitle: 'Personal Notes',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="add"
          iconName="ios-add"
          color={Colors.primary}
          onPress={() => {
            navData.navigation.navigate('EditNote', { items: {} });
          }}
        />
        <Item
          title="logout"
          iconName="log-out-outline"
          color={Colors.primary}
          onPress={() => {
            dispatch(Logout());
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    width: '100%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default Home;
