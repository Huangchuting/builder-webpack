# 说明
```json
"scripts": {
    "test": "./node_modules/.bin/_mocha", // 单元测试
    "test-istanbul": "istanbul cover ./node_modules/.bin/_mocha", // 测试覆盖率
    // node test/smoke/index.js // 冒烟测试
    "eslint": "eslint ./lib --fix" // eslint检查
  }
```