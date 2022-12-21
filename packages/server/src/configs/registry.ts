import { registry } from 'tsyringe';
import { SYMBOLS } from '../constants/symbols';
import { DefaultController, GameController } from '../controllers';
import { CardController } from '../controllers/card-controller/card-controller';

@registry([
    { token: SYMBOLS.controller, useClass: DefaultController },
    { token: SYMBOLS.controller, useClass: GameController },
    { token: SYMBOLS.controller, useClass: CardController },
])
export class Registry {}
