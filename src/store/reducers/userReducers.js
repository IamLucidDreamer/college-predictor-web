
import { SET_USER } from "../actionTypes/index";

const initialeValue = {}

const reducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            console.log(action.payload);
            return { ...state, ...action.payload.user };
        default:
            return state;
    }
};

export default reducer;
