/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 120,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: true,

  plugins: [require.resolve('prettier-plugin-astro'), require.resolve('prettier-plugin-tailwindcss')],

  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
};
