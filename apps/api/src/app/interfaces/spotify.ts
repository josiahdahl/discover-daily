export interface PagingObject<T> {
  href: string;
  items: T[];
  limit: number;
  next: string;
  offset: number;
  previous: string | null,
  total: number;
}

export interface SpotifyTokenDto {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number;
  width: number;
  url: string;
}

export enum AlbumType {
  single = 'single',
  album = 'album',
  compilation = 'compilation',
}

export interface SimpleArtist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
}

export interface SimpleAlbum {
  album_type: AlbumType;
  artists: SimpleArtist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  type: 'album';
  uri: string;
}

export interface NewReleasesDto {
  albums: PagingObject<SimpleAlbum>;
}
