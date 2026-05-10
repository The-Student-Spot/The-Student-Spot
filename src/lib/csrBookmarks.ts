/**
 * csrBookmarks.ts
 * localStorage-backed bookmark service for CSR / Impact items.
 * Reuses the same storage pattern as networkBookmarks but with a separate key.
 */

import { auth } from "@/integrations/firebase/client";
import type { CsrImpactItemType } from "@/lib/csrImpactApi";

type CsrBookmarkEntry = {
  item_id: string;
  item_type: string;
  item_title: string | null;
  item_subtitle: string | null;
  bookmarked_at: string;
};

const getStorageKey = () => {
  const uid = auth.currentUser?.uid ?? "anonymous";
  return `tss_csr_bookmarks_${uid}`;
};

const readStorage = (): CsrBookmarkEntry[] => {
  try {
    const raw = localStorage.getItem(getStorageKey());
    if (!raw) return [];
    return JSON.parse(raw) as CsrBookmarkEntry[];
  } catch {
    return [];
  }
};

const writeStorage = (items: CsrBookmarkEntry[]) => {
  try {
    localStorage.setItem(getStorageKey(), JSON.stringify(items));
  } catch {
    // Storage quota exceeded — fail silently
  }
};

/**
 * Load all bookmarked CSR item IDs as a Record<itemId, true> map.
 */
export const loadCsrBookmarkIds = async (): Promise<Record<string, boolean>> => {
  const items = readStorage();
  return Object.fromEntries(items.map((b) => [b.item_id, true]));
};

/**
 * Add or remove a CSR bookmark.
 */
export const persistCsrBookmark = async (
  itemType: CsrImpactItemType,
  itemId: string,
  bookmarked: boolean,
  meta?: { item_title?: string; item_subtitle?: string }
): Promise<void> => {
  const items = readStorage();

  if (bookmarked) {
    const existing = items.findIndex((b) => b.item_id === itemId);
    const entry: CsrBookmarkEntry = {
      item_id: itemId,
      item_type: `csr:${itemType}`,
      item_title: meta?.item_title ?? null,
      item_subtitle: meta?.item_subtitle ?? null,
      bookmarked_at: new Date().toISOString(),
    };
    if (existing >= 0) {
      items[existing] = entry;
    } else {
      items.unshift(entry);
    }
  } else {
    const idx = items.findIndex((b) => b.item_id === itemId);
    if (idx >= 0) items.splice(idx, 1);
  }

  writeStorage(items);
};
