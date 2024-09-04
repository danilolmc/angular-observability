import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DeletetableItemDirective } from '../../directives/deletetable-item.directive';
import { Post } from '../../shared/types/post';

@Component({
  selector: 'app-list',
  standalone: true,
  template: `
    <ul>
      @for (item of posts; track item) {
        <li data-test="post">
          <button  deletableItem [postId]="item.id">X</button>
          <a [routerLink]="['/post', item.id]">
            <h2 >{{item.title}}</h2>
          </a>
          <p>{{item.body}}</p>
          <div>
            <span>Views: {{item.views}}</span>
            <span>Likes {{item.reactions.likes}}</span>
          </div>
        </li>
      } @empty {
        <p>Nenhum post para ser exibido</p>
      }
    </ul>
  `,
  styles: `
    ul {
      gap: 1rem;
      list-style: none;
    }
    
    ul li {
      padding: 1.5rem 1rem;
      background: #fff;
      border: 1px solid #ddd;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
      position: relative; 
    }
    
    ul li p {
      margin-top: 2rem;
    }
    
    ul li > div {
      display: flex;
      justify-content: start;
      gap: 2rem;
      margin-top: 2rem;
    }

    ul li + li {
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

    h2 {
      cursor: pointer;
      
      &:hover {
        text-decoration: underline;
      }
    }

  `,
  imports: [AsyncPipe, DeletetableItemDirective, RouterLink],
  providers: [Router]
})
export class ListComponent {

  @Input()
  posts!: Post[] | null;
}
