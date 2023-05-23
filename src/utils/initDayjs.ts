import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import ZhCn from 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';

dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.locale(ZhCn);
