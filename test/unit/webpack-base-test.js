const assert = require('assert')
describe('webpack.base.js test case', () => {
    const baseConfig = require('../../lib/webpack.base')
    // console.log(baseConfig)
    it('entry', () => {
        assert.equal(baseConfig.entry.index, '/Users/huangchuting/Documents/webpack_practice/builder-webpack/test/smoke/template/src/entry/index/index.js')
        assert.equal(baseConfig.entry.search, '/Users/huangchuting/Documents/webpack_practice/builder-webpack/test/smoke/template/src/entry/search/index.js')
    })
})