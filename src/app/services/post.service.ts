import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_ENDPOINT } from "../api/api";
import { Comments, GetDeleteResponse, GetPostsResponse, Post } from "../shared/types/post";


@Injectable()
export class PostService {

    httpClient = inject(HttpClient);
    API = inject(API_ENDPOINT);
    
    getPosts(limit = 10) {
        return this.httpClient.get<GetPostsResponse>(`${this.API}?limit=${limit}`)
    }

    deletePost(postId: number) {
        return this.httpClient.delete<GetDeleteResponse>(`${this.API}/${postId}`)
    }

    getPostById(postId: number) {
        return this.httpClient.get<Post>(`${this.API}/${postId}`)
    }

    getPostComments(postId: number) {
        return  this.httpClient.get<Comments>(`${this.API}/${postId}/comments`)
    }    
} 