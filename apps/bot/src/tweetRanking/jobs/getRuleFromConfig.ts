import { RecurrenceRule } from 'node-schedule';
import { config } from '../../config';

const getRuleFromConfig = (varName: string): RecurrenceRule => {
  const hourTimeString = config[varName];

  if (!hourTimeString) {
    console.error(`${varName} is not defined in config`);
    return;
  }

  const rule = new RecurrenceRule();
  rule.tz = 'America/Sao_Paulo';

  try {
    const [hour, minute] = hourTimeString.split(':');
    rule.hour = parseInt(hour, 10);
    rule.minute = parseInt(minute, 10);
  } catch (error) {
    console.error(`Error parsing ${varName} from config`);
    return;
  }

  return rule;
};

export default getRuleFromConfig;
