const userTweetData = {
  data: [
    {
      id: '1544495196171378688',
      public_metrics: {
        retweet_count: 1,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
      text: 'RT @tgmarinho: Parem de me enviar nft e invites para discord de nft. Não vou cair no seu golpe',
    },
    {
      id: '1544495035311394817',
      public_metrics: {
        retweet_count: 3,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
      text: 'RT @tgmarinho: Transformo seu projeto em Java Web para Node.js com React \n\nDM aberta para freeis',
    },
    {
      id: '1544434305946238976',
      public_metrics: {
        retweet_count: 2,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
      text: 'RT @sseraphini: FAANGS é a melhor maneira de estar trabalhando em Open Source?',
    },
    {
      id: '1544341150869307393',
      public_metrics: {
        retweet_count: 4,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
      text: 'RT @Vusmonth: Existe alguma desvantagem em criar uma API completa no Next.js? EU comecei a usar ele a pouco tempo e essa parada de API me d…',
    },
    {
      id: '1544331096149860357',
      public_metrics: {
        retweet_count: 5,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
      text: 'RT @renat0sp: Criei um gist aqui com repositórios pra quem tá afim de aprender GraphQL/Relay, caso você tenha algum outro pode adicionar ta…',
    },
    {
      id: '1544330843572805637',
      public_metrics: {
        retweet_count: 9,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
      text: 'RT @sseramemes: então esses são os testemunhas de Jsova? https://t.co/tOMA6sy5nr',
    },
    {
      id: '1544330742548910082',
      public_metrics: {
        retweet_count: 9,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
      text: 'RT @renatarko_: Você já se perguntou ou se pergunta: "como pedir ajuda para devs?"\n\n➡️ Este guia pode te ajudar!\n\ncc \n@sseraphini \n\n#DEVCom…',
    },
    {
      id: '1544327367828594690',
      public_metrics: {
        retweet_count: 26,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
      text: 'RT @sseraphini: Alguma dica sobre como aprender inglês? Consigo ler bem, mas tenho dificuldade para formular frases, falar e escutar.',
    },
    {
      in_reply_to_user_id: '2313873457',
      id: '1544315579733082118',
      public_metrics: {
        retweet_count: 0,
        reply_count: 0,
        like_count: 1,
        quote_count: 0,
      },
      text: '@sseraphini Authorized devices, location',
    },
    {
      id: '1544290729492627456',
      public_metrics: {
        retweet_count: 6,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
      text: 'RT @X8ING_: 📢 CAAAAAAAAAAVALO... https://t.co/9tAIsvEfe5',
    },
  ],
  meta: {
    result_count: 10,
    newest_id: '1544495196171378688',
    oldest_id: '1544290729492627456',
    next_token: '7140dibdnow9c7btw4228efbq5wlhsgfsczwpu8mim6nq',
  },
};

export const userTweets = (userId: string, access_token: string) => {
  return new Promise((res) => {
    process.nextTick(() => {
      if (!access_token) {
        throw '401';
      }

      const data =
        userId === '1070750548608147456' ? userTweetData : { data: [] };

      res(data);
    });
  });
};
