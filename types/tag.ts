import PostType from "./post"

type TagType = {
  slug: string
  name: string
  posts: PostType[]
}

export default TagType
