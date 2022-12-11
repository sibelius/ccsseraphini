import { getMessageContent } from './getMessageContent';

const users = {
  '749641174410854402': 'user1',
  '878278723980981323': 'user2',
};

test.each([
  ['message without users', 'message without users'],
  ['<@749641174410854402>', '@user1'],
  ['<@749641174410854402> some message', '@user1 some message'],
  [
    '<@878278723980981323> some message <@749641174410854402>',
    '@user2 some message @user1',
  ],
  ['<@749641174410854402> <@878278723980981323>', '@user1 @user2'],
])('test getMessageContent: %s', async (discordMessage, finalMessage) => {
  const message: any = {
    content: discordMessage,
    client: {
      users: {
        fetch: async (id: string) => {
          return { username: users[id] };
        },
      },
    },
  };

  expect(await getMessageContent(message)).toBe(finalMessage);
});

test('limit message length', async () => {
  const message: any = {
    content: 'a'.repeat(300),
  };

  expect(await getMessageContent(message)).toBe('a'.repeat(280));
});
