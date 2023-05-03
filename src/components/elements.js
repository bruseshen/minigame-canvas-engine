/* eslint-disable no-param-reassign */
import { repaintAffectedStyles, reflowAffectedStyles, allStyles } from './style.js';
import Rect from '../common/rect';
import imageManager from '../common/imageManager';

export function getElementsById(tree, list = [], id) {
  Object.keys(tree.children).forEach((key) => {
    const child = tree.children[key];

    if (child.idName === id) {
      list.push(child);
    }

    if (Object.keys(child.children).length) {
      getElementsById(child, list, id);
    }
  });

  return list;
}

export function getElementsByClassName(tree, list = [], className) {
  Object.keys(tree.children).forEach((key) => {
    const child = tree.children[key];

    if ((child.classNameList || child.className.split(/\s+/)).indexOf(className) > -1) {
      list.push(child);
    }

    if (Object.keys(child.children).length) {
      getElementsByClassName(child, list, className);
    }
  });

  return list;
}

const Emitter = require('tiny-emitter');

// 全局事件管道
const EE = new Emitter();

let uuid = 0;

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
}

function getRgba(hex, opacity) {
  const rgbObj = hexToRgb(hex);

  if (opacity === undefined) {
    opacity = 1;
  }

  return `rgba(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}, ${opacity})`;
}

const toEventName = (event, id) => {
  const elementEvent = [
    'click',
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel',
  ];

  if (elementEvent.indexOf(event) !== -1) {
    return `element-${id}-${event}`;
  }

  return `element-${id}-${event}`;
};


const isValidUrlPropReg = /\s*url\((.*?)\)\s*/;

export default class Element {
  constructor({
    style = {},
    idName = '',
    className = '',
    id = uuid += 1,
    dataset = {},
  }) {
    this.children = [];
    this.parent = null;
    this.parentId = 0;
    this.id = id;
    this.idName = idName;
    this.className = className;
    // this.style = style;
    this.EE = EE;
    this.root = null;
    this.isDestroyed = false;
    this.layoutBox = {};

    this.dataset = dataset;

    if (
      style.opacity !== undefined
      && style.color
      && style.color.indexOf('#') > -1
    ) {
      style.color = getRgba(style.color, style.opacity);
    }

    if (
      style.opacity !== undefined
      && style.backgroundColor
      && style.backgroundColor.indexOf('#') > -1
    ) {
      style.backgroundColor = getRgba(style.backgroundColor, style.opacity);
    }

    if (typeof style.backgroundImage === 'string') {
      const list = style.backgroundImage.match(isValidUrlPropReg);
      if (list) {
        const url = list[1].replace(/('|")/g, '');
        imageManager.loadImage(url, (img) => {
          if (!this.isDestroyed) {
            this.backgroundImage = img;
            // 当图片加载完成，实例可能已经被销毁了
            this.root && this.root.emit('repaint');
          }
        });
      } else {
        console.error(`[Layout]: ${style.backgroundImage} is not a valid backgroundImage`);
      }
    }

    this.originStyle = style;
    this.style = style;
    this.rect = null;
    this.viewportRect = null;
    this.classNameList = null;
  }

  /**
   * 监听属性的变化判断是否需要执行 reflow、repaint 操作
   * 经过测试，Object.defineProperty 是一个比较慢的方法， 特别是属性比较多的时候
   * 因此会先判断是否支持 Proxy，iMac (Retina 5K, 27-inch, 2017)测试结果
   * 总共 312 个节点，observeStyleAndEvent总耗时为：
   * Proxy: 3ms
   * Object.defineProperty: 20ms
   */
  observeStyleAndEvent() {
    if (typeof Proxy === 'function') {
      const ele = this;
      this.style = new Proxy(this.originStyle, {
        get(target, prop, receiver) {
          return Reflect.get(target, prop, receiver);
        },
        set(target, prop, val, receiver) {
          if (reflowAffectedStyles.indexOf(prop)) {
            ele.isDirty = true;
            let { parent } = ele;
            while (parent) {
              parent.isDirty = true;
              parent = parent.parent;
            }
          } else if (repaintAffectedStyles.indexOf(prop)) {
            ele.root.emit('repaint');
          }
          return Reflect.set(target, prop, val, receiver);
        },
      });
    } else {
      const innerStyle = Object.assign({}, this.style);
      allStyles.forEach((key) => {
        Object.defineProperty(this.style, key, {
          configurable: true,
          enumerable: true,
          get: () => innerStyle[key],
          set: (value) => {
            innerStyle[key] = value;
            if (reflowAffectedStyles.indexOf(key)) {
              this.isDirty = true;
              let { parent } = this;
              while (parent) {
                parent.isDirty = true;
                parent = parent.parent;
              }
            } else if (repaintAffectedStyles.indexOf(key)) {
              this.root.emit('repaint');
            }
          },
        });
      });
    }

    // 事件冒泡逻辑
    ['touchstart', 'touchmove', 'touchcancel', 'touchend', 'click'].forEach((eventName) => {
      this.on(eventName, (e, touchMsg) => {
        this.parent && this.parent.emit(eventName, e, touchMsg);
      });
    });

    this.classNameList = this.className.split(/\s+/);
  }

  // 子类填充实现
  repaint() { }

  // 子类填充实现
  render() { }

  /**
   * 参照 Web 规范：https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
   */
  getBoundingClientRect() {
    if (!this.rect) {
      this.rect = new Rect(
        this.layoutBox.absoluteX,
        this.layoutBox.absoluteY,
        this.layoutBox.width,
        this.layoutBox.height,
      );
    }

    this.rect.set(
      this.layoutBox.absoluteX,
      this.layoutBox.absoluteY,
      this.layoutBox.width,
      this.layoutBox.height,
    );

    return this.rect;
  }

  getViewportRect() {
    const { realLayoutBox } = this.root;
    const { viewportScale } = this.root;
    const {
      absoluteX,
      absoluteY,
      width,
      height,
    } = this.layoutBox;

    const realX = absoluteX * viewportScale + realLayoutBox.realX;
    const realY = absoluteY * viewportScale + realLayoutBox.realY;
    const realWidth = width * viewportScale;
    const realHeight = height * viewportScale;

    if (!this.viewportRect) {
      this.viewportRect = new Rect(
        realX,
        realY,
        realWidth,
        realHeight,
      );
    }

    this.viewportRect.set(
      realX,
      realY,
      realWidth,
      realHeight,
    );

    return this.viewportRect;
  }

  getElementsById(id) {
    return getElementsById(this, [], id);
  }

  getElementsByClassName(className) {
    return getElementsByClassName(this, [], className);
  }

  insert(ctx, needRender) {
    this.ctx = ctx;

    if (needRender) {
      this.render();
    }
  }

  // 子类填充实现
  destroy() {
    [
      'touchstart',
      'touchmove',
      'touchcancel',
      'touchend',
      'click',
      'repaint',
    ].forEach((eventName) => {
      this.off(eventName);
    });

    this.isDestroyed = true;
    this.EE = null;
    this.parent = null;
    this.ctx = null;

    // element 在画布中的位置和尺寸信息
    this.layoutBox = null;
    this.style = null;
    this.className = '';
    this.classNameList = null;
  }

  add(element) {
    element.parent = this;
    element.parentId = this.id;

    this.children.push(element);
  }

  appendChild(element) {
    this.add(element);

    this.isDirty = true;
    let { parent } = this;
    while (parent) {
      parent.isDirty = true;
      parent = parent.parent;
    }
  }

  removeChild(element) {
    const index = this.children.indexOf(element);
    if (index !== -1) {
      this.isDirty = true;

      element.parent = null;
      this.children.splice(this.children.indexOf(element), 1);

      this.isDirty = true;
      let { parent } = this;
      while (parent) {
        parent.isDirty = true;
        parent = parent.parent;
      }
    } else {
      console.warn('[Layout] the element to be removed is not a child of this element');
    }
  }

  emit(event, ...theArgs) {
    EE.emit(toEventName(event, this.id), ...theArgs);
  }

  on(event, callback) {
    EE.on(toEventName(event, this.id), callback);
  }

  once(event, callback) {
    EE.once(toEventName(event, this.id), callback);
  }

  off(event, callback) {
    EE.off(toEventName(event, this.id), callback);
  }

  renderBorder(ctx) {
    const style = this.style || {};
    const radius = style.borderRadius || 0;
    const { borderWidth = 0 } = style;
    const borderTopLeftRadius = style.borderTopLeftRadius || radius;
    const borderTopRightRadius = style.borderTopRightRadius || radius;
    const borderBottomLeftRadius = style.borderBottomLeftRadius || radius;
    const borderBottomRightRadius = style.borderBottomRightRadius || radius;
    const box = this.layoutBox;
    const { borderColor } = style;
    const x = box.absoluteX;
    const y = box.absoluteY;
    const { width, height } = box;

    const hasRadius = radius
      || borderTopLeftRadius || borderTopRightRadius || borderBottomLeftRadius || borderBottomRightRadius;

    // borderWidth 和 radius 都没有，不需要执行后续逻辑，提升性能
    if (!borderWidth && !hasRadius) {
      return { needClip: false, needStroke: false };
    }

    // 左上角的点
    ctx.beginPath();

    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;

    ctx.moveTo(x + borderTopLeftRadius, y);
    ctx.lineTo(x + width - borderTopRightRadius, y);

    // 右上角的圆角
    ctx.arcTo(x + width, y, x + width, y + borderTopRightRadius, borderTopRightRadius);

    // 右下角的点
    ctx.lineTo(x + width, y + height - borderBottomRightRadius);

    // 右下角的圆角
    ctx.arcTo(
      x + width,
      y + height,
      x + width - borderBottomRightRadius,
      y + height,
      borderBottomRightRadius,
    );

    // 左下角的点
    ctx.lineTo(x + borderBottomLeftRadius, y + height);

    // 左下角的圆角
    ctx.arcTo(x, y + height, x, y + height - borderBottomLeftRadius, borderBottomLeftRadius);

    // 左上角的点
    ctx.lineTo(x, y + borderTopLeftRadius);

    // 左上角的圆角
    ctx.arcTo(x, y, x + borderTopLeftRadius, y, borderTopLeftRadius);

    return { needClip: !!hasRadius, needStroke: !!borderWidth };
  }
}
