
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DeletetableItemDirective } from '../directives/deletetable-item.directive';
import { providdeDeletePostAction } from '../providers/deletePostAction';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
   <a class="back-btn" [routerLink]="['/']" >Back</a>

   <ng-template let-post #postTemplate>
     @if(post?.id){    
         <div class="post">
          <button  deletableItem [postId]="postId()">X</button>
          <h2>{{post.title}}</h2>
          <p>{{post.body}}</p>
          <div>
            <span>Views: {{post.views}}</span>
            <span>Likes {{post.reactions.likes}}</span>
          </div>
          <div class="tags">
            @for (tag of post.tags; track tag) {
              <span>{{tag}}</span>
            }
          </div>

          <h2 class='comments-title'>Comments</h2>
          <ul>
            @for (comment of (postComments | async)?.comments; track comment) {
              <li>
                <small>{{comment.user.username}}</small>
                <p>{{comment.body}}</p>
              </li>
            } @empty {
              <p>No comments yet</p>
            }
          </ul>
      </div>
      } @else {
        <p>Não foi possível carregar os dados do post</p>
      }  
    </ng-template>

  <ng-container *ngTemplateOutlet="postTemplate; context: {$implicit: (post | async)}"></ng-container>  
  `,
  styles: `
    :host {
      display: block;
      padding: 1rem;
    }

    .post {
      padding: 1.5rem 1rem;
      background: #fff;
      border: 1px solid #ddd;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
      position: relative; 
      display: block;
    }
    
     p {
      margin-top: 2rem;
    }
    
    div {
      display: flex;
      justify-content: start;
      gap: 2rem;
      margin-top: 2rem;
    }

    button {
      position: absolute;
      top: 0;
      right: 0;
      color: red;
      border: 0;
      background: none;
      padding: 0.5rem;
      cursor: pointer;
    }
    .tags {
      display: flex;
      gap: 1rem;
      
      & > span {
        cursor: context-menu;

        &::before {
          content: '#';
        }
      }

      .back-btn {
        margin-bottom: 2rem;
        display: block;
      }
    }


    .comments-title {
      margin-top: 2rem;
    }

    ul {
        padding: 0;

        li {
          list-style: none;
          border: 1px solid #eee;
          padding: 0.5rem 1rem;

          &:first-of-type {
            margin-top: 1rem;	
          }

          p {
            margin: 0.5rem 0;
          }

          small {
            font-weight: bold;
          }

          & + li {
            margin-top: 1rem;
          }
      }
    }
  `,
  imports: [DeletetableItemDirective, AsyncPipe, NgTemplateOutlet, RouterLink],
  providers: [
    PostService,
    Router,
    providdeDeletePostAction()
  ]
})
export default class PostRoute {

  private currentRoute = inject(ActivatedRoute);
  private postService = inject(PostService);

  postId = signal(this.currentRoute.snapshot.params['postId']);
  post = this.postService.getPostById(this.postId());
  postComments = this.postService.getPostComments(this.postId());

}
