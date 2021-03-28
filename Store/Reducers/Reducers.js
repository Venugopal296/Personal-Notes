import ListData from '../../Models/listData';
import actionType from '../Actions/ActionType';

const initialState = {
    personalNoteList: []
};

const personalListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.FETCH_LIST:
            return {
                ...state,
                personalNoteList: [...action.dataList]
            }

        case actionType.ADD_ITEM:
            return {
                ...state,
                personalNoteList: [...state.personalNoteList, action.data]
            }

        case actionType.MOVE_TO_TRASH:
            const oldListArr = [...state.personalNoteList];
            const trashItem = oldListArr.filter(el => el.id === action.id);
            const index = oldListArr.findIndex(el => el.id === action.id);
            trashItem[0] = { ...trashItem[0], isActive: false } 
            oldListArr[index] = trashItem[0];

            return {
                ...state,
                personalNoteList: [...oldListArr]
            }

        case actionType.REVERT_ITEM:
            const oldListArr1 = [...state.personalNoteList];
            const trashItem1 = oldListArr1.filter(el => el.id === action.id);
            const index1 = oldListArr1.findIndex(el => el.id === action.id);
            trashItem1[0] = { ...trashItem1[0], isActive: true } 
            oldListArr1[index1] = trashItem1[0];

            return {
                ...state,
                personalNoteList: [...oldListArr1]
            }

        case actionType.DELETE_ITEM:
            return {
                ...state,
                personalNoteList: state.personalNoteList.filter(item => item.id != action.id)
            }

        case actionType.UPDATE_ITEM:
            const { id, title, details, color, isActive } = action.data;

            const oldList = [...state.personalNoteList];
            const indx = oldList.findIndex(el => el.id === id);
            const res = new ListData(id, title, details, color, isActive);
            oldList[indx] = res;
            return {
                ...state,
                personalNoteList: [...oldList]
            }

        default:
            return state;
    }
}

export default personalListReducer;