/**
 * Created by Jackie.Wu on 2017/2/21.
 */
module.exports = {
    plugins: [
        require('autoprefixer')({ browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'] }),
        require('postcss-pxtorem')({
            rootValue: 100,
            propWhiteList: [],
        })
    ]
};