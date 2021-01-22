import {Step} from '../model/step.model';

export const steps: Step[] = [
  {
    boxes: [
      {
        name: 'P.EqualWeight',
        position: { x: 43, y: 99 },
        gates: [],
        id: '104236d0-d75d-40f2-acf4-3a03187bf62c',
        stepId: 'a16e145c-a309-4f00-a317-db0971839036',
        arrows: [],
        links: [],
      },
      {
        name: 'P.VolatilityWeighted',
        position: { x: 43, y: 247 },
        gates: [],
        id: '9a59088c-e67a-4012-8686-7d26810afde0',
        stepId: 'a16e145c-a309-4f00-a317-db0971839036',
        arrows: [],
        links: [],
      },
    ].map(el => new Box(el)),
    id: 'a16e145c-a309-4f00-a317-db0971839036',
    width: 210,
    position: { xStart: 0, xEnd: 210 },
    highlight: false,
  },
  {
    boxes: [
      {
        name: 'MD.EOD',
        position: { x: 253, y: 116 },
        gates: [],
        id: 'b3a15f7a-d9f3-4a25-a25f-84f93492d88d',
        stepId: '36967717-ff6c-4190-bf50-c7d0d6bf3d90',
        arrows: [],
        links: [],
      },
    ],
    id: '36967717-ff6c-4190-bf50-c7d0d6bf3d90',
    width: 210,
    position: { xStart: 210, xEnd: 420 },
    highlight: false,
  },
  {
    boxes: [
      {
        name: 'CA.Exeptions Rule',
        position: { x: 463, y: 128 },
        gates: [],
        id: '3c98fded-e782-4ac2-9525-ea1584fb63cd',
        stepId: '237f13ca-d229-4397-850e-6fc68f818bcb',
        arrows: [],
        links: [],
      },
    ],
    id: '237f13ca-d229-4397-850e-6fc68f818bcb',
    width: 210,
    position: { xStart: 420, xEnd: 630 },
    highlight: false,
  },
];
