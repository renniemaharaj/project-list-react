import type { Folder, File, Document } from "./types/types";

// This function takes a json string, validates it and conumes what's validated
export function controlFlow<I, O>(
  rawInput: I,
  validateFn: (i: I) => [boolean, O],
  consumeFn: (validated: O) => void
): void {
  try {
    const [ok, result] = validateFn(rawInput);
    if (ok) consumeFn(result);
  } catch (e) {
    console.error("Validation failed:", e);
  }
}

// This function essentially translates documents array into ui folder array
export function FoldersFromDocuments(documents: Document[]): Folder[] {
  const folderMap = new Map<string, File[]>();

  for (const doc of documents) {
    // Derive state
    let state: File["state"] = "initial";
    if (doc.archived) {
      state = "error";
    } else if (doc.published) {
      state = "done";
    }

    const item: File = {
      ...doc,
      state,
    };

    const folder = doc.folder ?? "Uncategorized";
    if (!folderMap.has(folder)) {
      folderMap.set(folder, []);
    }

    folderMap.get(folder)!.push(item);
  }

  const tree: Folder[] = [];

  for (const [name, subTreeItems] of folderMap.entries()) {
    tree.push({
      name,
      count: subTreeItems.length,
      subTreeItems,
    });
  }

  return tree;
}
