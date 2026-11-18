export type ArtworkMotif =
  | "monolith"
  | "horizon"
  | "eclipse"
  | "prism"
  | "waves"
  | "grid"
  | "spire"
  | "orbit";

export interface Nominee {
  id: string;
  title: string;
  studio: string;
  genre: string;
  year?: string;
  image?: string;
  palette: {
    primary: string;
    secondary: string;
    motif: ArtworkMotif;
  };
}

export interface Category {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  featured?: boolean;
  nominees: Nominee[];
}

export interface VoterProfile {
  username: string;
  avatar: string | null;
}

export type VotesMap = Record<string, string>;

export type AppView = "categories" | "vote" | "results";
