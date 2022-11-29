import { RecurrenceRule } from 'node-schedule';
import { config } from '../../config';

const getRuleFromConfig = (varName: string) => {
  const hourTimeString = config[varName];

  if (!hourTimeString) {
    console.error(`${varName} is not defined in config`);
    return;
  }

  const [hour, minute] = hourTimeString.split(':');

  const rule = new RecurrenceRule();
  rule.hour = parseInt(hour, 10);
  rule.minute = parseInt(minute, 10);
  rule.tz = 'America/Sao_Paulo';

  return rule;
};

export default getRuleFromConfig;
