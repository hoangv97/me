import Link from 'next/link';
import TagType from '../../types/tag';

type Props = {
  tag: TagType;
};

const Tag = ({ tag }: Props) => {
  return (
    <Link as={`/tags/${tag.slug}`} href="/tags/[slug]">
      <a className="hover:underline text-blue-400">{tag.name}</a>
    </Link>
  );
};

export default Tag;
