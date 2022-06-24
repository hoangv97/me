import markdownStyles from './markdown-styles.module.scss';
import Block from './Notion/Block';

type Props = {
  content: any[];
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={markdownStyles.markdown}>
        {content.map((block) => (
          <div>
            <Block key={block.id} data={block} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostBody;
