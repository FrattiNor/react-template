import { TooltipComponent, GridComponent, LegendComponent, DataZoomComponent } from 'echarts/components';
import { TitleComponent, DatasetComponent, MarkLineComponent } from 'echarts/components';
import { BarChart, LineChart, PieChart, GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';

const map = {
    tooltip: TooltipComponent,
    grid: GridComponent,
    legend: LegendComponent,
    dataZoom: DataZoomComponent,
    title: TitleComponent,
    dataSet: DatasetComponent,
    markLine: MarkLineComponent,
    bar: BarChart,
    line: LineChart,
    pie: PieChart,
    gauge: GaugeChart,
};

export const echartsUse = (keys: (keyof typeof map)[]) => {
    const useValue = keys.map((key) => map[key] || null).filter((item) => item);
    echarts.use([CanvasRenderer, ...useValue]);
};

export const tooltipConfig = {
    confine: true,
    backgroundColor: '#333',
    borderColor: '#333',
    textStyle: { color: '#eee' },
};

export { echarts };
