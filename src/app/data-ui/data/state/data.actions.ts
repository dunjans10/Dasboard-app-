 import { createAction, props } from "@ngrx/store";
import { PageParams, SortParams } from "src/app/data/services/http-models/request-models";

export const SET_SORT = '[Data Table] Set Sort';
export const SET_PAGE = '[Data Table] Set Page';

 //action type

export const setSort = createAction(SET_SORT, props<{ payload:SortParams }>());
export const setPage = createAction(SET_PAGE, props<{ payload:PageParams }>());
