export interface JikanResponse<T> {
  data: T;
  pagination: Pagination;
}

export interface JikanSingleResponse<T> {
  data: T;
}

export interface JikanRelationsResponse {
    data: Relation[];
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: Image;
    webp: Image;
  };
  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
  };
  title: string;
  title_english: string | null;
  title_japanese: string;
  type: string;
  source: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to: string | null;
    prop: {
      from: DateParts;
      to: DateParts | null;
    };
    string: string;
  };
  duration: string;
  rating: string;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: number | null;
  broadcast: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
  };
  producers: MalUrl[];
  licensors: MalUrl[];
  studios: MalUrl[];
  genres: MalUrl[];
  explicit_genres: MalUrl[];
  themes: MalUrl[];
  demographics: MalUrl[];
}

export interface Image {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface DateParts {
  day: number | null;
  month: number | null;
  year: number | null;
}

export interface MalUrl {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Genre extends MalUrl {}

export interface RelationEntry {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Relation {
  relation: string;
  entry: RelationEntry[];
}