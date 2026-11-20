import type { LocaleCode } from './localeRegistry';
import type { ClubbingLocalePack } from './pillarClubbing35Types';
import { CLUBBING_PILLAR_WEST_1 } from './pillarClubbing35West1';
import { CLUBBING_PILLAR_WEST_2A } from './pillarClubbing35West2A';
import { CLUBBING_PILLAR_WEST_2B } from './pillarClubbing35West2B';
import { CLUBBING_PILLAR_EAST_1A } from './pillarClubbing35East1A';
import { CLUBBING_PILLAR_EAST_1B } from './pillarClubbing35East1B';
import { CLUBBING_PILLAR_EAST_2A } from './pillarClubbing35East2A';
import { CLUBBING_PILLAR_EAST_2B } from './pillarClubbing35East2B';

export type { ClubbingLocalePack };

export const CLUBBING_PILLAR_35: Record<LocaleCode, ClubbingLocalePack> = {
  ...CLUBBING_PILLAR_WEST_1,
  ...CLUBBING_PILLAR_WEST_2A,
  ...CLUBBING_PILLAR_WEST_2B,
  ...CLUBBING_PILLAR_EAST_1A,
  ...CLUBBING_PILLAR_EAST_1B,
  ...CLUBBING_PILLAR_EAST_2A,
  ...CLUBBING_PILLAR_EAST_2B,
};
