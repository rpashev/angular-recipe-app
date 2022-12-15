import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-authored-card',
  templateUrl: './recipe-authored-card.component.html',
  styleUrls: ['./recipe-authored-card.component.scss'],
})
export class RecipeAuthoredCardComponent {
  @Input() summary!: string;
  @Input() img!: string;
  @Input() title!: string;
  @Input() id!: string;
  @Input() isAuthor: boolean = false;
  @Input() isFavorite: boolean = false;
  tagsArr!: string[];
}
