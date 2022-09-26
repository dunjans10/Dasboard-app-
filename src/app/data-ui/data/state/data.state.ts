
export interface DataState {
  sort: Sort;
  page:Page;
  }

export interface Sort {
    direction:string,
    field:string
}

export interface Page {
    page:number,
    pageSize:number
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

