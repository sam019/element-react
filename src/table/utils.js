// @flow
let scrollBarWidth;

export const getScrollBarWidth = () => {
  if (scrollBarWidth !== undefined) return scrollBarWidth;
  const outer = document.createElement('div');
  var body:any = document.body || outer;

  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  const outerParent = outer.parentNode || body;
  outerParent.removeChild(outer);

  return widthNoScroll - widthWithScroll;
};

export function getRowIdentity(row, rowKey) {
  if (!row) throw new Error('row is required when get row identity');
  if (typeof rowKey === 'string') {
    return rowKey.split('.').reduce((pre, cur) => pre[cur], row);
  } else if (typeof rowKey === 'function') {
    return rowKey.call(null, row);
  }
}