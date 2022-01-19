# cc @sseraphini

[cc @sseraphini article](https://sibelius.substack.com/p/cc-sseraphini)

## packages/web

[sseraphini.cc](http://sseraphini.cc/)

## Setting up the environment variables

Before running the project it is needed to create a .env file in the root of the project similar as is in .env.example, but replacing the variables to the correct ones.

### TWITTER_BEARER_TOKEN

This is the Twitter API Bearer Token. You can get a new one with the following steps:

- Access https://developer.twitter.com/en/portal/dashboard
- Setup a new developer account. It can be a twitter account that you already have
- Create a new project
- Create an app inside the project
- After that you will have the API Key, the Bearer Token and the Access Token. In this case we will only need the Bearer Token. After this just add it to the .env file and you are all set.

## How to run locally

```
yarn dev
```

## packages/cli

npx ccseraphini
