export type DeviceDetail = {
    cabinetName: string;
    category: number;
    deviceModel: string;
    deviceTag: string;
    isdmTag: string;
    mfrName: string;
    protocol: string;
    configRange: { dataType: number; unit: string; down: string; top: string };
    deviceRange: { dataType: number; unit: string; down: string; top: string };
    areaRef: string;
    deviceRevision: string;
    mfrAndDevice: string;
};
