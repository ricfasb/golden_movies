export interface TopStudioResponse {
  studios: TopStudio[];
}

export interface TopStudio {
  name: string;
  winCount: number;
}