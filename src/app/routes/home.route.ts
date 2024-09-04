import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Component, DestroyRef, inject } from '@angular/core';
import { map } from 'rxjs';
import { ListComponent } from '../components/list/list.component';
import { DELETE_ACTION } from '../directives/deletetable-item.directive';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
      @defer {
        <app-list [posts]="posts | async"/>
      } @loading {
        <p>Carregando posts...</p>
      } @error {
        <p>Erro ao tentar carregar posts...</p>
      }
  `,
  styles: `
    :host {
      display: block;
      padding: 1rem;
    }
  `,
  imports: [ListComponent, AsyncPipe],
  providers: [
    PostService,
    {
      provide: DELETE_ACTION,
      useFactory: () => {
        const postService = inject(PostService);
        const destroyRef = inject(DestroyRef);

        return {
          delete(id: number) {
            postService.deletePost(id).pipe(takeUntilDestroyed(destroyRef)).subscribe()
          }
        }
      },
      deps: [PostService]
    }
  ]
})
export class HomeRoute {

  private postService = inject(PostService);
  posts = this.postService.getPosts().pipe(map(res => res.posts));

}
