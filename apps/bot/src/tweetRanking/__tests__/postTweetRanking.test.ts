import postTweetRanking from "../postTweetRanking";
import createPostFromRankedTweets from "../createPostFromRankedTweets";
import { getDayBeforeDate } from "../../date/getDayBeforeDate";

jest.mock('../createPostFromRankedTweets');

it.each([
  {
    num: 1,
    name: "daily",
    date: new Date(2022, 7, 2, 19, 8, 0, 0),
    expected: {
      since: new Date(2022, 7, 1, 0, 0, 0, 0),
      until: new Date(2022, 7, 1, 23, 59, 59, 999),
    }
  },
  {
    num: 2,
    name: "weekly",
    date: new Date(2022, 11, 5, 19, 0, 0, 0),
    expected: {
      since: new Date(2022, 10, 28, 0, 0, 0, 0),
      until: new Date(2022, 11, 4, 23, 59, 59, 999),
    }
  },
  {
    num: 3,
    name: "biweekly 1",
    date: new Date(2022, 1, 14, 19, 8, 0, 0),
    expected: {
      since: new Date(2022, 1, 1, 0, 0, 0, 0),
      until: new Date(2022, 1, 13, 23, 59, 59, 999),
    }
  },
  {
    num: 4,
    name: "biweekly 2",
    date: new Date(2022, 1, 28, 19, 8, 0, 0),
    expected: {
      since: new Date(2022, 1, 14, 0, 0, 0, 0),
      until: new Date(2022, 1, 27, 23, 59, 59, 999),
    }
  },
  {
    num: 5,
    name: "monthly",
    date: new Date(2022, 2, 1, 19, 8, 0, 0),
    expected: {
      since: new Date(2022, 1, 1, 0, 0, 0, 0),
      until: new Date(2022, 1, 28, 23, 59, 59, 999),
    }
  },
])("should post ranking", async ({ num, date, expected }) => {
  (createPostFromRankedTweets as jest.Mock).mockImplementation(async () => Promise.resolve());

  await postTweetRanking(getDayBeforeDate(date));

  expect(createPostFromRankedTweets).toHaveBeenCalledWith(expected.since, expected.until);
})