import {
  SET_TEXT_FILTER,
  SET_CATEGORY_FILTER,
  SORT_BY,
  RESET_FILTER
} from '../actions/types';

const initialState = {
  text: '',
  category: null,
  sortBy: 'creation'
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        text: payload
      };

    case SET_CATEGORY_FILTER:
      return {
        ...state,
        category: payload
      };

    case SORT_BY:
      return {
        ...state,
        sortBy: payload
      };

    case RESET_FILTER:
      return {
        text: '',
        category: null,
        sortBy: 'creation'
      };

    default:
      return state;
  }
};
