-- Network bookmarks table: stores bookmarked network items per user
CREATE TABLE IF NOT EXISTS public.network_bookmarks (
  id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id text NOT NULL,
  item_type text NOT NULL DEFAULT 'unknown',
  item_title text,
  item_subtitle text,
  bookmarked_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(user_id, item_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS network_bookmarks_user_id_idx ON public.network_bookmarks(user_id);

-- Enable RLS
ALTER TABLE public.network_bookmarks ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own bookmarks"
  ON public.network_bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookmarks"
  ON public.network_bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON public.network_bookmarks FOR DELETE
  USING (auth.uid() = user_id);
