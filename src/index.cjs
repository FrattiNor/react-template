/* eslint-disable @typescript-eslint/no-var-requires */
const { colorMap } = require('./utils.cjs');
const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, './data.txt'), { encoding: 'utf-8' });

const v = data.replaceAll('\\', '/').match(/isdm-apps\/isdm-web\/.*useColumns.tsx/g);

const pathList = v.map((item) => `D:/code/isdm_web/${item}`);

console.log(pathList);

try {
    pathList.forEach((item) => {
        let fileStr = fs.readFileSync(item, { encoding: 'utf-8' });
        //
        fileStr = fileStr.replaceAll(': TableColumns<', ': Table2Columns<');
        //
        fileStr = fileStr.replaceAll(
            'const { createListInnerFilter } = useListInnerFilter();',
            'const { createList2InnerFilter } = useList2InnerFilter();',
        );
        //
        fileStr = fileStr.replaceAll('const { locationFilter, areaFilter } =', 'const { locationFilterProps, areaFilterProps } =');
        //
        fileStr = fileStr.replaceAll('filter: createListInnerFilter({', '...createList2InnerFilter({');
        //
        fileStr = fileStr.replaceAll(
            'onCell: ({ factoryModelPath }) => ({ title: notEmpty(factoryModelPath) }),',
            'onCellTitle: ({ factoryModelPath }) => notEmpty(factoryModelPath),',
        );
        //
        fileStr = fileStr.replaceAll('filter: locationFilter', '...createList2InnerFilter(locationFilterProps)');
        //
        fileStr = fileStr.replaceAll('filter: areaFilter', '...createList2InnerFilter(areaFilterProps)');
        //
        fileStr = fileStr.replaceAll('onCell: () => ({ cellInnerStyle: { padding: 0 } }),', 'onCellStyle: () => ({ padding: 0 }),');
        //
        fileStr = fileStr.replaceAll('onCell: ({ userCode }) => ({ title: userCode }),', 'onCellTitle: ({ userCode }) => notEmpty(userCode),');
        //
        fileStr = fileStr.replaceAll(
            'onCell: ({ authorCode }) => ({ title: authorCode }),',
            'onCellTitle: ({ authorCode }) => notEmpty(authorCode),',
        );
        //
        fileStr = fileStr.replaceAll(
            'onCell: ({ userNameCode }) => ({ title: userNameCode }),',
            'onCellTitle: ({ userNameCode }) => notEmpty(userNameCode),',
        );
        //
        fileStr = fileStr.replaceAll(
            'onCell: ({ ackUserCode }) => ({ title: ackUserCode }),',
            'onCellTitle: ({ ackUserCode }) => notEmpty(ackUserCode),',
        );
        //
        fileStr = fileStr.replaceAll(
            'onCell: ({ handleUserCode }) => ({ title: handleUserCode }),',
            'onCellTitle: ({ handleUserCode }) => notEmpty(handleUserCode),',
        );
        //
        fileStr = fileStr.replaceAll(
            'onCell: ({ lastShelvedUserCode }) => ({ title: lastShelvedUserCode }),',
            'onCellTitle: ({ lastShelvedUserCode }) => notEmpty(lastShelvedUserCode),',
        );
        //
        fileStr = fileStr.replaceAll(
            'onCell: ({ usernameCode }) => ({ title: usernameCode }),',
            'onCellTitle: ({ usernameCode }) => notEmpty(usernameCode),',
        );
        //
        fileStr = fileStr.replaceAll('useCreatePermissionOperate(', 'useCreatePermissionOperate2(');
        //
        fileStr = fileStr.replaceAll('useCreateOperateColumn(', 'useCreateOperateColumn2(');
        //
        fileStr = fileStr.replaceAll(
            "import { useListInnerFilter } from '@/components/ListInnerFilter';",
            "import { useList2InnerFilter } from '@/components/ListInnerFilter';",
        );
        //
        fileStr = fileStr.replaceAll(
            "import useCreateOperateColumn from '@/hooks/useCreateOperateColumn';",
            "import useCreateOperateColumn2 from '@/hooks/useCreateOperateColumn2';",
        );
        //
        fileStr = fileStr.replaceAll('forceRender: true', 'colBodyForceRender: true');
        //
        fileStr = fileStr.replaceAll("import { type TableColumns } from '@react/components';", '');
        fileStr = fileStr.replaceAll(', type TableColumns', '');
        fileStr = fileStr.replaceAll('type TableColumns,', '');
        //
        if (!fileStr.includes("import { type Table2Columns } from '@table/components';")) {
            fileStr = "import { type Table2Columns } from '@table/components';\n" + fileStr;
        }
        fs.writeFileSync(item, fileStr, { encoding: 'utf-8' });
    });
} catch (e) {
    console.log(colorMap.red(String(e)));
}
