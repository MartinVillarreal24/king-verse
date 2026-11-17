// Note numbering for the whole site. Sources are numbered by first appearance on the home, walking the cycles in
// order (status notes, then body notes, then place notes), so inline notes read 1, 2, 3... down the page and the
// sources page lists them in that same order. Sources nobody cites yet go last.
import { cycles } from './cycles';
import { placesOf } from './places';
import { sources, type Source } from './sources';

const citedIds = cycles.flatMap((cycle) => [
  ...cycle.sourceIds,
  ...(cycle.body ?? []).flat().flatMap((sentence) => sentence.cite),
  ...placesOf(cycle.id).flatMap((place) => place.sourceIds),
]);

for (const id of citedIds) {
  if (!sources.some((s) => s.id === id)) throw new Error(`Unknown source "${id}" — add it to src/data/sources.ts first.`);
}

const order = [...new Set([...citedIds, ...sources.map((s) => s.id)])];

/** Every source in note order: item N is note N. */
export const orderedSources: Source[] = order.map((id) => sources.find((s) => s.id === id)!);

/** Note number (1-based) of a source, so inline notes and the sources page agree. */
export const noteNumber = (id: string): number => {
  const index = order.indexOf(id);
  if (index === -1) throw new Error(`Unknown source "${id}" — add it to src/data/sources.ts first.`);
  return index + 1;
};
