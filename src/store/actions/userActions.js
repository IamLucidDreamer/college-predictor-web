import {
    SET_USER
} from '../actionTypes/index';

export const setUser = (user) => ({
    type: SET_USER,
    payload: {
        user,
    },
});