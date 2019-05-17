import { Page } from '../interfaces';
import { Action } from 'redux';
import * as constants from './page-constants';
import {
  removeElement,
  updateElement,
} from '../../common/redux/reducer-helper';

export interface PageState {
  pages: Page[];
}

const initialState: PageState = {
  pages: [],
};

export interface PageAction extends Action<keyof typeof constants> {
  payload: any;
}

export function page(state = initialState, action: PageAction): PageState {
  switch (action.type) {
    case constants.PAGE_ADD:
      return {
        ...state,
        pages: [...state.pages, action.payload],
      };

    case constants.PAGE_LIST:
      return {
        ...state,
        pages: [...action.payload],
      };
    case constants.PAGE_DELETE:
      return removeElement<PageState>(
        state,
        state.pages,
        action.payload,
        'pages',
      );

    case constants.PAGE_EDIT:
      return updateElement<PageState>(
        state,
        state.pages,
        action.payload as Page,
        'pages',
      );

    default:
      return state;
  }
}
