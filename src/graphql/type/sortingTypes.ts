export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export interface SortCriteria {
  readonly field: string;
  readonly direction: SortDirection;
}
