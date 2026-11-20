import type { LocaleCode } from './localeRegistry';
import type { TermeLocalePack } from './pillarTerme35Types';
import { TERME_PILLAR_WEST_1 } from './pillarTerme35West1';
import { TERME_PILLAR_WEST_2A } from './pillarTerme35West2A';
import { TERME_PILLAR_WEST_2B } from './pillarTerme35West2B';
import { TERME_PILLAR_EAST_1A } from './pillarTerme35East1A';
import { TERME_PILLAR_EAST_1B } from './pillarTerme35East1B';
import { TERME_PILLAR_EAST_2A } from './pillarTerme35East2A';
import { TERME_PILLAR_EAST_2B } from './pillarTerme35East2B';

export type { TermeLocalePack };

export const TERME_PILLAR_35: Record<LocaleCode, TermeLocalePack> = {
  ...TERME_PILLAR_WEST_1,
  ...TERME_PILLAR_WEST_2A,
  ...TERME_PILLAR_WEST_2B,
  ...TERME_PILLAR_EAST_1A,
  ...TERME_PILLAR_EAST_1B,
  ...TERME_PILLAR_EAST_2A,
  ...TERME_PILLAR_EAST_2B,
};
