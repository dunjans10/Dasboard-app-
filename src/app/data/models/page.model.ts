export interface Page<ContentType> {
    content:ContentType[];
    "pageable": {
        "sort": {
          "sorted": "Boolean",
          "unsorted": "Boolean",
          "empty": "Boolean"
        },
        "pageNumber": "Number",
        "pageSize": "Number",
        "offset": "Number",
        "paged": "Boolean",
        "unpaged": "Boolean"
      },
      "totalPages": "Number",
      "totalElements": "Number",
      "last": "Boolean",
      "size": "Number",
      "number": "Number",
      "sort": {
        "sorted": "Boolean",
        "unsorted": "Boolean",
        "empty": "Boolean"
      },
      "first": "Boolean",
      "numberOfElements": "Number",
      "empty": "Boolean"
}