# cc @sseraphini / web

[cc @sseraphini article](https://sibelius.substack.com/p/cc-sseraphini)

## Setting up the environment variables

Before running the project it is needed to create a .env file in the root of the project similar as is in .env.example, but replacing the variables to the correct ones.

### TWITTER_BEARER_TOKEN

This is the Twitter API Bearer Token. You can get a new one with the following steps:

- Access https://developer.twitter.com/en/portal/dashboard
- Setup a new developer account. It can be a twitter account that you already have
- Create a new project
- Create an app inside the project
- After that you will have the API Key, the Bearer Token and the Access Token. In this case we will only need the Bearer Token. After this just add it to the .env file and you are all set.

### TWITTER_CLIENT_ID & TWITTER_CLIENT_SECRET

- Access https://developer.twitter.com/en/portal/dashboard
- Access settings from the project that you are already using to obtain the TWITTER_BEARER_TOKEN
- Go to Edit in "User authentication settings" section
- Turn on OAuth 2.0 and set the "type of app" to "Single page App"
- Add the Redirect URL (e.g.: http://localhost:3000/api/auth/callback/twitter) and all other required fields
- Access the "Key and Tokens" section
- Copy OAuth 2.0 Client ID and Client Secret
- Add to .env (TWITTER_CLIENT_ID and TWITTER_CLIENT_SECRET)

### NEXTAUTH_SECRET

- Generate a NEXTAUTH_SECRET (You could use `openssl rand -hex 32` on Linux; Or go to https://generate-secret.now.sh/32)
- Add the new generated NEXTAUTH_SECRET to .env

### Sentry

- Create an account and a project: https://sentry.io/
- Go to the https://sentry.io/settings/YOUR_ORG/projects/YOUR_PROJECT/keys/ to get the SENTRY_DSN
- Add the .env, look .env.example
- You can see in the sentry dashboard the logs by category: 'development' and 'production'
- [Link utils](https://github.com/sibelius/ccsseraphini/issues/345#issuecomment-1089593688)
