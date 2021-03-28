import axios from 'axios';
import ListData from '../../Models/listData';
import ActionType from './ActionType';

export const fetchPersonalList = () => {
  return async (dispatch, getState) => {
    const userId = getState().authentication.userId;
    try {
      const response = await axios.get(
        `https://personalnotes-297ef-default-rtdb.firebaseio.com/${userId}/personalNotes.json`
      );
      const listArray = [];
      for (var key in response.data) {
        listArray.push(
          new ListData(
            key,
            response.data[key].title,
            response.data[key].details,
            response.data[key].color,
            response.data[key].isActive
          )
        );
      }

      dispatch({
        type: ActionType.FETCH_LIST,
        dataList: listArray,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addPersonalItem = (title, details, color) => {
  return async (dispatch, getState) => {
    const userId = getState().authentication.userId;
    const dataObj = {
      title: title,
      details: details,
      color: color,
      isActive: true,
    };

    try {
      const postResp = await axios.post(
        `https://personalnotes-297ef-default-rtdb.firebaseio.com/${userId}/personalNotes.json`,
        dataObj
      );

      dispatch({
        type: ActionType.ADD_ITEM,
        data: {
          id: postResp.data.name,
          title,
          details,
          color,
          isActive: true,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const moveItemToTrash = ({ id, title, details, color, isActive }) => {
  return async (dispatch, getState) => {
    const userId = getState().authentication.userId;
    const dataObj = {
      title,
      details,
      color,
      isActive: false,
    };

    try {
      const response = await axios.patch(
        `https://personalnotes-297ef-default-rtdb.firebaseio.com/${userId}/personalNotes/${id}.json`,
        dataObj
      );
      dispatch({
        type: ActionType.MOVE_TO_TRASH,
        id: id,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const revertItemToList = ({ id, title, details, color }) => {
  return async (dispatch, getState) => {
    const userId = getState().authentication.userId;
    const dataObj = {
      title,
      details,
      color,
      isActive: true,
    };

    try {
      const response = await axios.patch(
        `https://personalnotes-297ef-default-rtdb.firebaseio.com/${userId}/personalNotes/${id}.json`,
        dataObj
      );
      dispatch({
        type: ActionType.REVERT_ITEM,
        id: id,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const updatePersonalItem = (id, title, details, color) => {
  return async (dispatch, getState) => {
    const userId = getState().authentication.userId;
    const dataObj = {
      title: title,
      details: details,
      color: color,
      isActive: true,
    };

    try {
      const response = await axios.patch(
        `https://personalnotes-297ef-default-rtdb.firebaseio.com/${userId}/personalNotes/${id}.json`,
        dataObj
      );
      dispatch({
        type: ActionType.UPDATE_ITEM,
        data: {
          id,
          title,
          details,
          color,
          isActive: true,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deletePersonalItem = id => {
  return async (dispatch, getState) => {
    const userId = getState().authentication.userId;
    try {
      const response = await axios.delete(
        `https://personalnotes-297ef-default-rtdb.firebaseio.com/${userId}/personalNotes/${id}.json`
      );
      dispatch({
        type: ActionType.DELETE_ITEM,
        id: id,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteAllPersonalItems = lists => {
  return async (dispatch, getState) => {
    const userId = getState().authentication.userId;
    try {
      const response = await axios.delete(
        `https://personalnotes-297ef-default-rtdb.firebaseio.com/${userId}/personalNotes/${id}.json`
      );
      dispatch({
        type: ActionType.DELETE_ITEM,
        id: id,
      });
    } catch (err) {
      throw err;
    }
  };
};
