
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { dataTableFeatureKey } from './data.reducer';
import { DataState } from './data.state';



export const getSemanticFeatureState = createFeatureSelector<DataState>(dataTableFeatureKey);

//slices of state
export const selectSort = createSelector(getSemanticFeatureState, (state:DataState) => state.sort);
export const selectPage = createSelector(getSemanticFeatureState, (state:DataState) => state.page);
export const selectFilter = createSelector(getSemanticFeatureState, (state:DataState)=> state.filter)
//export const deleteSemantic = createSelector(getSemanticFeatureState, (state:DataState) => state.deleteId);
 
