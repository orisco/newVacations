const initialState = [false];

const cardReducer = (state = initialState, action) => {
  const {type} = action;
switch (type) {
  case "SHOW_ACTION":
    return {add:true};
    case "HIDE_ACTION":
    return {add:false};
    default: 
      return state;
}
}

export default cardReducer;