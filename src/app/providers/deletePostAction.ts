import { DestroyRef, inject } from "@angular/core";
import { DELETE_ACTION } from "../directives/deletetable-item.directive";
import { PostService } from "../services/post.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export function providdeDeletePostAction() {
    return {
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

}