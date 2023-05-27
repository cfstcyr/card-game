import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
    @Input() card?: Omit<Card, 'gameId'>;
    @Input() isSystem: boolean = false;
}