// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// THIS ONE APPLY TO YOUR LOCAL HOST
export const environment = {
  production: false,
  isServer: false,
  connectToProdServer: true,
  // for prerender
  host: 'http://localhost:4000',
  testServer: 'https://d37obqt8auz0g7.cloudfront.net',
  prodServer: 'https://d301o2k9w88zoi.cloudfront.net',
};
