import Element from './elements';
import imageManager from '../common/imageManager';
import { IElementOptions } from './types';

interface IImageOptions extends IElementOptions {
  src?: string;
}

export default class Image extends Element {
  private imgsrc: string;
  public type = 'Image';
  public img: HTMLImageElement | null;

  constructor(opts: IImageOptions) {
    const {
      style = {},
      idName = '',
      className = '',
      src = '',
      dataset,
    } = opts;

    super({
      idName,
      className,
      dataset,
      style,
    });

    this.imgsrc = src;

    this.img = imageManager.loadImage(this.src, (img, fromCache) => {
      if (fromCache) {
        this.img = img;
      } else {
        if (!this.isDestroyed) {
          this.img = img;
          // 当图片加载完成，实例可能已经被销毁了
          this.root?.emit('repaint');
        }
      }
    });
  }

  get src(): string {
    return this.imgsrc;
  }

  set src(newValue: string) {
    if (newValue !== this.imgsrc) {
      this.imgsrc = newValue;
      imageManager.loadImage(this.src, (img: HTMLImageElement) => {
        if (!this.isDestroyed) {
          this.img = img;
          // 当图片加载完成，实例可能已经被销毁了
          this.root?.emit('repaint');
        }
      });
    }
  }

  repaint() {
    this.render();
  }

  // 子类填充实现
  destroySelf() {
    this.isDestroyed = true;
    this.img = null;

    this.src = '';
    this.root = null;
  }

  render() {
    if (!this.img || !this.img?.complete) {
      return;
    }

    const style = this.style || {};
    const box = this.layoutBox;
    const ctx = this.ctx as CanvasRenderingContext2D;

    ctx.save();

    if (style.borderColor) {
      ctx.strokeStyle = style.borderColor;
    }

    ctx.lineWidth = style.borderWidth || 0;

    const drawX = box.absoluteX;
    const drawY = box.absoluteY;

    const { needClip, needStroke } = this.renderBorder(ctx);

    if (needClip) {
      ctx.clip();
    }

    if (style.backgroundColor) {
      ctx.fillStyle = style.backgroundColor;
      ctx.fillRect(drawX, drawY, box.width, box.height);
    }

    if (style.backgroundImage && this.backgroundImage) {
      ctx.drawImage(this.backgroundImage, drawX, drawY, box.width, box.height);
    }

    ctx.drawImage(this.img, drawX, drawY, box.width, box.height);

    if (needStroke) {
      ctx.stroke();
    }

    ctx.restore();
  }
}
