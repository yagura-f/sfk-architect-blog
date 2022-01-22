import { createClient } from 'microcms-js-sdk';

export const cmsClient = createClient({
  serviceDomain: 'sfk-architect-blog-test',
  apiKey: process.env.API_KEY || "",
});