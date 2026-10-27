import { BagIcon, LunchBoxIcon, FoamTrayIcon, BottleIcon, PipeIcon } from './Illustrations';

// Judgment rules (not model output). Colours match the accept / stop / redirect tags.
export const VERDICT_COLORS = {
  accept: 'var(--accent)',
  stop: 'var(--stop)',
  redirect: 'var(--redirect)',
};

export const SCAN_ITEMS = [
  { id: 'bag', Icon: BagIcon, material: 'LDPE', verdict: 'accept', reason: 'reasonAccept' },
  { id: 'bento', Icon: LunchBoxIcon, material: 'PP', verdict: 'accept', reason: 'reasonAccept' },
  { id: 'foam', Icon: FoamTrayIcon, material: 'PS', verdict: 'accept', reason: 'reasonAccept' },
  { id: 'bottle', Icon: BottleIcon, material: 'PET', verdict: 'redirect', reason: 'reasonPET' },
  { id: 'pipe', Icon: PipeIcon, material: 'PVC', verdict: 'stop', reason: 'reasonPVC' },
];
