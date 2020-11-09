export interface SpotifyRefreshRequestDto {
  grant_type: 'refresh_token';
  refresh_token: string;
}

export interface SpotifyRefreshResponseDto {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
}
