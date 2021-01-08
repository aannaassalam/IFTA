export const initialState = {
  sessionExpired: true,
  awards: [],
  userIdentification: null,
  phone: null,
  token: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_TOKEN: "SET_TOKEN",
  SET_AWARDS: "SET_AWARDS",
  SET_EXPIRED: "SET_EXPIRED",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        userIdentification: action.userIdentification,
        phone: action.phone,
      };

    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    case actionTypes.SET_AWARDS:
      return {
        ...state,
        awards: action.awards,
      };

    case actionTypes.SET_EXPIRED:
      return {
        ...state,
        sessionExpired: action.expired,
      };

    default:
      return state;
  }
};

export default reducer;
