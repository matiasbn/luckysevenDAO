import { Drizzle } from '@drizzle/store';

import OracleRBAC from '../contracts/OracleRBAC.json';

const drizzle = new Drizzle({
  contracts: [
    OracleRBAC,
  ],
  events: {
    OracleRBAC: [
      'LogNumberAsked',
      'LogNumberDelivered',
    ],
  },
});
export default drizzle;
