import { RecurrenceRule } from 'node-schedule';
import { config } from '../../config';

const getRuleFromConfig = (varName: string) => {
  const hourTimeString = config[varName];

  if (!hourTimeString) {
    console.error(`${varName} is not defined in config`);
    return;
  }

  const [hour, minute] = hourTimeString.split(':');

  return new RecurrenceRule(
    null,
    null,
    null,
    null,
    parseInt(hour),
    parseInt(minute),
  );
};

export default getRuleFromConfig;
