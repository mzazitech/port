declare module "yt-search" {
  interface YtsVideoAuthor {
    name: string;
    url?: string;
  }

  interface YtsVideoResult {
    videoId: string;
    title: string;
    thumbnail: string;
    timestamp?: string;
    views?: number;
    author?: YtsVideoAuthor;
  }

  interface YtsSearchResult {
    videos: YtsVideoResult[];
  }

  function yts(query: string): Promise<YtsSearchResult>;

  export = yts;
}
