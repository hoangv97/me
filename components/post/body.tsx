import { NotionBlock } from '../notion';
import markdownStyles from './markdown-styles.module.scss';

type Props = {
  content: any[];
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={markdownStyles.markdown}>
        {content.map((block) => (
          <div key={block.id}>
            <NotionBlock data={block} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostBody;
