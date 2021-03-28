import React, { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import ColorPicker from "../../Components/ColorPicker";
import HeaderButton from "../../Components/HeaderButton";
import Colors from "../../Constants/Colors";
import { addPersonalItem, updatePersonalItem } from '../../Store/Actions/Action';

const EditPersonalNote = ({ navigation, route }) => {
    const [title, setTitle] = useState(route.params.items.title ? route.params.items.title : '');
    const [desc, setDesc] = useState(route.params.items.details ? route.params.items.details : '');
    const [color, setColor] = useState(route.params.items.color ? route.params.items.color :Colors.primary);
    const [error, setError] = useState();
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(error) {
            Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const savePersonalNote = useCallback(async () => {
        if(title.trim().length === 0) {
            setError(`Title can't be empty`);
            return;
        }

        try{
            const dispatchItem = route.params.items.title ?
                                    updatePersonalItem(route.params.items.id, title, desc, color) :
                                    addPersonalItem(title, desc, color)

            await dispatch(dispatchItem);
            navigation.navigate('Home');
        } catch (err) {
            setError(err.message);
        }
    }, [title, desc, color, dispatch]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Save"
                        iconName='ios-save-outline'
                        onPress={savePersonalNote}
                        color={color}
                    />
                </HeaderButtons>
            ),
            headerBackTitleStyle: {
                color: color
            },
            headerTintColor: color
        });
    }, [savePersonalNote, color]);

    

    return (
        <View style={styles.EditContainer}>
            <View style={styles.EditTitleBox}>
                <TextInput 
                    style={styles.EditTitle} 
                    placeholder='Title'
                    autoFocus
                    enablesReturnKeyAutomatically
                    returnKeyType='next'
                    selectionColor={Colors.tertiary}
                    value={title}
                    onChangeText={text => setTitle(text)}
                />
                <TouchableOpacity style={{...styles.colorBox, backgroundColor: color}} onPress={() => setIsColorPickerOpen(!isColorPickerOpen)}></TouchableOpacity>
            </View>
            {isColorPickerOpen && <ColorPicker color={color} selectColor={color => setColor(color)} />}
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps='always'
                keyboardDismissMode='on-drag'
                style={{ backgroundColor: color }}
            >
                <TextInput 
                    style={styles.EditDetails}
                    placeholder='Enter your note...'
                    selectionColor={Colors.secondary}
                    numberOfLines={20}
                    multiline
                    value={desc}
                    onChangeText={text => setDesc(text)}
                />
            </ScrollView>
        </View>
    );
};

export const EditPersonalNoteOptions = ({route}) => {
    return {
        headerTitle: route.params.items.title ? 'Edit Note' : 'Create Note',
        headerBackTitleStyle: {
            color: route.params.items.color
        },
        headerTintColor: route.params.items.color
    }
}

const styles = StyleSheet.create({
    EditContainer: {
        width: '100%',
        flex: 1,
        backgroundColor: 'white'
    },
    EditTitleBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 1
        
    },
    EditTitle: {
        flex: 1,
        fontSize: 22,
        fontWeight: '500',
        fontStyle: 'italic',
        padding: 5,
        marginVertical: 5,
        marginLeft: 10,
        textAlign: 'center',
    },
    colorBox: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'red',
        marginRight: 10
    },
    EditDetails: {
        flex: 1,
        margin: 10,
        padding: 10,
        color: Colors.secondary,
        fontSize: 22
    }
});

export default EditPersonalNote;