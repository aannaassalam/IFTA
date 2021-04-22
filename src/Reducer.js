export const initialState = {
  sessionExpired: true,
  totalVotes: 0,
  awards: [],
  userIdentification: localStorage.getItem('authToken') ? true : null,
  phone: null,
  token: null,
  state: null
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_TOKEN: "SET_TOKEN",
  SET_AWARDS: "SET_AWARDS",
  SET_EXPIREDandTOTALVOTE: "SET_EXPIREDandTOTALVOTE",
  SET_USER_STATE: 'SET_USER_STATE'
};

const reducer = (state = initialState, action) => {
  console.log(action);

  switch (action.type) {

    case actionTypes.SET_USER:
      return {
        ...state,
        userIdentification: action.userIdentification,
        phone: action.phone,
        state:action.state
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

    case actionTypes.SET_EXPIREDandTOTALVOTE:
      return {
        ...state,
        sessionExpired: action.expired,
        totalVotes: action.totalVotes,
      };
    case actionTypes.SET_USER_STATE:
      return {
        ...state,
        state: action.state
      }
    default:
      return state;
  }
};

export default reducer;
