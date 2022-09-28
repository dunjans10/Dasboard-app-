 import { createAction, props } from "@ngrx/store";
import { PageParams, SortParams } from "src/app/data/services/http-models/request-models";
import { SemanticFilter } from "src/app/data/services/semantic.service";


export const SET_SORT = '[Data Table] Set Sort';
export const SET_PAGE = '[Data Table] Set Page';
export const SET_FILTER = '[Data Table] Set Filter';

 //action type

export const setSort = createAction(SET_SORT, props<{ payload:SortParams }>());
export const setPage = createAction(SET_PAGE, props<{ payload:PageParams }>());
export const setFilterBy = createAction(SET_FILTER, props<{ payload:SemanticFilter }>()); 
