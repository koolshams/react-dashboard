interface IdObj {
  id: string;
}

export function removeElement<T>(
  state: T,
  items: IdObj[],
  id: string,
  key: string,
): T {
  const deleteIndex = items.findIndex(item => item.id === id);
  if (deleteIndex === -1) {
    return state;
  }
  return {
    ...state,
    [key]: [...items.slice(0, deleteIndex), ...items.slice(deleteIndex + 1)],
  } as T;
}

export function updateElement<T>(
  state: T,
  items: IdObj[],
  itemToUpdate: IdObj,
  key: string,
) {
  const editIndex = items.findIndex(item => item.id === itemToUpdate.id);
  return {
    ...state,
    [key]: [
      ...items.slice(0, editIndex),
      itemToUpdate,
      ...items.slice(editIndex + 1),
    ],
  } as T;
}
