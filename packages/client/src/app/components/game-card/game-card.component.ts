import { Component, Input } from '@angular/core';
import { Card, CardDisplay } from 'src/app/models/card';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
    @Input() card?: Omit<CardDisplay, 'gameId'>;
    @Input() isSystem: boolean = false;
}
