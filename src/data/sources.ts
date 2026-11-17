// Bibliography for the whole site. Only real, primary sources (official press releases and credits, King's
// published works), then reputable trade press. Each entry must be verified before it is added; never invent one.
export interface Source {
  /** Anchor id on the sources page: `source-<id>`. */
  id: string;
  /** Author or organisation, e.g. "HBO". */
  author: string;
  title: string;
  /** Publisher or outlet. */
  publisher: string;
  /** Publication date, ISO `YYYY-MM-DD`. */
  date: string;
  url?: string;
  /** Date the URL was last checked, ISO `YYYY-MM-DD`. */
  accessed?: string;
}

export const sources: Source[] = [];

/** Note number (1-based) of a source, in bibliography order, so inline notes and the sources page agree. */
export const noteNumber = (id: string): number => {
  const index = sources.findIndex((s) => s.id === id);
  if (index === -1) throw new Error(`Unknown source "${id}" — add it to src/data/sources.ts first.`);
  return index + 1;
};
