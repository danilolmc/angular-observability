import { Directive, inject, InjectionToken, input } from '@angular/core';

export interface DeleteAction {
  delete(id: number): void
}

export const DELETE_ACTION = new InjectionToken<DeleteAction>('DELETE_ACTION')

@Directive({
  selector: '[deletableItem]',
  standalone: true,
  host: {
    '(click)': 'deletePost()'
  },
})
export class DeletetableItemDirective {

  postId = input.required<number>();

  deleteAction = inject(DELETE_ACTION, {
    skipSelf: true
  });

  deletePost() {
    this.deleteAction.delete(this.postId());
  }
}
