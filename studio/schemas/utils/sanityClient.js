import { createClient } from '@sanity/client'

export default createClient({
  projectId: 'lczkooib',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: false,
});
