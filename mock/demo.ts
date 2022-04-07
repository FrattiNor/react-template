import Mock from 'mockjs';
import { isMock } from '@/env';

if (isMock) {
    Mock.mock('/mock/v0/test', 'get', { code: 0, data: 'TEST' });
}
