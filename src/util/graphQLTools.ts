export function doesInfoHaveField(info: any, fieldName: string): boolean {
  return info.fieldNodes[0].selectionSet.selections.find((selection: any) => selection.name.value === fieldName);
}

export function getAllRequestedFields<T>(info: any): (keyof T)[] {
  return info.fieldNodes[0].selectionSet.selections.map((selection: any) => selection.name.value as keyof T);
}
