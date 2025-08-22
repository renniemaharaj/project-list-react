import { atom } from "jotai";

// Document search atom
export const explorerFilterAtom = atom("");

// Tracker for auth success
export const showBackendFeaturesAtom = atom(false);

// Whether to display the create document form
export const showCreateFormAtom = atom(false);

// Whether to display the update document form
export const showUpdateFormAtom = atom(false);

// Whether to display community documents instead of user's
export const showCommunityPageAtom = atom(false);
