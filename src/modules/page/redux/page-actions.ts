import { Page } from '../interfaces';
import { PAGE_ADD, PAGE_LIST, PAGE_EDIT, PAGE_DELETE } from './page-constants';

export const addPage = (page: Page) => ({
  type: PAGE_ADD,
  payload: page,
});

export const listPage = (pageList: Page[]) => ({
  type: PAGE_LIST,
  payload: pageList,
});

export const editPage = (page: Page) => ({
  type: PAGE_EDIT,
  payload: page,
});

export const deletePage = (page: Page) => ({
  type: PAGE_DELETE,
  payload: page,
});
