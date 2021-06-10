// eslint-disable-next-line @typescript-eslint/no-var-requires
const CracoAntDesignPlugin = require('craco-antd');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CracoAlias = require('craco-alias');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const resolve = (route) => path.resolve(__dirname, route);
module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#50a8c0',
        },
      },
    },
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: resolve('./tsconfig.extend.json'),
      },
    },
  ],
  babel: {
    plugins: [
      ['import', { libraryName: 'antd', style: true }, 'pc'],
    ],
  },
};
