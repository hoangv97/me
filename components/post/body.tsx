import NotionBlock from './notion-block';
import bodyStyles from './body.module.scss';

type Props = {
  content: any[];
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={bodyStyles.body}>
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
