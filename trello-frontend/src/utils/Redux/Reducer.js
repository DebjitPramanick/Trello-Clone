
const user = JSON.parse(localStorage.getItem('DBUSER'));

export const initialState = {
    user: user,
};

export const actionTypes = {
    SET_USER: "SET_USER",
};

const reducer = (state, action) => {

    switch (action.type) {
        case actionTypes.SET_USER:
            localStorage.setItem('DBUSER', JSON.stringify(action.user));
            return {
                ...state,
                user: action.user,
            };

        default:
            return state;
    }
};

export default reducer;