import imageManager from './imageManager';
import Pool from './pool';

const bitMapPool = new Pool('bitMapPool');
const Emitter = require('tiny-emitter');

/**
 * http://www.angelcode.com/products/bmfont/doc/file_format.html
 */
export default class BitMapFont {
  constructor(name, src, config) {
    const cache = bitMapPool.get(name);

    if (cache) {
      return cache;
    }

    this.config  = config;
    this.chars   = this.parseConfig(config);
    this.ready   = false;
    this.event = new Emitter();

    this.texture = imageManager.loadImage(src, (texture, fromCache) => {
      if (fromCache) {
        this.texture = texture;
      }
      this.ready = true;
      this.event.emit('text__load__done');
    });

    bitMapPool.set(name, this);
  }

  parseConfig(fntText) {
    fntText = fntText.split('\r\n').join('\n');
    const lines = fntText.split('\n');
    const linesParsed = lines.map(line => line.trim().split(' '));

    const charsLine = this.getConfigByLineName(linesParsed, 'chars');
    const charsCount = this.getConfigByKeyInOneLine(charsLine.line, 'count');

    const commonLine = this.getConfigByLineName(linesParsed, 'common');
    this.lineHeight = this.getConfigByKeyInOneLine(commonLine.line, 'lineHeight');

    const infoLine = this.getConfigByLineName(linesParsed, 'info');
    this.fontSize   = this.getConfigByKeyInOneLine(infoLine.line, 'size');

    // 接卸 kernings
    const kerningsLine = this.getConfigByLineName(linesParsed, 'kernings');
    let kerningsCount = 0;
    let kerningsStart = -1;
    if (kerningsLine.line) {
      kerningsCount = this.getConfigByKeyInOneLine(kerningsLine.line, 'count');
      kerningsStart = kerningsLine.index + 1;
    }

    const chars = {};
    for (let i = 4; i < 4 + charsCount; i++) {
      const charText = lines[i];
      const letter = String.fromCharCode(this.getConfigByKeyInOneLine(charText, 'id'));
      const c = {};
      chars[letter] = c;
      c.x = this.getConfigByKeyInOneLine(charText, 'x');
      c.y = this.getConfigByKeyInOneLine(charText, 'y');
      c.w = this.getConfigByKeyInOneLine(charText, 'width');
      c.h = this.getConfigByKeyInOneLine(charText, 'height');
      c.offX = this.getConfigByKeyInOneLine(charText, 'xoffset');
      c.offY = this.getConfigByKeyInOneLine(charText, 'yoffset');
      c.xadvance = this.getConfigByKeyInOneLine(charText, 'xadvance');

      c.kerning = {};
    }

    // parse kernings
    if (kerningsCount) {
      for (let i = kerningsStart; i <= kerningsStart + kerningsCount; i++) {
        const line = linesParsed[i];
        const first = String.fromCharCode(this.getConfigByKeyInOneLine(line, 'first'));
        const second = String.fromCharCode(this.getConfigByKeyInOneLine(line, 'second'));
        const amount = this.getConfigByKeyInOneLine(line, 'amount');

        if (chars[second]) {
          chars[second].kerning[first] = amount;
        }
      }
    }

    return chars;
  }

  getConfigByLineName(linesParsed, lineName = '') {
    let index = -1;
    let line = null;
    const len = linesParsed.length;

    for (let i = 0; i < len; i++) {
      const item = linesParsed[i];

      if (item[0] === lineName) {
        index = i;
        line = item;
      }
    }

    return {
      line,
      index,
    };
  }

  getConfigByKeyInOneLine(configText, key) {
    const itemConfigTextList = Array.isArray(configText) ? configText :  configText.split(' ');

    for (let i = 0, { length } = itemConfigTextList; i < length; i++) {
      const itemConfigText = itemConfigTextList[i];
      if (key === itemConfigText.substring(0, key.length)) {
        const value = itemConfigText.substring(key.length + 1);
        return parseInt(value);
      }
    }

    return 0;
  }
}

