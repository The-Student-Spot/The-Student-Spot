/**
 * networkBookmarks.ts
 * localStorage-backed bookmark service for the Networks section.
 * Keyed by the Firebase user UID so each user has their own saved list.
 * Falls back to a shared anonymous key when not signed in.
 */

import { auth } from "@/integrations/firebase/client";

export type SavedNetworkItem = {
  item_id: string;
  item_type: string;
  item_title: string | null;
  item_subtitle: string | null;
  bookmarked_at: string;
};

const getStorageKey = () => {
  const uid = auth.currentUser?.uid ?? "anonymous";
  return `tss_network_bookmarks_${uid}`;
};

const readStorage = (): SavedNetworkItem[] => {
  try {
    const raw = localStorage.getItem(getStorageKey());
    if (!raw) return [];
    return JSON.parse(raw) as SavedNetworkItem[];
  } catch {
    return [];
  }
};

const writeStorage = (items: SavedNetworkItem[]) => {
  try {
    localStorage.setItem(getStorageKey(), JSON.stringify(items));
  } catch {
    // Storage quota exceeded — fail silently
  }
};

/**
 * Load all bookmarked network items for the current user.
 */
export const loadUserBookmarks = async (): Promise<SavedNetworkItem[]> => {
  return readStorage();
};

/**
 * Returns the set of bookmarked item IDs for the current user.
 */
export const loadBookmarkIds = async (): Promise<Record<string, boolean>> => {
  const items = readStorage();
  return Object.fromEntries(items.map((b) => [b.item_id, true]));
};

/**
 * Add or remove a bookmark for the given item.
 */
export const persistBookmark = async (
  itemId: string,
  bookmarked: boolean,
  meta?: { item_type?: string; item_title?: string; item_subtitle?: string }
): Promise<void> => {
  const items = readStorage();

  if (bookmarked) {
    const existing = items.findIndex((b) => b.item_id === itemId);
    const entry: SavedNetworkItem = {
      item_id: itemId,
      item_type: meta?.item_type ?? "Network",
      item_title: meta?.item_title ?? null,
      item_subtitle: meta?.item_subtitle ?? null,
      bookmarked_at: new Date().toISOString(),
    };
    if (existing >= 0) {
      items[existing] = entry;
    } else {
      items.unshift(entry); // newest first
    }
  } else {
    const idx = items.findIndex((b) => b.item_id === itemId);
    if (idx >= 0) items.splice(idx, 1);
  }

  writeStorage(items);
};
