import { parseRichText } from '../../lib/notion';
import SyntaxHighlighter from 'react-syntax-highlighter';

interface BlockProps {
  data: any;
}

const NotionBlock = ({ data }: BlockProps) => {
  // console.log(data);

  const { type } = data;
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
    case 'bulleted_list_item':
      return (
        <ul>
          <li>{parseRichText(value.rich_text)}</li>
        </ul>
      );
    case 'code':
      return (
        <pre className="bg-gray-100 px-5 py-3">
          <code>
            <SyntaxHighlighter
              language={value.language}
              customStyle={{ background: 'transparent' }}
              showLineNumbers
            >
              {!!value.rich_text.length && value.rich_text[0].plain_text}
            </SyntaxHighlighter>
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
        <a href={url} target="_blank" className="text-blue-600 hover:underline">
          {url}
        </a>
      );
    default:
      console.log('Unsupported', data);
      return <p className="text-red-600">Unsupported</p>;
  }
};

export default NotionBlock;
