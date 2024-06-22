/** @type {import("prettier").Config} */
module.exports = {
  trailingComma: 'es5',
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ]
};
