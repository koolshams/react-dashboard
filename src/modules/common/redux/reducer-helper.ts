interface IdObj {
  id: string;
}

export function removeElement<T extends IdObj>(items: T[], id: string): T[] {
  const deleteIndex = items.findIndex((item) => item.id === id);
  if (deleteIndex !== -1) {
    return [...items.slice(0, deleteIndex), ...items.slice(deleteIndex + 1)];
  }

  return items;
}

export function updateElement<T extends IdObj>(
  items: T[],
  itemToUpdate: T,
): T[] {
  const editIndex = items.findIndex((item) => item.id === itemToUpdate.id);
  return [
    ...items.slice(0, editIndex),
    itemToUpdate,
    ...items.slice(editIndex + 1),
  ];
}
