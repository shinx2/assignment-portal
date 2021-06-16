import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actions/types";

const userReducer = (userState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const tempUser = {
        ...userState,
        user: action.payload,
        isAuthenticated: true,
      };
      sessionStorage.setItem("user", JSON.stringify(tempUser));

      return tempUser;
    case LOGOUT_SUCCESS:
      const tempUser1 = {
        isAuthenticated: false,
        user: {},
      };
      sessionStorage.setItem("user", JSON.stringify(tempUser1));
      return tempUser1;
    default:
      return userState;
  }
};

export default userReducer;
