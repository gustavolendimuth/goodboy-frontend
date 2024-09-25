import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: process.env.REACT_APP_PROJECT_ID,
  dataset: process.env.REACT_APP_PROJECT_DATASET,
  apiVersion: '2021-10-21',
  useCdn: false,
});
