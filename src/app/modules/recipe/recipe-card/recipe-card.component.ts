import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() tags!: string[];
  @Input() img!: string;
  @Input() title!: string;
  @Input() id!: string;
  tagsArr!: string[];
  ngOnInit() {
    this.tagsArr = this.tags[0].split(', ');
  }
}
