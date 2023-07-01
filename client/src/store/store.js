import { createStore } from "redux";

// needs reducing function, and initial state
const initialState = { userLoggedIn: false, userDetails: {} };

const reducerFunction = (state = initialState, action) => {
	if (action.type === "login") {
		console.log(`Logging in!`);
		return { ...state, userLoggedIn: true, userDetails: action.value };
	}

	if (action.type === "logout") {
		console.log("Logging out!");
		return { ...state, userDetails: {}, userLoggedIn: false };
	}

	return state;
};

const store = createStore(reducerFunction);

export default store;
