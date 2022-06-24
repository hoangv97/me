import { parseRichText } from '../../../lib/notion';

interface BlockProps {
  data: any;
}

const Block = ({ data }: BlockProps) => {
  // console.log(data);

  const { id, type, has_children } = data;
  const value = data[type];

  switch (type) {
    case 'paragraph':
      return <p>{parseRichText(value.rich_text)}</p>;
    case 'heading_1':
      return <h1>{parseRichText(value.rich_text)}</h1>;
    case 'heading_2':
      return <h2>{parseRichText(value.rich_text)}</h2>;
    case 'heading_3':
      return <h3>{parseRichText(value.rich_text)}</h3>;
    case 'code':
      return (
        <pre>
          <code>
            {!!value.rich_text.length && value.rich_text[0].plain_text}
          </code>
        </pre>
      );
    case 'callout':
    case 'quote':
      return <blockquote>{parseRichText(value.rich_text)}</blockquote>;
    case 'divider':
      return <hr></hr>;
    case 'video':
      return (
        <video controls>
          <source src={value[value.type].url}></source>
        </video>
      );
    case 'image':
      return <img src={value[value.type].url} />;
    case 'embed':
    case 'file':
    case 'pdf':
    case 'link_preview':
    case 'bookmark':
      let url = value.type ? value[value.type].url : value.url;
      return (
        <a href={url} target="_blank" className="text-blue-600">
          {url}
        </a>
      );
    default:
      // console.log('Unsupported', data);
      return <p className="text-red-600">Unsupported</p>;
  }
};

export default Block;
