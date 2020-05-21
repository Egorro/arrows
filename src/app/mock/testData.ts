import { Gates } from '../model/box.model';
import { Index } from '../model/index.model';


export const data = [
  {
    name: 'Universe',
    boxes: ['U.Fixed Set', 'U.Custom Rules', 'U.Index Committee'],
  },
  {
    name: 'Portfolio Method',
    boxes: [
      'P.EqualWeight',
      'P.FixedWeight',
      'P.FactorChooser',
      'P.VolatilityWeighted',
    ],
  },
  {
    name: 'Market Data',
    boxes: ['MD.EOD', 'MD.Fixing'],
  },
  { name: 'Corporate Actions', boxes: ['CA.Dividends', 'CA.Exeptions Rule'] },
  { name: 'Risk Features ', boxes: ['RF.Volatility Control'] },
  {
    name: 'Measurements',
    boxes: [
      'M.Performance Inst',
      'M.Performance Bsk',
      'M.Total Return',
      'M.LogRet Bsk',
      'M.Realized Volatility',
      'M.Exposure',
      'M.Excess Return',
      'M.Index Level',
      'M.Weights for MX',
      'M.Theo Weight ',
      'M.Effective Weight ',
    ],
  },
];

export const defaultBoxes = [
  {
    name: 'P.EqualWeight',
    position: { x: 276, y: 84 },
    gates: [{ name: 'input' }] as Gates,
  },
  {
    name: 'P.FixedWeight',
    position: { x: 130, y: 173 },
    gates: [{ name: 'output' }] as Gates,
  },
  { name: 'P.FactorChooser', position: { x: 451, y: 73 } },
];

export const indexes: Index[] = [
  { name: 'SBERARDF' },
  { name: 'SBERAUTO' },
  { name: 'SBERBPFA' },
  { name: 'SBERCCPP' },
  { name: 'SBERECCY' },
  { name: 'SBERHLCR' },
  { name: 'SBERPRPT' },
  { name: 'SBERRBTI' },
  { name: 'SBERREIT' },
  { name: 'SBERREQA' },
];
