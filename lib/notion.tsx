export const COLORS = [
  'gray',
  'brown',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'red',
];

export const getColorStyle = (color: string) => {
  if (color !== 'default') {
    if (color.includes('background')) {
      return { background: color.replace('_background', '') };
    } else {
      return { color };
    }
  }
  return null;
};

interface ParseTextProps {
  key?: number;
  textOnly?: boolean;
}

export const parseText = (data: any, config: ParseTextProps = {}) => {
  try {
    // console.log(data);

    let className = '';

    const { type, annotations } = data;
    const value = data[type];

    const { key, textOnly } = config;

    // type === text
    const { link } = value;
    let { content } = value;

    if (textOnly) {
      return content;
    }

    const style: any = getColorStyle(annotations.color) || {};

    if (annotations.bold) {
      style.fontWeight = 'bold';
    }
    if (annotations.italic) {
      style.fontStyle = 'italic';
    }
    if (annotations.strikethrough) {
      style.textDecoration = 'line-through';
    }
    if (annotations.underline) {
      style.textDecoration = 'underline';
    }
    if (annotations.code) {
      content = <pre>{content}</pre>;
    }

    if (link) {
      const { url } = link;
      return (
        <a
          key={key}
          href={url}
          style={style}
          className={className}
          target="_blank"
        >
          {content}
        </a>
      );
    } else {
      return (
        <span key={key} style={style} className={className}>
          {content}
        </span>
      );
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

interface ParseRichTextProps {
  textOnly?: boolean;
}

export const parseRichText = (value: any, config: ParseRichTextProps = {}) => {
  const { textOnly } = config;
  return (value || []).map((text: any, id: number) =>
    parseText(text, { key: id, textOnly })
  );
};
