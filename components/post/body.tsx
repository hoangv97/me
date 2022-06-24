import markdownStyles from './markdown-styles.module.scss';
import Block from '../notion/block';

type Props = {
  content: any[];
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={markdownStyles.markdown}>
        {content.map((block) => (
          <div key={block.id}>
            <Block data={block} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostBody;
