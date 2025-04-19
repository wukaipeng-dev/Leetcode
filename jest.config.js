module.exports = {
    // 测试环境
    testEnvironment: 'node',
    
    // 测试文件的匹配模式
    testMatch: ['**/*.test.js'],
    
    // 在每次测试前显示测试用例描述
    verbose: true,
    
    // 显示测试覆盖率报告
    collectCoverage: true,
    coverageDirectory: 'coverage',
    
    // 监视哪些文件的变化
    watchPathIgnorePatterns: ['node_modules'],
    
    // 设置测试超时时间（毫秒）
    testTimeout: 5000
}; 