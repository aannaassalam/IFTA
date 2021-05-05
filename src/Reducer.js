export const initialState = {
  sessionExpired: null,
  totalVotes: 0,
  awards: [],
  userIdentification: localStorage.getItem('authToken') ? true : null,
  phone: null,
  token: null,
  state: localStorage.getItem('state') ? true : null,
  userName: localStorage.getItem('userName') ? localStorage.getItem('userName') : null,
  expiryDate: '',
  stateVoteData: []
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_TOKEN: "SET_TOKEN",
  SET_AWARDS: "SET_AWARDS",
  SET_EXPIREDandTOTALVOTE: "SET_EXPIREDandTOTALVOTE",
  SET_USER_STATE: 'SET_USER_STATE',
  SET_STATE_VOTE_DATA: 'SET_STATE_VOTE_DATA'
};

const reducer = (state = initialState, action) => {
  console.log(action);

  switch (action.type) {

    case actionTypes.SET_USER:
      return {
        ...state,
        userIdentification: action.userIdentification,
        phone: action.phone,
        state: action.state,
        userName: action.userName
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
        expiryDate: action.expiryDate
      };
    case actionTypes.SET_USER_STATE:
      return {
        ...state,
        state: action.state
      }

    case actionTypes.SET_STATE_VOTE_DATA:
      return {
        ...state,
        stateVoteData: action.voteData
      }
    default:
      return state;
  }
};

export default reducer;
