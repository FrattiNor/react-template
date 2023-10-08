// import { gotInstance, transformObjToFormData } from './utils';
// import dayjs from 'dayjs';

// type Value = {
//     KQ_TIME: string;
// };

// const getCurrentDayTime = async (dayStr: string, ticket: string) => {
//     try {
//         const reqUrl = 'http://ubd.supcon.com/msService/adpGateway/gateway/gatewayModule/dkDataQuery';

//         const reqBody = {
//             choseDate: dayStr,
//         };

//         const reqHeaders = {
//             Cookie: `suposTicket=${ticket}`,
//         };

//         const res = await gotInstance.post(reqUrl, transformObjToFormData(reqBody, 'FormData'), { headers: reqHeaders });

//         if (res.status === 200) {
//             if (res.data.code === 200 && res.data.data !== null) {
//                 const value = res.data.data as Array<Value>;
//                 if (value.length > 1) {
//                     const start = dayjs(value[0].KQ_TIME, 'YYYY-MM-DD HH:mm:ss');
//                     const end = dayjs(value[value.length - 1].KQ_TIME, 'YYYY-MM-DD HH:mm:ss');
//                     const hour = end.diff(start, 'hour', true);
//                     const normalHour = 18.5 - 9;
//                     const addHour = normalHour >= hour ? 0 : hour - normalHour;
//                     if (addHour > 0) {
//                         console.log(`${dayStr}: [${start.format('HH:mm:ss')}, ${end.format('HH:mm:ss')}] ${addHour.toFixed(2)}`);
//                         return addHour;
//                     }
//                 }
//             }
//         }

//         return 0;
//     } catch (e) {
//         console.log('error', e);
//         return 0;
//     }
// };

// export const getTime = async ({ year: _year, month: _month }: { year?: number; month?: number }, ticket: string) => {
//     try {
//         const currentYear = dayjs().get('year');
//         if (typeof _year === 'number' && (_year > currentYear || _year < 2000)) {
//             console.error(`${1999} < year <= ${currentYear}`);
//             return;
//         }
//         if (typeof _month === 'number' && (_month < 1 || _month > 12)) {
//             console.error(`1 <= month <= 12`);
//             return;
//         }
//         const year = _year || currentYear;
//         const month = _month ? _month - 1 : dayjs().get('month'); // start 0
//         const current = dayjs().set('year', year).set('month', month);
//         const maxDay = current.endOf('month').get('date');
//         const minDay = current.startOf('month').get('date');

//         let totalHour = 0;
//         for (let i = minDay; i <= maxDay; i++) {
//             const dayStr = current.clone().set('date', i).format('YYYY-MM-DD');
//             totalHour += await getCurrentDayTime(dayStr, ticket);
//         }
//         console.log(`${current.format('YYYY-MM')}: ${totalHour.toFixed(2)}`);
//     } catch (e) {
//         console.log('error', e);
//     }
// };
