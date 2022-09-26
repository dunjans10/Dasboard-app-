 import { createAction, props } from "@ngrx/store";
import { Page, Sort } from "./data.state";

export const SET_SORT = '[Data Table] Set Sort';
export const SET_PAGE = '[Data Table] Set Page';

 //action type

export const setSort = createAction(SET_SORT, props<{ payload:Sort }>());
export const setPage = createAction(SET_PAGE, props<{ payload:Page }>());
