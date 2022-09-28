import { PageParams, SortParams } from "src/app/data/services/http-models/request-models";

export interface DataState {
  sort: SortParams;
  page:PageParams;
  }

 
export const initialState:DataState = {
    sort: {
        direction: 'asc',
        field: 'semantic.name',
    }, 
    page: {
        page:1,
        pageSize:5
    }

}

