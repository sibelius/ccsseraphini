import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from './config';
import { createPoll, handleVoting } from './handleVoting';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, () => {
  console.log('opa 🚀');
});

client.on(Events.MessageCreate, createPoll);
client.on(Events.MessageReactionAdd, handleVoting);

client.login(config.DISCORD_BOT_TOKEN);
