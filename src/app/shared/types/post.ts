export interface Post {
    id: number
    title: string
    body: string
    tags: string[]
    reactions: Reactions
    views: number
    userId: number,
}

export interface Reactions {
    likes: number
    dislikes: number
}

export interface GetPostsResponse {
    limit: number,
    posts: Post[],
    skip: number,
    total: number
}

export type GetDeleteResponse = GetPostsResponse & {
    isDeleted: true,
    deletedOn: string
}

export interface Comments {
    comments: Comment[]
    total: number
    skip: number
    limit: number
  }
  
  export interface Comment {
    id: number
    body: string
    postId: number
    likes: number
    user: CommentUser
  }
  
  export interface CommentUser {
    id: number
    username: string
    fullName: string
  }
  

