import PostType from "./post"

type TagType = {
  slug: string
  name: string
  color: string
  posts: PostType[]
}

export default TagType
