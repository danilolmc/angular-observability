
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
      <router-outlet/>
  `,
  imports: [RouterOutlet],
  providers: [PostService],
})
export class AppComponent {

  private postService = inject(PostService);
  posts = this.postService.getPosts().pipe(map(res => res.posts));

}
