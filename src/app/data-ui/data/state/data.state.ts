import { PageParams, SortParams } from "src/app/data/services/http-models/request-models";
import { SemanticFilter } from "src/app/data/services/semantic.service";



export interface DataState {
  sort: SortParams;
  page:PageParams;
  filter:SemanticFilter;

  }

export const initialState:DataState = {
    sort: {
        direction: 'asc',
        field: 'semantic.name',
    }, 
    page: {
        page:0,
        pageSize:10
    },
    filter:{
        query:''
    }
   
    
}

