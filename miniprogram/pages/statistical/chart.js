import { Chart, Interval, Axis, Legend  } from '@antv/f2';
import { jsx as _jsx } from "@antv/f2/jsx-runtime";
import { jsxs as _jsxs } from "@antv/f2/jsx-runtime";
export default (props => {
  const {
    data
  } = props;
  // data的x轴name，y轴name，Interval：绘制区域
  return _jsxs(Chart, {
    data: data,
    children: [
    _jsx(Axis, {
      field: "genre"
    }),
     _jsx(Axis, {
      field: "sold"
    }),
    _jsx(Legend ,{
      position: "top"
    }),
    _jsx(Interval, {
      x: "genre",
      y: "sold",
      color: "name",
      selection: {
        selectedStyle: {
          fillOpacity: 1
        },
        unSelectedStyle: {
          fillOpacity: 0.4
        }
      },
      adjust: {
        type: 'dodge',
        marginRatio: 0.05, // 设置分组间柱子的间距
      }
    })
  ]
  });
});