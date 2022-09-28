import { Action, createReducer, on } from '@ngrx/store';
import * as DataTableActions from './data.actions';

import { DataState, initialState } from './data.state';

export const dataTableFeatureKey = 'dataTable';


export const dataTableReducer = createReducer<DataState>(
    initialState,
    on(DataTableActions.setSort, (state, {payload:data})=> {
        console.log('Original state ' + JSON.stringify(state.sort))
    
        return {
            ...state,
            sort: data
        }
    }),
    on(DataTableActions.setPage, (state, {payload:data})=> {
        console.log('Original state ' + JSON.stringify(state.page))
    
        return {
            ...state,
            page: data
        }
    }),
    on(DataTableActions.setFilterBy,(state, {payload:data})=>{
        console.log('Original state' + JSON.stringify(state.filter))

        return {
            ...state, 
            filter:data
        }
    })
)

export function DataTableReducer(state:DataState, action:Action){
    return dataTableReducer(state, action)
}



