const system = {
    version: '1.0.0',
    name: 'diagrams',
    author: 'Samle',
    description: 'diagrams',
    title: 'diagrams',
    logo: require('@/assets/logo.png'),
    github: 'https://github.com/OXOYO/X-Flowchart-Vue',
    githubPages: 'http://oxoyo.co/X-Flowchart-Vue/',
    feedback: 'https://github.com/OXOYO/X-Flowchart-Vue/issues/new',
    copyright: '©2019 - 2020 OXOYO All Rights Reserved.'
}
const shapeControl = {
    // 控制器
    controllers: [
      [0, 0, 'nwse-resize'],
      [0, 0.5, 'ew-resize'],
      [0, 1, 'nesw-resize'],
      [0.5, 0, 'ns-resize'],
      [0.5, 1, 'ns-resize'],
      [1, 0, 'nesw-resize'],
      [1, 0.5, 'ew-resize'],
      [1, 1, 'nwse-resize']
    ],
    // 旋转
    rotate: true
  }

  // 锚点坐标
  const anchorPoints = [
    [0, 0],
    [0.25, 0],
    [0.5, 0],
    [0.75, 0],
    [1, 0],
    [1, 0.25],
    [1, 0.5],
    [1, 0.75],
    [1, 1],
    [0.75, 1],
    [0.5, 1],
    [0.25, 1],
    [0, 1],
    [0, 0.75],
    [0, 0.5],
    [0, 0.25]
  ]
const shortcutMap = {
    undo: { tool: 'undo', key: 'mod+z', label: 'Ctrl + Z', description: '' },
    clearLog: { tool: 'clearLog', key: 'mod+shift+l', label: 'Ctrl + Shift + L', description: '' },
    history: { tool: 'history', key: 'mod+shift+h', label: 'Ctrl + Shift + H', description: '' },
    redo: { tool: 'redo', key: 'mod+shift+z', label: 'Ctrl + shift + Z', description: '' },
    copy: { tool: 'copy', key: 'mod+c', label: 'Ctrl + C', description: '' },
    paste: { tool: 'paste', key: 'mod+v', label: 'Ctrl + V', description: '' },
    delete: { tool: 'delete', key: ['del', 'backspace'], label: 'Delete', description: '' },
    clear: { tool: 'clear', key: 'mod+shift+c', label: 'Ctrl + Shift + C', description: '' },
    zoomIn: { tool: 'zoomIn', key: ['mod+=', 'mod+plus'], label: 'Ctrl + +', description: '' },
    zoomOut: { tool: 'zoomOut', key: 'mod+-', label: 'Ctrl + -', description: '' },
    fit: { tool: 'fit', key: 'mod+0', label: 'Ctrl + 0', description: '' },
    actualSize: { tool: 'actualSize', key: 'mod+1', label: 'Ctrl + 1', description: '' },
    selectAll: { tool: 'selectAll', key: 'mod+a', label: 'Ctrl + A', description: '' },
    up: { tool: 'up', key: 'up', label: 'up', description: '' },
    down: { tool: 'down', key: 'down', label: 'down', description: '' },
    left: { tool: 'left', key: 'left', label: 'left', description: '' },
    right: { tool: 'right', key: 'right', label: 'right', description: '' },
}
export const getToolList = () => {
    let toolList = [
        // {
        //   // 工具项名称，保持唯一性，便于区分工具项
        //   name: 'logo',
        //   // 文本，无lang时可取label值显示
        //   label: 'logo',
        //   // 多语言code码
        //   lang: 'L10000',
        //   // 工具项类型，不同的工具类型在ToolBar、ContextMenu里的表现不一样
        //   type: 'link',
        //   // 工具项图标
        //   icon: '',
        //   img: system.logo,
        //   // 跳转连接
        //   link: system.site,
        //   // 是否启用该工具项，用户控制是否启用该工具项
        //   enableTool: true,
        //   // 是否启用，用于动态控制是否在界面上创建该工具项
        //   enable: true,
        //   // 启用模式，用于控制在什么模式下启用该工具项
        //   enableMode: ['edit', 'preview'],
        //   // 是否禁用，用于控制界面上已创建的工具项是否处于禁用状态
        //   disabled: false,
        //   // 禁用模式，用于控制在什么模式下该工具项处于禁用状态，详见Editor/Index.vue 中的doSetMode方法
        //   disabledMode: ['edit', 'preview'],
        //   // 热键
        //   shortcuts: '',
        //   // 工具栏
        //   toolbar: {
        //     // 是否启用
        //     enable: true,
        //     // 位置
        //     position: 'left',
        //     // 样式
        //     style: {
        //       opacity: 1
        //     },
        //     // 分割线，是否在该工具项后显示分割线，ToolBar中为竖线，ContextMenu中为横线
        //     divider: false
        //   },
        //   // 右键菜单
        //   contextmenu: {
        //     // 是否启用
        //     enable: false,
        //     // 目标元素类型，用于控制在什么元素上可以显示该工具项
        //     target: [],
        //     style: {},
        //     // 分割线，是否在该工具项后显示分割线，ToolBar中为竖线，ContextMenu中为横线
        //     divider: false
        //   }
        // },
        {
          name: 'undo',
          label: 'Undo',
          lang: 'L10001',
          type: 'normal',
          icon: 'undo',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: shortcutMap.undo,
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: false
          }
        },
        {
          name: 'clearLog',
          label: 'ClearLog',
          lang: 'L10032',
          type: 'normal',
          icon: 'clear-log',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: shortcutMap.clearLog,
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: false
          }
        },
        {
          name: 'history',
          label: 'history',
          lang: 'L10041',
          type: 'normal',
          icon: 'history',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: shortcutMap.history,
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: false
          }
        },
        {
          name: 'redo',
          label: 'Redo',
          lang: 'L10002',
          type: 'normal',
          icon: 'redo',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: shortcutMap.redo,
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: true
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: true
          }
        },
        {
          name: 'copy',
          label: 'Copy',
          lang: 'L10003',
          type: 'normal',
          icon: 'copy',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          // FIXME 通用mod助手用于设置跨平台快捷方式，用于将command+c在Windows和Linux上映射到mod+c
          shortcuts: shortcutMap.copy,
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['node', 'edge'],
            style: {},
            divider: false
          }
        },
        {
          name: 'paste',
          label: 'Paste',
          lang: 'L10004',
          type: 'normal',
          icon: 'paste',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: shortcutMap.paste,
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['canvas', 'node', 'edge'],
            style: {},
            divider: false
          }
        },
        {
          name: 'delete',
          label: 'Delete',
          lang: 'L10010',
          type: 'normal',
          icon: 'delete',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: shortcutMap.delete,
          toolbar: {
            enable: false,
            position: 'center',
            style: {},
            divider: true
          },
          contextmenu: {
            enable: true,
            target: ['node', 'edge'],
            style: {},
            divider: true
          }
        },
        {
          name: 'clear',
          label: 'Clear',
          lang: 'L10005',
          type: 'normal',
          icon: 'clear',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: shortcutMap.clear,
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: true
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: true
          }
        },
        {
          name: 'zoom',
          label: 'Zoom',
          lang: 'L10029',
          type: 'dropdown-list',
          icon: 'zoom',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit', 'preview'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: false
          },
          // 默认选中项index
          selected: 3,
          // 自定义值对象
          custom: {
            name: 'custom',
            label: '',
            lang: '',
            type: 'normal',
            icon: '',
            data: '',
            enable: false
          },
          // 锁定下拉菜单label
          lockLabel: false,
          // 子节点
          children: [
            {
              name: '25%',
              label: '25%',
              lang: '',
              type: 'normal',
              icon: '',
              data: 0.25,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: '50%',
              label: '50%',
              lang: '',
              type: 'normal',
              icon: '',
              data: 0.5,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: '75%',
              label: '75%',
              lang: '',
              type: 'normal',
              icon: '',
              data: 0.75,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: '100%',
              label: '100%',
              lang: '',
              type: 'normal',
              icon: '',
              data: 1,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: '125%',
              label: '125%',
              lang: '',
              type: 'normal',
              icon: '',
              data: 1.25,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: '150%',
              label: '150%',
              lang: '',
              type: 'normal',
              icon: '',
              data: 1.5,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: '200%',
              label: '200%',
              lang: '',
              type: 'normal',
              icon: '',
              data: 2,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: '300%',
              label: '300%',
              lang: '',
              type: 'normal',
              icon: '',
              data: 3,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: '400%',
              label: '400%',
              lang: '',
              type: 'normal',
              icon: '',
              data: 4,
              enable: true,
              disabled: false,
              divider: false
            }
          ]
        },
        {
          name: 'zoomIn',
          label: 'Zoom In',
          lang: 'L10006',
          type: 'normal',
          icon: 'zoom-in',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit', 'preview'],
          // FIXME mod+= 用于支持主键盘区的+，mod+plus用于支持数字键盘区的+
          shortcuts: shortcutMap.zoomIn,
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: false
          }
        },
        {
          name: 'zoomOut',
          label: 'Zoom Out',
          lang: 'L10007',
          type: 'normal',
          icon: 'zoom-out',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit', 'preview'],
          shortcuts: shortcutMap.zoomOut,
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: true
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: true
          }
        },
        {
          name: 'fit',
          label: 'Fit',
          lang: 'L10008',
          type: 'normal',
          icon: 'fit',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit', 'preview'],
          shortcuts: shortcutMap.fit,
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: false
          }
        },
        {
          name: 'actualSize',
          label: 'Actual Size',
          lang: 'L10009',
          type: 'normal',
          icon: 'actual-size',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit', 'preview'],
          shortcuts: shortcutMap.actualSize,
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: false
          }
        },
        {
          name: 'canvasBackground',
          label: 'Canvas background',
          lang: 'L10034',
          type: 'dropdown-list',
          icon: 'canvas-background',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit', 'preview'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: true
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: true
          },
          // 默认选中项index
          selected: 0,
          lockLabel: true,
          // 子节点
          children: [
            {
              name: 'default',
              label: 'Default',
              lang: 'L10039',
              type: 'normal',
              icon: '',
              style: {},
              data: 'default',
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'image',
              label: 'Image',
              lang: 'L10040',
              type: 'normal',
              icon: '',
              style: {},
              data: 'image',
              enable: true,
              disabled: false,
              divider: false
            }
          ]
        },
        {
          name: 'fill',
          label: 'fill',
          lang: 'L10011',
          type: 'dropdown-color-picker',
          icon: 'fill',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['node', 'edge'],
            style: {},
            divider: false
          }
        },
        {
          name: 'lineColor',
          label: 'line color',
          lang: 'L10012',
          type: 'dropdown-color-picker',
          icon: 'line-color',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['node', 'edge'],
            style: {},
            divider: false
          }
        },
        {
          name: 'lineWidth',
          label: 'line width',
          lang: 'L10013',
          type: 'dropdown-list',
          icon: 'line-width',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['node', 'edge'],
            style: {},
            divider: false
          },
          // 默认选中项index
          selected: 0,
          lockLabel: true,
          // 子节点
          children: [
            {
              name: 1,
              label: '1px',
              lang: '',
              type: 'normal',
              icon: '',
              data: 1,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 2,
              label: '2px',
              lang: '',
              type: 'normal',
              icon: '',
              data: 2,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 3,
              label: '3px',
              lang: '',
              type: 'normal',
              icon: '',
              data: 3,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 4,
              label: '4px',
              lang: '',
              type: 'normal',
              icon: '',
              data: 4,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 5,
              label: '5px',
              lang: '',
              type: 'normal',
              icon: '',
              data: 5,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 6,
              label: '6px',
              lang: '',
              type: 'normal',
              icon: '',
              data: 6,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 7,
              label: '7px',
              lang: '',
              type: 'normal',
              icon: '',
              data: 7,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 8,
              label: '8px',
              lang: '',
              type: 'normal',
              icon: '',
              data: 8,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 9,
              label: '9px',
              lang: '',
              type: 'normal',
              icon: '',
              data: 9,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 10,
              label: '10px',
              lang: '',
              type: 'normal',
              icon: '',
              data: 10,
              enable: true,
              disabled: false,
              divider: false
            }
          ]
        },
        {
          name: 'lineDash',
          label: 'line style',
          lang: 'L10014',
          type: 'dropdown-list',
          icon: 'line-style',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: true
          },
          contextmenu: {
            enable: true,
            target: ['node', 'edge'],
            style: {},
            divider: true
          },
          // 默认选中项index
          selected: 0,
          lockLabel: false,
          // 子节点
          children: [
            {
              name: 'solid',
              label: 'solid',
              lang: '',
              type: 'normal',
              icon: 'solid',
              data: 'solid',
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'dashed',
              label: 'dashed',
              lang: '',
              type: 'normal',
              icon: 'dashed',
              data: 'dashed',
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'dot',
              label: 'dot',
              lang: '',
              type: 'normal',
              icon: 'dot',
              data: 'dot',
              enable: true,
              disabled: false,
              divider: false
            }
          ]
        },
        {
          name: 'lineType',
          label: 'line type',
          lang: 'L10015',
          type: 'dropdown-list',
          icon: '',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['edge'],
            style: {},
            divider: false
          },
          // 默认选中项index
          selected: 0,
          lockLabel: false,
          // 子节点
          children: [
            {
              name: 'x-line',
              label: 'line',
              lang: '',
              type: 'normal',
              icon: 'flow-line',
              data: 'x-line',
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'x-broken',
              label: 'broken',
              lang: '',
              type: 'normal',
              icon: 'flow-broken',
              data: 'x-broken',
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'x-cubic',
              label: 'cubic',
              lang: '',
              type: 'normal',
              icon: 'flow-curve',
              data: 'x-cubic',
              enable: true,
              disabled: false,
              divider: false
            }
          ]
        },
        {
          name: 'startArrow',
          label: 'start arrow',
          lang: 'L10016',
          type: 'dropdown-list',
          icon: '',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['edge'],
            style: {
              'white-space': 'nowrap'
            },
            divider: false
          },
          // 默认选中项index
          selected: 0,
          lockLabel: false,
          // 子节点
          children: [
            {
              name: 'none',
              label: 'none',
              lang: '',
              type: 'normal',
              icon: 'solid',
              style: {},
              data: false,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'solidArrow',
              label: 'solid arrow',
              lang: '',
              type: 'normal',
              icon: 'solid-arrow',
              style: {},
              data: {
                style: {
                  path: 'M0,0 L20,-10 L20,10 Z',
                  d: 0
                },
                fill: true
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'normalArrow',
              label: 'normal arrow',
              lang: '',
              type: 'normal',
              icon: 'normal-arrow',
              style: {},
              data: {
                style: {
                  path: 'M0,0 L20,10 L20.707,9.293 L1.432,0 L20.707,-9.293 L20,-10 Z',
                  d: 0
                },
                fill: false
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'asynchArrow',
              label: 'asynch arrow',
              lang: '',
              type: 'normal',
              icon: 'asynch-arraw',
              style: {},
              data: {
                style: {
                  path: 'M0,0 L20,10 L20.707,9.293 L1.432,0 Z',
                  d: 0
                },
                fill: false
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'diamondArrow',
              label: 'diamond arrow',
              lang: '',
              type: 'normal',
              icon: 'diamond-arrow',
              style: {},
              data: {
                style: {
                  path: 'M0,0 L20,10 L20.707,9.293 L38.568,0 L20.707,-9.293 L20,-10 Z',
                  d: 0
                },
                fill: true
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'diamondArrowEmpty',
              label: 'diamond arrow empty',
              lang: '',
              type: 'normal',
              icon: 'diamond-arrow-empty',
              style: {},
              data: {
                style: {
                  path: 'M0,0 L20,10 L20.707,9.293 L38.568,0 L20.707,-9.293 L20,-10 Z',
                  d: 0,
                  fill: '#FFFFFF'
                },
                fill: false
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'circleArrow',
              label: 'circle arrow',
              lang: '',
              type: 'normal',
              icon: 'circle-arrow',
              style: {},
              data: {
                style: {
                  path: 'M-10,0 A5,5,0,1,0,10,0 A5,5,0,1,0,-10,0 Z',
                  d: 0
                },
                fill: true
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'circleArrowEmpty',
              label: 'circle arrow empty',
              lang: '',
              type: 'normal',
              icon: 'circle-arrow-empty',
              style: {},
              data: {
                style: {
                  path: 'M-10,0 A5,5,0,1,0,10,0 A5,5,0,1,0,-10,0 Z',
                  d: 0,
                  fill: '#FFFFFF'
                },
                fill: false
              },
              enable: true,
              disabled: false,
              divider: false
            }
          ]
        },
        {
          name: 'endArrow',
          label: 'end arrow',
          lang: 'L10017',
          type: 'dropdown-list',
          icon: '',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: true
          },
          contextmenu: {
            enable: true,
            target: ['edge'],
            style: {
              'white-space': 'nowrap'
            },
            divider: true
          },
          // 默认选中项index
          selected: 0,
          lockLabel: false,
          // 子节点
          children: [
            {
              name: 'none',
              label: 'none',
              lang: '',
              type: 'normal',
              icon: 'solid',
              style: {},
              data: false,
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'solidArrow',
              label: 'solid arrow',
              lang: '',
              type: 'normal',
              icon: 'solid-arrow',
              style: {
                display: 'inline-block',
                transform: 'rotate(180deg)'
              },
              data: {
                style: {
                  path: 'M0,0 L20,-10 L20,10 Z',
                  d: 0
                },
                fill: true
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'normalArrow',
              label: 'normal arrow',
              lang: '',
              type: 'normal',
              icon: 'normal-arrow',
              style: {
                display: 'inline-block',
                transform: 'rotate(180deg)'
              },
              data: {
                style: {
                  path: 'M0,0 L20,10 L20.707,9.293 L1.432,0 L20.707,-9.293 L20,-10 Z',
                  d: 0
                },
                fill: false
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'asynchArrow',
              label: 'asynch arrow',
              lang: '',
              type: 'normal',
              icon: 'asynch-arraw',
              style: {
                display: 'inline-block',
                transform: 'rotate(180deg)'
              },
              data: {
                style: {
                  path: 'M0,0 L20,10 L20.707,9.293 L1.432,0 Z',
                  d: 0
                },
                fill: false
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'diamondArrow',
              label: 'diamond arrow',
              lang: '',
              type: 'normal',
              icon: 'diamond-arrow',
              style: {
                display: 'inline-block',
                transform: 'rotate(180deg)'
              },
              data: {
                style: {
                  path: 'M0,0 L20,10 L20.707,9.293 L38.568,0 L20.707,-9.293 L20,-10 Z',
                  d: 0
                },
                fill: true
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'diamondArrowEmpty',
              label: 'diamond arrow empty',
              lang: '',
              type: 'normal',
              icon: 'diamond-arrow-empty',
              style: {
                display: 'inline-block',
                transform: 'rotate(180deg)'
              },
              data: {
                style: {
                  path: 'M0,0 L20,10 L20.707,9.293 L38.568,0 L20.707,-9.293 L20,-10 Z',
                  d: 0,
                  fill: '#FFFFFF'
                },
                fill: false
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'circleArrow',
              label: 'circle arrow',
              lang: '',
              type: 'normal',
              icon: 'circle-arrow',
              style: {
                display: 'inline-block',
                transform: 'rotate(180deg)'
              },
              data: {
                style: {
                  path: 'M-10,0 A5,5,0,1,0,10,0 A5,5,0,1,0,-10,0 Z',
                  d: 0
                },
                fill: true
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'circleArrowEmpty',
              label: 'circle arrow empty',
              lang: '',
              type: 'normal',
              icon: 'circle-arrow-empty',
              style: {
                display: 'inline-block',
                transform: 'rotate(180deg)'
              },
              data: {
                style: {
                  path: 'M-10,0 A5,5,0,1,0,10,0 A5,5,0,1,0,-10,0 Z',
                  d: 0,
                  fill: '#FFFFFF'
                },
                fill: false
              },
              enable: true,
              disabled: false,
              divider: false
            }
          ]
        },
        {
          name: 'toFront',
          label: 'To Front',
          lang: 'L10018',
          type: 'normal',
          icon: 'to-front',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['node', 'edge'],
            style: {},
            divider: false
          }
        },
        {
          name: 'toBack',
          label: 'To Back',
          lang: 'L10019',
          type: 'normal',
          icon: 'to-back',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: true
          },
          contextmenu: {
            enable: true,
            target: ['node', 'edge'],
            style: {},
            divider: true
          }
        },
        {
          name: 'selectAll',
          label: 'SelectAll',
          lang: 'L10031',
          type: 'normal',
          icon: 'select-all',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: shortcutMap.selectAll,
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: false
          }
        },
        {
          name: 'marquee',
          label: 'Marquee',
          lang: 'L10020',
          type: 'normal',
          icon: 'marquee',
          enableTool: false,
          enable: false,
          enableMode: [],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: [],
            style: {},
            divider: false
          }
        },
        {
          name: 'group',
          label: 'Group',
          lang: 'L10021',
          type: 'normal',
          icon: 'group',
          enableTool: false,
          enable: false,
          enableMode: [],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: [],
            style: {},
            divider: false
          }
        },
        {
          name: 'ungroup',
          label: 'Ungroup',
          lang: 'L10022',
          type: 'normal',
          icon: 'ungroup',
          enableTool: false,
          enable: false,
          enableMode: [],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: true
          },
          contextmenu: {
            enable: true,
            target: [],
            style: {},
            divider: true
          }
        },
        // {
        //   name: 'edit',
        //   label: 'edit',
        //   lang: 'L10023',
        //   type: 'normal',
        //   icon: 'edit',
        //   enableTool: true,
        //   enable: true,
        //   enableMode: ['preview'],
        //   disabled: false,
        //   disabledMode: ['preview'],
        //   shortcuts: '',
        //   toolbar: {
        //     enable: true,
        //     position: 'center',
        //     style: {},
        //     divider: false
        //   },
        //   contextmenu: {
        //     enable: true,
        //     target: ['canvas'],
        //     style: {},
        //     divider: false
        //   }
        // },
        // {
        //   name: 'preview',
        //   label: 'preview',
        //   lang: 'L10024',
        //   type: 'dropdown-list',
        //   icon: 'preview',
        //   enableTool: true,
        //   enable: true,
        //   enableMode: ['edit', 'preview'],
        //   disabled: false,
        //   disabledMode: ['edit', 'preview'],
        //   shortcuts: '',
        //   toolbar: {
        //     enable: true,
        //     position: 'center',
        //     style: {},
        //     divider: false
        //   },
        //   contextmenu: {
        //     enable: true,
        //     target: ['canvas'],
        //     style: {},
        //     divider: false
        //   },
        //   // 默认选中项index
        //   selected: 0,
        //   lockLabel: true,
        //   // 子节点
        //   children: [
        //     {
        //       name: 'image',
        //       label: 'Image',
        //       lang: '',
        //       type: 'normal',
        //       icon: 'image',
        //       style: {},
        //       data: 'image',
        //       enable: true,
        //       disabled: false,
        //       divider: false
        //     },
        //     {
        //       name: 'json',
        //       label: 'Json',
        //       lang: '',
        //       type: 'normal',
        //       icon: 'json',
        //       style: {},
        //       data: 'json',
        //       enable: true,
        //       disabled: false,
        //       divider: false
        //     }
        //   ]
        // },
        {
          name: 'upload',
          label: 'upload',
          lang: 'L10033',
          type: 'normal',
          icon: 'upload',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: false
          }
        },
        {
          name: 'download',
          label: 'download',
          lang: 'L10030',
          type: 'dropdown-list',
          icon: 'download',
          enableTool: true,
          enable: true,
          enableMode: ['edit', 'preview'],
          disabled: false,
          disabledMode: ['edit', 'preview'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: true
          },
          // 默认选中项index
          selected: 0,
          lockLabel: true,
          // 子节点
          children: [
            {
              name: 'image',
              label: 'Image',
              lang: '',
              type: 'normal',
              icon: 'image',
              style: {},
              data: 'image',
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'json',
              label: 'Json',
              lang: '',
              type: 'normal',
              icon: 'json',
              style: {},
              data: 'json',
              enable: true,
              disabled: false,
              divider: false
            }
          ]
        },
        {
          name: 'layout',
          label: 'Layout',
          lang: 'L10035',
          type: 'dropdown-list',
          icon: 'layout',
          enableTool: false,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit', 'preview'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'center',
            style: {},
            divider: true
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: true
          },
          // 默认选中项index
          selected: 0,
          lockLabel: true,
          // 子节点
          children: [
            {
              name: 'random',
              label: 'random',
              lang: '',
              type: 'normal',
              icon: '',
              style: {},
              data: {
                type: 'random'
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'force',
              label: 'force',
              lang: '',
              type: 'normal',
              icon: '',
              style: {},
              data: {
                type: 'force'
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'fruchterman',
              label: 'fruchterman',
              lang: '',
              type: 'normal',
              icon: '',
              style: {},
              data: {
                type: 'fruchterman',
                gravity: 5,
                speed: 5
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'circular',
              label: 'circular',
              lang: '',
              type: 'normal',
              icon: '',
              style: {},
              data: {
                type: 'circular'
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'radial',
              label: 'radial',
              lang: '',
              type: 'normal',
              icon: '',
              style: {},
              data: {
                type: 'radial',
                unitRadius: 50
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'mds',
              label: 'mds',
              lang: '',
              type: 'normal',
              icon: '',
              style: {},
              data: {
                type: 'mds',
                linkDistance: 100
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'dagre',
              label: 'dagre',
              lang: '',
              type: 'normal',
              icon: '',
              style: {},
              data: {
                type: 'dagre',
                ranksep: 70,
                controlPoints: true
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'concentric',
              label: 'concentric',
              lang: '',
              type: 'normal',
              icon: '',
              style: {},
              data: {
                type: 'concentric',
                maxLevelDiff: 0.5,
                sortBy: 'degree'
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'grid',
              label: 'grid',
              lang: '',
              type: 'normal',
              icon: '',
              style: {},
              data: {
                type: 'grid',
                begin: [20, 20]
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'compactbox',
              label: 'compactbox',
              lang: '',
              type: 'normal',
              icon: '',
              style: {},
              data: {
                type: 'compactBox',
                direction: 'LR',
                getId: function getId (d) {
                  return d.id
                },
                getHeight: function getHeight () {
                  return 16
                },
                getWidth: function getWidth () {
                  return 16
                },
                getVGap: function getVGap () {
                  return 10
                },
                getHGap: function getHGap () {
                  return 100
                }
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'dendrogram',
              label: 'dendrogram',
              lang: '',
              type: 'normal',
              icon: '',
              style: {},
              data: {
                type: 'dendrogram',
                direction: 'LR', // H / V / LR / RL / TB / BT
                nodeSep: 30,
                rankSep: 100
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'indented',
              label: 'indented',
              lang: '',
              type: 'normal',
              icon: '',
              style: {},
              data: {
                type: 'indented',
                isHorizontal: true,
                direction: 'LR',
                indent: 30,
                getHeight: function getHeight () {
                  return 16
                },
                getWidth: function getWidth () {
                  return 16
                }
              },
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'mindmap',
              label: 'mindmap',
              lang: '',
              type: 'normal',
              icon: '',
              style: {},
              data: {
                type: 'mindmap',
                direction: 'H',
                getHeight: () => {
                  return 16
                },
                getWidth: () => {
                  return 16
                },
                getVGap: () => {
                  return 10
                },
                getHGap: () => {
                  return 50
                }
              },
              enable: true,
              disabled: false,
              divider: false
            }
          ]
        },
        // {
        //   name: 'fullscreen',
        //   label: 'fullscreen',
        //   lang: 'L10025',
        //   type: 'normal',
        //   icon: 'full-screen',
        //   enableTool: true,
        //   enable: true,
        //   enableMode: ['edit', 'preview'],
        //   disabled: false,
        //   disabledMode: ['edit', 'preview'],
        //   shortcuts: '',
        //   toolbar: {
        //     enable: true,
        //     position: 'right',
        //     style: {},
        //     divider: false
        //   },
        //   contextmenu: {
        //     enable: true,
        //     target: ['canvas'],
        //     style: {},
        //     divider: false
        //   }
        // },
        {
          name: 'language',
          label: 'language',
          lang: 'L10026',
          type: 'dropdown-list',
          icon: 'language',
          enableTool: true,
          enable: true,
          enableMode: ['edit', 'preview'],
          disabled: false,
          disabledMode: ['edit', 'preview'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'right',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: false
          },
          // 默认选中项index
          selected: 0,
          lockLabel: true,
          // 子节点
          children: [
            {
              name: 'zh-CN',
              label: '简体中文',
              lang: '',
              type: 'normal',
              icon: '',
              img: require('@/assets/zh-CN.png'),
              style: {},
              data: 'zh-CN',
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'en-US',
              label: 'English',
              lang: '',
              type: 'normal',
              icon: '',
              img: require('@/assets/en-US.png'),
              style: {},
              data: 'en-US',
              enable: true,
              disabled: false,
              divider: false
            }
          ]
        },
        {
          name: 'github',
          label: 'github',
          lang: 'L10027',
          type: 'link',
          icon: 'github',
          link: system.github,
          enableTool: false,
          enable: true,
          enableMode: ['edit', 'preview'],
          disabled: false,
          disabledMode: ['edit', 'preview'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'right',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: false
          }
        },
        {
          name: 'feedback',
          label: 'feedback',
          lang: 'L10028',
          type: 'link',
          icon: 'feedback',
          link: system.feedback,
          enableTool: false,
          enable: true,
          enableMode: ['edit', 'preview'],
          disabled: false,
          disabledMode: ['edit', 'preview'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'right',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: false
          }
        },
        {
          name: 'help',
          label: 'help',
          lang: 'L10036',
          type: 'dropdown-list',
          icon: 'help',
          enableTool: true,
          enable: true,
          enableMode: ['edit', 'preview'],
          disabled: false,
          disabledMode: ['edit', 'preview'],
          shortcuts: '',
          toolbar: {
            enable: true,
            position: 'right',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: true,
            target: ['canvas'],
            style: {},
            divider: false
          },
          // 默认选中项index
          selected: 0,
          lockLabel: true,
          // 子节点
          children: [
            {
              name: 'aboutXFC',
              label: 'about XFC',
              lang: 'L10037',
              type: 'normal',
              icon: '',
              style: {},
              data: 'aboutXFC',
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'shortcutList',
              label: 'shortcut list',
              lang: 'L10038',
              type: 'normal',
              icon: '',
              style: {},
              data: 'shortcutList',
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'feedback',
              label: 'feedback',
              lang: 'L10028',
              type: 'link',
              icon: '',
              link: system.feedback,
              style: {},
              data: 'feedback',
              enable: true,
              disabled: false,
              divider: false
            }
          ]
        },
        // FIXME 纯快捷键
        {
          name: 'up',
          label: 'Up',
          lang: '',
          type: 'shortcut',
          icon: '',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: shortcutMap.up,
          toolbar: {
            enable: false,
            position: '',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: false,
            target: [],
            style: {},
            divider: false
          }
        },
        {
          name: 'down',
          label: 'Down',
          lang: '',
          type: 'shortcut',
          icon: '',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: shortcutMap.down,
          toolbar: {
            enable: false,
            position: '',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: false,
            target: [],
            style: {},
            divider: false
          }
        },
        {
          name: 'left',
          label: 'Left',
          lang: '',
          type: 'shortcut',
          icon: '',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: shortcutMap.left,
          toolbar: {
            enable: false,
            position: '',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: false,
            target: [],
            style: {},
            divider: false
          }
        },
        {
          name: 'right',
          label: 'Right',
          lang: '',
          type: 'shortcut',
          icon: '',
          enableTool: true,
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          shortcuts: shortcutMap.right,
          toolbar: {
            enable: false,
            position: '',
            style: {},
            divider: false
          },
          contextmenu: {
            enable: false,
            target: [],
            style: {},
            divider: false
          }
        }
      ]
    return toolList
}


export const getShortcutMap = () => {
    return shortcutMap
}

export const getMaterials = () => {
    let materials = [
        {
          name: 'general',
          label: 'General',
          lang: 'L10301',
          icon: '',
          enable: true,
          children: [
            {
              type: 'rectangle',
              label: 'Rectangle',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 40,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.44" y="7.68" width="28.8" height="14.4" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect></g></g><g></g><g></g></g>`
            },
            {
              type: 'rounded-rectangle',
              label: 'Rounded Rectangle',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 40,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.44" y="7.68" width="28.8" height="14.4" rx="2.16" ry="2.16" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect></g></g><g></g><g></g></g>`
            },
            {
              type: 'text',
              label: 'Text',
              defaultLabel: 'Text',
              enable: true,
              width: 80,
              height: 40,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="0.73" y="7.3" width="29.2" height="14.6" fill="none" stroke="white" pointer-events="stroke" visibility="hidden" stroke-width="9"></rect><rect x="0.73" y="7.3" width="29.2" height="14.6" fill="none" stroke="none" pointer-events="all"></rect></g><g style=""><g transform="translate(7,10)scale(0.73)"><foreignObject style="overflow:visible;" pointer-events="all" width="22" height="12"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; vertical-align: top; width: 24px; white-space: normal; overflow-wrap: normal; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;white-space:normal;">Text</div></div></foreignObject></g></g></g><g></g><g></g></g>`
            },
            {
              type: 'textbox',
              label: 'Textbox',
              defaultLabel: '',
              enable: false,
              width: 80,
              height: 80,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.65" y="6.6" width="28.5" height="18" fill="none" stroke="white" pointer-events="stroke" visibility="hidden" stroke-width="9"></rect><rect x="1.65" y="6.6" width="28.5" height="18" fill="none" stroke="none" pointer-events="all"></rect></g><g style=""><g transform="translate(2,5)scale(0.15)"><foreignObject style="overflow:visible;" pointer-events="all" width="180" height="126"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; vertical-align: top; overflow: hidden; max-height: 130px; max-width: 180px; width: 181px; white-space: normal; overflow-wrap: normal; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;white-space:normal;"><h1>Heading</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div></div></foreignObject></g></g></g><g></g><g></g></g>`
            },
            {
              type: 'ellipse',
              label: 'Ellipse',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 40,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><ellipse cx="15.84" cy="14.88" rx="14.399999999999999" ry="9.6" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></ellipse></g></g><g></g><g></g></g>`
            },
            {
              type: 'square',
              label: 'Square',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="2.38" y="1.36" width="27.2" height="27.2" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect></g></g><g></g><g></g></g>`
            },
            {
              type: 'circle',
              label: 'Circle',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><ellipse cx="15.98" cy="14.96" rx="13.600000000000001" ry="13.600000000000001" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></ellipse></g></g><g></g><g></g></g>`
            },
            {
              type: 'process',
              label: 'Process',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 40,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.44" y="7.68" width="28.8" height="14.4" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect><path d="M 4.32 7.68 L 4.32 22.08 M 27.36 7.68 L 27.36 22.08" fill="none" stroke="white" stroke-width="9.3" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden"></path><path d="M 4.32 7.68 L 4.32 22.08 M 27.36 7.68 L 27.36 22.08" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'diamond',
              label: 'Diamond',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 15.98 1.36 L 29.58 14.96 L 15.98 28.56 L 2.38 14.96 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'parallelogram',
              label: 'Parallelogram',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 40,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 22.08 L 7.2 7.68 L 30.24 7.68 L 24.48 22.08 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'hexagon',
              label: 'Hexagon',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 40,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 8.64 5.28 L 23.04 5.28 L 30.24 14.88 L 23.04 24.48 L 8.64 24.48 L 1.44 14.88 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'triangle',
              label: 'Triangle',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 5.78 1.36 L 26.18 14.96 L 5.78 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'cylinder',
              label: 'Cylinder',
              defaultLabel: '',
              enable: true,
              width: 40,
              height: 80,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 5.78 6.8 C 5.78 -0.45 26.18 -0.45 26.18 6.8 L 26.18 23.12 C 26.18 30.37 5.78 30.37 5.78 23.12 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path><path d="M 5.78 6.8 C 5.78 12.24 26.18 12.24 26.18 6.8" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'cloud',
              label: 'Cloud',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 8.64 10.08 C 2.88 10.08 1.44 14.88 6.05 15.84 C 1.44 17.95 6.62 22.56 10.37 20.64 C 12.96 24.48 21.6 24.48 24.48 20.64 C 30.24 20.64 30.24 16.8 26.64 14.88 C 30.24 11.04 24.48 7.2 19.44 9.12 C 15.84 6.24 10.08 6.24 8.64 10.08 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'document',
              label: 'Document',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 60,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 5.28 L 30.24 5.28 L 30.24 21.6 Q 23.04 16.42 15.84 21.6 Q 8.64 26.78 1.44 21.6 L 1.44 8.16 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'internal-storage',
              label: 'Internal Storage',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="2.38" y="1.36" width="27.2" height="27.2" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect><path d="M 2.38 8.16 L 29.58 8.16" fill="none" stroke="white" stroke-width="9.3" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden"></path><path d="M 2.38 8.16 L 29.58 8.16" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path><path d="M 9.18 1.36 L 9.18 28.56" fill="none" stroke="white" stroke-width="9.3" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden"></path><path d="M 9.18 1.36 L 9.18 28.56" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'cube',
              label: 'Cube',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 60,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 5.28 L 25.44 5.28 L 30.24 10.08 L 30.24 24.48 L 6.24 24.48 L 1.44 19.68 L 1.44 5.28 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path><path d="M 1.44 5.28 L 25.44 5.28 L 30.24 10.08 L 6.24 10.08 Z" fill-opacity="0.05" fill="#000000" stroke="none" pointer-events="all"></path><path d="M 1.44 5.28 L 6.24 10.08 L 6.24 24.48 L 1.44 19.68 Z" fill-opacity="0.1" fill="#000000" stroke="none" pointer-events="all"></path><path d="M 6.24 24.48 L 6.24 10.08 L 1.44 5.28 M 6.24 10.08 L 30.24 10.08" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'step',
              label: 'Step',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 60,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 5.28 L 25.44 5.28 L 30.24 14.88 L 25.44 24.48 L 1.44 24.48 L 6.24 14.88 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'trapezoid',
              label: 'Trapezoid',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 40,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 22.08 L 7.2 7.68 L 24.48 7.68 L 30.24 22.08 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'tape',
              label: 'Tape',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 7.68 Q 8.64 16.32 15.84 7.68 Q 23.04 -0.96 30.24 7.68 L 30.24 22.08 Q 23.04 13.44 15.84 22.08 Q 8.64 30.72 1.44 22.08 L 1.44 7.68 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'note',
              label: 'Note',
              defaultLabel: '',
              enable: true,
              width: 60,
              height: 80,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 5.13 1.35 L 18.63 1.35 L 26.73 9.45 L 26.73 28.35 L 5.13 28.35 L 5.13 1.35 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path><path d="M 18.63 1.35 L 18.63 9.45 L 26.73 9.45 Z" fill-opacity="0.05" fill="#000000" stroke="none" pointer-events="all"></path><path d="M 18.63 1.35 L 18.63 9.45 L 26.73 9.45" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'card',
              label: 'Card',
              defaultLabel: '',
              enable: true,
              width: 60,
              height: 80,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 13.23 1.35 L 26.73 1.35 L 26.73 28.35 L 5.13 28.35 L 5.13 9.45 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'callout',
              label: 'Callout',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 60,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 5.28 L 30.24 5.28 L 30.24 17.28 L 20.64 17.28 L 15.84 24.48 L 15.84 17.28 L 1.44 17.28 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'actor',
              label: 'Actor',
              defaultLabel: '',
              enable: true,
              width: 60,
              height: 80,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><ellipse cx="15.75" cy="4.73" rx="3.375" ry="3.375" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></ellipse><path d="M 15.75 8.1 L 15.75 19.35 M 15.75 10.35 L 9 10.35 M 15.75 10.35 L 22.5 10.35 M 15.75 19.35 L 9 28.35 M 15.75 19.35 L 22.5 28.35" fill="none" stroke="white" stroke-width="9.3" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden"></path><path d="M 15.75 8.1 L 15.75 19.35 M 15.75 10.35 L 9 10.35 M 15.75 10.35 L 22.5 10.35 M 15.75 19.35 L 9 28.35 M 15.75 19.35 L 22.5 28.35" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'or',
              label: 'Or',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 5.78 1.36 Q 26.18 1.36 26.18 14.96 Q 26.18 28.56 5.78 28.56 Q 15.98 14.96 5.78 1.36 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'and',
              label: 'And',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 5.78 1.36 Q 26.18 1.36 26.18 14.96 Q 26.18 28.56 5.78 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'data-storage',
              label: 'Data Storage',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 20,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 4.35 3.19 L 30.45 3.19 Q 24.65 14.79 30.45 26.39 L 4.35 26.39 Q -1.45 14.79 4.35 3.19 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'bidirectional-arrow',
              label: 'Bidirectional Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 11.73 22.96 L 15.81 27.04 L 2.39 28.41 L 3.76 14.99 L 7.84 19.07 L 20.17 6.74 L 16.09 2.66 L 29.51 1.29 L 28.14 14.71 L 24.06 10.63 Z" fill="none" stroke="white" stroke-width="9.3" stroke-linejoin="round" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden"></path><path d="M 11.73 22.96 L 15.81 27.04 L 2.39 28.41 L 3.76 14.99 L 7.84 19.07 L 20.17 6.74 L 16.09 2.66 L 29.51 1.29 L 28.14 14.71 L 24.06 10.63 Z" fill="none" stroke="#000000" stroke-width="1.3" stroke-linejoin="round" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'arrow',
              label: 'Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 5.66 28.69 L 1.99 25.02 L 20.63 6.37 L 16.77 2.51 L 29.46 1.22 L 28.17 13.91 L 24.31 10.05 Z" fill="none" stroke="white" stroke-width="9.3" stroke-linejoin="round" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden"></path><path d="M 5.66 28.69 L 1.99 25.02 L 20.63 6.37 L 16.77 2.51 L 29.46 1.22 L 28.17 13.91 L 24.31 10.05 Z" fill="none" stroke="#000000" stroke-width="1.3" stroke-linejoin="round" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            }
          ]
        },
        {
          name: 'miscellaneous',
          label: 'Miscellaneous',
          lang: 'L10302',
          icon: '',
          enable: false,
          children: []
        },
        {
          name: 'advanced',
          label: 'Advanced',
          lang: 'L10303',
          icon: '',
          enable: false,
          children: []
        },
        {
          name: 'basic',
          label: 'Basic',
          lang: 'L10304',
          icon: '',
          enable: false,
          children: []
        },
        {
          name: 'arrow',
          label: 'Arrow',
          lang: 'L10305',
          icon: '',
          enable: true,
          children: [
            {
              type: 'arrow-down',
              label: 'Arrow Down',
              defaultLabel: '',
              enable: true,
              width: 60,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 11.76 1.4 L 11.76 17.84 L 6.16 17.84 L 15.96 28.56 L 25.76 17.84 L 20.16 17.84 L 20.16 1.4 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'arrow-left',
              label: 'Arrow Left',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 60,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 30.3 10.5 L 12.69 10.5 L 12.69 4.5 L 1.2 15 L 12.69 25.5 L 12.69 19.5 L 30.3 19.5 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'arrow-right',
              label: 'Arrow Right',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 60,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.2 10.5 L 18.81 10.5 L 18.81 4.5 L 30.3 15 L 18.81 25.5 L 18.81 19.5 L 1.2 19.5 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'arrow-up',
              label: 'Arrow Up',
              defaultLabel: '',
              enable: true,
              width: 60,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 11.76 28.56 L 11.76 12.12 L 6.16 12.12 L 15.96 1.4 L 25.76 12.12 L 20.16 12.12 L 20.16 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'bent-left-arrow',
              label: 'Bent Left Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 21.28 28.56 L 21.28 14.84 C 21.28 14.07 20.65 13.44 19.88 13.44 L 12.88 13.44 L 12.88 17.08 L 2.24 9.24 L 12.88 1.4 L 12.88 5.04 L 19.88 5.04 C 25.18 5.19 29.4 9.54 29.4 14.84 L 29.4 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'bent-right-arrow',
              label: 'Bent Right Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 10.36 28.56 L 10.36 14.84 C 10.36 14.07 10.99 13.44 11.76 13.44 L 18.76 13.44 L 18.76 17.08 L 29.4 9.24 L 18.76 1.4 L 18.76 5.04 L 11.76 5.04 C 6.46 5.19 2.24 9.54 2.24 14.84 L 2.24 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'bent-up-arrow',
              label: 'Bent Up Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.2 18.35 L 17.4 18.35 L 17.4 9.41 L 13.8 9.41 L 21.9 2.4 L 30.3 9.41 L 26.4 9.41 L 26.4 27.3 L 1.2 27.3 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'callout-double-arrow',
              label: 'Callout Double Arrow',
              defaultLabel: '',
              enable: true,
              width: 40,
              height: 80,
              minWidth: 40,
              minHeight: 80,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 13.16 8.09 L 13.16 6.69 L 10.64 6.69 L 15.96 1.4 L 21.28 6.69 L 18.76 6.69 L 18.76 8.09 L 22.96 8.09 L 22.96 22.01 L 18.76 22.01 L 18.76 23.41 L 21.28 23.41 L 15.96 28.56 L 10.64 23.41 L 13.16 23.41 L 13.16 22.01 L 8.96 22.01 L 8.96 8.09 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'callout-quad-arrow',
              label: 'Callout Quad Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 13.02 7.98 L 13.02 6.58 L 10.5 6.58 L 15.82 1.4 L 21.14 6.58 L 18.62 6.58 L 18.62 7.98 L 22.82 7.98 L 22.82 12.18 L 24.22 12.18 L 24.22 9.66 L 29.4 14.98 L 24.22 20.3 L 24.22 17.78 L 22.82 17.78 L 22.82 21.98 L 18.62 21.98 L 18.62 23.38 L 21.14 23.38 L 15.82 28.56 L 10.5 23.38 L 13.02 23.38 L 13.02 21.98 L 8.82 21.98 L 8.82 17.78 L 7.42 17.78 L 7.42 20.3 L 2.24 14.98 L 7.42 9.66 L 7.42 12.18 L 8.82 12.18 L 8.82 7.98 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'callout-up-arrow',
              label: 'Callout Up Arrow',
              defaultLabel: '',
              enable: true,
              width: 40,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 13.16 12.04 L 13.16 6.44 L 10.64 6.44 L 15.96 1.12 L 21.28 6.44 L 18.76 6.44 L 18.76 12.04 L 24.36 12.04 L 24.36 28.56 L 7.56 28.56 L 7.56 12.04 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'chevron-arrow',
              label: 'Chevron Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 40,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 10.5 15 L 1.5 6 L 21.3 6 L 30.3 15 L 21.3 24 L 1.5 24 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'circular-arrow',
              label: 'Circular Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 60,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.2 17.75 C 1.2 10.43 7.18 4.5 14.55 4.5 C 21.92 4.5 27.9 10.43 27.9 17.75 L 30.3 17.75 L 24.3 25.2 L 18.3 17.75 L 20.7 17.75 C 20.7 14.38 17.95 11.65 14.55 11.65 C 11.15 11.65 8.4 14.38 8.4 17.75 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'jump-in-right-arrow',
              label: 'Jump-in Right Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 11.07 17.86 L 15.93 17.86 C 15.83 10.28 10.43 3.78 2.97 2.27 C 12.88 1.62 21.8 8.23 24.03 17.86 L 28.89 17.86 L 19.98 28.35 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-linejoin="round" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'jump-in-left-arrow',
              label: 'Jump-in Left Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 20.79 17.86 L 15.93 17.86 C 16.03 10.28 21.43 3.78 28.89 2.27 C 18.98 1.62 10.06 8.23 7.83 17.86 L 2.97 17.86 L 11.88 28.35 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-linejoin="round" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'left-and-up-arrow',
              label: 'Left and Up Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 9.07 16.3 L 17.42 16.3 L 17.42 7.95 L 14.08 7.95 L 21.6 1.4 L 29.4 7.95 L 25.78 7.95 L 25.78 24.66 L 9.07 24.66 L 9.07 28.28 L 2.52 20.48 L 9.07 12.96 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'left-sharp-edged-head-arrow',
              label: 'Left Sharp Edged Head Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 40,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 30.3 12 L 6.72 12 L 10.3 6 L 6.72 6 L 1.2 15 L 6.72 24 L 10.3 24 L 6.72 18 L 30.3 18 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'notched-signal-in-arrow',
              label: 'Notched Signal-in Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 20,
              minWidth: 40,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.5 10.5 L 26.27 10.5 L 30.3 15 L 26.27 19.5 L 1.5 19.5 L 5.38 15 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'quad-arrow',
              label: 'Quad Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 13.1 12.26 L 13.1 6.69 L 10.6 6.69 L 15.89 1.4 L 21.18 6.69 L 18.68 6.69 L 18.68 12.26 L 24.25 12.26 L 24.25 9.76 L 29.4 15.05 L 24.25 20.34 L 24.25 17.84 L 18.68 17.84 L 18.68 23.41 L 21.18 23.41 L 15.89 28.56 L 10.6 23.41 L 13.1 23.41 L 13.1 17.84 L 7.53 17.84 L 7.53 20.34 L 2.24 15.05 L 7.53 9.76 L 7.53 12.26 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'right-notched-arrow',
              label: 'Right Notched Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 60,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.5 10.5 L 18.81 10.5 L 18.81 4.5 L 30.3 15 L 18.81 25.5 L 18.81 19.5 L 1.5 19.5 L 5.38 15 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'sharp-edged-arrow',
              label: 'Sharp Edged Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 40,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 30.3 12 L 6.72 12 L 9.41 7.5 L 6.72 6 L 1.2 15 L 6.72 24 L 9.41 22.5 L 6.72 18 L 30.3 18 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'signal-in-arrow',
              label: 'Signal-in Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 20,
              minWidth: 40,
              minHeight: 20,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.2 10.5 L 26.27 10.5 L 30.3 15 L 26.27 19.5 L 1.2 19.5 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'slender-left-arrow',
              label: 'Slender Left Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 60,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 30.3 12 L 6.72 12 L 6.72 6 L 1.2 15 L 6.72 24 L 6.72 18 L 30.3 18 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'slender-two-way-arrow',
              label: 'Slender Two Way Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 60,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 24.63 12 L 6.72 12 L 6.72 6 L 1.2 15 L 6.72 24 L 6.72 18 L 24.63 18 L 24.63 24 L 30.3 15 L 24.63 6 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'slender-wide-tailed-arrow',
              label: 'Slender Wide Tailed Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 60,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 18.96 12 L 7.02 12 L 7.02 6 L 1.5 15 L 7.02 24 L 7.02 18 L 18.96 18 L 23.44 24 L 30.3 24 L 24.33 15 L 30.3 6 L 23.44 6 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'striped-arrow',
              label: 'Striped Arrow',
              defaultLabel: '',
              enable: false,
              width: 80,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 8.36 10.5 L 18.81 10.5 L 18.81 4.5 L 30.3 15 L 18.81 25.5 L 18.81 19.5 L 8.36 19.5 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path><rect x="3.59" y="10.5" width="3.58" height="9" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect><rect x="1.2" y="10.5" width="1.19" height="9" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect></g></g><g></g><g></g></g>`
            },
            {
              type: 'stylised-notched-arrow',
              label: 'Stylised Notched Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 60,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.5 7.5 L 21.79 12 L 18.81 6 L 30.3 15 L 18.81 24 L 21.79 19.5 L 1.5 22.5 L 5.38 15 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="8" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'triad-arrow',
              label: 'Triad Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 56,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 12.84 16.5 L 12.84 10.5 L 10.15 10.5 L 15.82 4.8 L 21.5 10.5 L 18.81 10.5 L 18.81 16.5 L 24.78 16.5 L 24.78 13.8 L 30.3 19.5 L 24.78 25.2 L 24.78 22.5 L 12.84 22.5 L 6.87 22.5 L 6.87 25.2 L 1.2 19.5 L 6.87 13.8 L 6.87 16.5 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'two-way-arrow-horizontal',
              label: 'Two Way Arrow Horizontal',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 60,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 20.4 10.5 L 20.4 6 L 30.3 15 L 20.4 24 L 20.4 19.5 L 11.4 19.5 L 11.4 24 L 1.5 15 L 11.4 6 L 11.4 10.5 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'two-way-arrow-vertical',
              label: 'Two Way Arrow Vertical',
              defaultLabel: '',
              enable: true,
              width: 60,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 11.76 19.04 L 7.56 19.04 L 15.96 28.28 L 24.36 19.04 L 20.16 19.04 L 20.16 10.64 L 24.36 10.64 L 15.96 1.4 L 7.56 10.64 L 11.76 10.64 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'u-turn-arrow',
              label: 'U Turn Arrow',
              defaultLabel: '',
              enable: true,
              width: 80,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 2.24 13.58 C 2.24 6.7 7.82 1.12 14.7 1.12 C 21.58 1.12 27.16 6.7 27.16 13.58 L 29.4 13.58 L 23.8 20.58 L 18.2 13.58 L 20.44 13.58 C 20.41 10.41 17.82 7.86 14.65 7.89 C 11.48 7.91 8.93 10.5 8.96 13.67 L 8.96 28.56 L 2.24 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'u-turn-down-arrow',
              label: 'U Turn Down Arrow',
              defaultLabel: '',
              enable: false,
              width: 80,
              height: 60,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 30.3 24.3 L 30.3 15.3 C 30.3 10 26 5.7 20.7 5.7 C 15.4 5.7 11.1 10 11.1 15.3 L 15 15.3 L 8.1 24.3 L 1.2 15.3 L 5.1 15.3 C 5.1 10 9.4 5.7 14.7 5.7 L 20.7 5.7 C 19.45 5.75 18.22 6.05 17.1 6.6 C 21.37 7.32 24.52 10.97 24.6 15.3 L 24.6 24.3 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'u-turn-left-arrow',
              label: 'U Turn Left Arrow',
              defaultLabel: '',
              enable: false,
              width: 80,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 7.28 1.45 L 15.65 1.42 C 18.86 1.41 21.83 3.1 23.44 5.87 C 25.06 8.63 25.07 12.04 23.48 14.82 C 21.89 17.6 18.93 19.31 15.72 19.33 L 15.7 15.69 L 7.36 22.16 L 15.75 28.56 L 15.74 24.92 C 18.11 24.91 20.38 23.95 22.05 22.27 C 23.72 20.58 24.65 18.3 24.63 15.94 L 24.61 10.34 C 24.57 11.5 24.29 12.65 23.79 13.7 C 23.11 9.74 19.7 6.81 15.67 6.74 L 7.3 6.77 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'u-turn-right-arrow',
              label: 'U Turn Right Arrow',
              defaultLabel: '',
              enable: false,
              width: 80,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 24.64 1.45 L 16.27 1.42 C 11.31 1.4 7.28 5.39 7.26 10.34 C 7.24 15.28 11.24 19.31 16.2 19.33 L 16.22 15.69 L 24.56 22.16 L 16.17 28.56 L 16.18 24.92 C 13.81 24.91 11.54 23.95 9.87 22.27 C 8.2 20.58 7.27 18.3 7.29 15.94 L 7.31 10.34 C 7.35 11.5 7.63 12.65 8.13 13.7 C 8.81 9.74 12.22 6.81 16.25 6.74 L 24.62 6.77 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            },
            {
              type: 'u-turn-up-arrow',
              label: 'U Turn Up Arrow',
              defaultLabel: '',
              enable: false,
              width: 80,
              height: 80,
              minWidth: 40,
              minHeight: 40,
              anchorPoints: anchorPoints,
              shapeControl: shapeControl,
              icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 30.3 5.7 L 30.3 14.7 C 30.3 20 26 24.3 20.7 24.3 C 15.4 24.3 11.1 20 11.1 14.7 L 15 14.7 L 8.1 5.7 L 1.2 14.7 L 5.1 14.7 C 5.1 20 9.4 24.3 14.7 24.3 L 20.7 24.3 C 19.45 24.25 18.22 23.95 17.1 23.4 C 21.37 22.68 24.52 19.03 24.6 14.7 L 24.6 5.7 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
            }
          ]
        },
        {
          name: 'UML',
          label: 'UML',
          lang: 'L10306',
          icon: '',
          enable: false,
          children: []
        },
        {
          name: 'BPMN-General',
          label: 'BPMN General',
          lang: 'L10307',
          icon: '',
          enable: false,
          children: []
        },
        {
          name: 'flowchart',
          label: 'Flowchart',
          lang: 'L10308',
          icon: '',
          enable: false,
          children: []
        },
        {
          name: 'clipart',
          label: 'Clipart',
          lang: 'L10309',
          icon: '',
          enable: false,
          children: []
        }
    ]
    return materials
}
