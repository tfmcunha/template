module.exports = {
  context: 'src',
  entry: {
    admin: './sass/admin.scss',
    editor: './sass/editor.scss',
    styles: './sass/theme.scss',
    scripts: './js/app.js'
  },
  devtool: 'none',
  outputFolder: 'build',
  publicFolder: 'build',
  proxyTarget: 'https://sorensoncomm.test',
  watch: ['./views/**/*.twig', './*.php']
};
