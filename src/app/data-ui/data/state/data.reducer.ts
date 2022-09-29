import { Action, createReducer, on } from '@ngrx/store';
import * as DataTableActions from './data.actions';

import { DataState, initialState } from './data.state';

export const dataTableFeatureKey = 'dataTable';


export const dataTableReducer = createReducer<DataState>(
    initialState,
    on(DataTableActions.setSort, (state, {payload:data})=> {
     
    
        return {
            ...state,
            sort: data
        }
    }),
    on(DataTableActions.setPage, (state, {payload:data})=> {
   
    
        return {
            ...state,
            page: data
        }
    }),
    on(DataTableActions.setFilterBy,(state, {payload:data})=>{
 
        return {
            ...state, 
            filter:data
        }
    }),
    on(DataTableActions.deleteSemantic, (state) => {

        return {
            filter:{...state.filter},
            sort:{...state.sort},
            page:{...state.page}
        
        }
    })
)

export function DataTableReducer(state:DataState, action:Action){
    return dataTableReducer(state, action)
}



