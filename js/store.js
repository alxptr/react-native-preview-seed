import { combineReducers, createStore } from 'redux';

const store = createStore(
  (state) => state,
  {}//,
  //applyMiddleware([]),
);

const testReducer = function (state = {}, action) {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        testValue: (state.testValue || 0) + action.data,
      };
  }
  return state;
};

store.replaceReducer(combineReducers(
  {
    auth: testReducer,
  }
));

export default store;
