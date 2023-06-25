import { registry } from 'tsyringe';
import { SYMBOLS } from '../constants/symbols';
import {
    DefaultController,
    GameController,
    UserController,
} from '../controllers';

@registry([
    { token: SYMBOLS.controller, useClass: DefaultController },
    { token: SYMBOLS.controller, useClass: GameController },
    { token: SYMBOLS.controller, useClass: UserController },
])
export class Registry {}
