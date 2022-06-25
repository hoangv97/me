import TagType from "./tag"

type PostType = {
  slug: string
  title: string
  date: string
  coverImage: string
  ogImage: {
    url: string
  }
  content: any[]
  tags: TagType[]
}

export default PostType
