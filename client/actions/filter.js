import {
  SET_TEXT_FILTER,
  SET_CATEGORY_FILTER,
  SORT_BY,
  RESET_FILTER
} from './types';

export const setTextFilter = (inputText = '') => dispatch => {
  dispatch({ type: SET_TEXT_FILTER, payload: inputText });
};

export const setCategoryFilter = (categoryFilter = null) => dispatch => {
  dispatch({ type: SET_CATEGORY_FILTER, payload: categoryFilter });
};

export const sortByFilter = sort => dispatch => {
  dispatch({ type: SORT_BY, payload: sort });
};

export const resetFilter = () => dispatch => {
  dispatch({ type: RESET_FILTER });
};
