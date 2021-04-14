const initialState = [""];

const userReducer = (state = initialState, action) => {
  const {type, payload} = action;
switch (type) {
  case "UPDATE_ACTION":
    return [{
      name: payload.name,
      username: payload.username,
      type: payload.type,
      token: payload.token
    }]
    case "RESET_ACTION":
    return state = [""];
    default: 
      return state;
}
}

export default userReducer;