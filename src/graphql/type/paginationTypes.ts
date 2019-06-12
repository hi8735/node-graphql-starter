export interface Edge<T> {
  cursor: string;
  node: T;
}

export interface PageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
  count: number;
}

export interface Connection<T> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface OffsetPaginationFilter {
  /**
   * Number of items to get
   */
  readonly limit?: number;
  /**
   * Number of items to skip
   */
  readonly offset?: number;
}

export interface CursorPaginationFilter {
  /**
   * Get items after the cursor
   */
  readonly after?: string;
  /**
   * Number of items to be returned
   */
  readonly first?: number;
}
