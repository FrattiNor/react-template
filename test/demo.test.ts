import { sum, asyncFun, copy, createArray, throwError, getStr, testInclude } from './demo';

// toBeNull                 // null
// toBeUndefined            // undefined
// toBeDefined              // 和undefined相反
// toBeTruthy               // true
// toBeFalsy                // false

// toBeGreaterThan          // 大于
// toBeGreaterThanOrEqual   // 大于等于
// toBeLessThan             // 小于
// toBeLessThanOrEqual      // 小于等于
// toBeCloseTo              // 匹配浮点小数

describe('test demo', () => {
    test('function sum', () => {
        expect(sum(1, 2)).toBe(3);
        expect(sum(1, 2)).not.toBe(4);
    });

    test('function asyncFun', async () => {
        expect(await asyncFun(3)).toBe(3);
    });

    test('function copy', () => {
        const obj = { a: 'a' };
        expect(copy(obj)).toEqual(obj);
        expect(copy(obj)).not.toBe(obj);
    });

    test('function createArray', () => {
        expect(createArray(3)).toHaveLength(3);
    });

    test('function throwError', () => {
        const wrapper = () => throwError('okk');
        expect(wrapper).toThrow('okk');
    });

    test('function getStr', () => {
        expect(getStr('azz123')).toMatch(/azz\d{3}/);
    });

    test('function testInclude', () => {
        expect(testInclude(['1', '2', '3'])).toContain('1');
    });
});
