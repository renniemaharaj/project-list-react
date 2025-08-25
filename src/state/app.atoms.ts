import { atom } from "jotai";

// Report search atom
export const explorerFilterAtom = atom("");

// Whether to display the create document form
export const showCreateFormAtom = atom(false);

// Whether to display the update document form
export const showUpdateFormAtom = atom(false);

// Project explorer's pagination atom
export const projectExplorerPageNumberAtom = atom(0)

// Domain's search query atom
export const domainSearchQueryAtom = atom<string>()