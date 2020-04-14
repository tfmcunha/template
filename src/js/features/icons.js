export default {
    init() {
      const files = require.context('!svg-sprite-loader!../../icons/svg/', false, /.*\.svg$/);
      files.keys().forEach(files);
    }
  };
  