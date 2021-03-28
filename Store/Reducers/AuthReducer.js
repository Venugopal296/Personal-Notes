import actionType from '../Actions/ActionType';

const initialAuthState = {
  token: null,
  userId: null,
  didAutoTryLogin: false,
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        didAutoTryLogin: true,
      };

    case actionType.LOGOUT:
      return {
        ...initialAuthState,
        didAutoTryLogin: true,
      };

    case actionType.AUTO_LOGIN:
      return {
        ...state,
        didAutoTryLogin: true,
      };

    default:
      return state;
  }
};

export default authReducer;
