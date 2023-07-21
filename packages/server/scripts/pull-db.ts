// import { cleanEnv, num, str } from 'envalid';
// import knex from 'knex';
// import 'dotenv/config';
// import { Game } from '../src/models/game';
// import { Card } from '../src/models/card';
// import { writeFileSync } from 'fs';

// (async () => {
//     const env = cleanEnv(process.env, {
//         DB_HOST: str(),
//         DB_PORT: num(),
//         DB_USER: str(),
//         DB_PASSWORD: str(),
//         DB_DATABASE: str(),
//     });

//     const db = knex({
//         client: 'mysql',
//         connection: {
//             host: env.DB_HOST,
//             port: env.DB_PORT,
//             user: env.DB_USER,
//             password: env.DB_PASSWORD,
//             database: env.DB_DATABASE,
//             multipleStatements: true,
//         },
//     });

//     const output: { games: Array<unknown> } = { games: [] };

//     const games: Game[] = await db
//         .table<Game>('Game')
//         .select(
//             'Game.color',
//             'Game.description',
//             'Game.id',
//             'Game.image',
//             'Game.instructions',
//             'Game.mode',
//             'Game.name',
//             'Game.nsfw',
//         )
//         .leftJoin<Card>('Card', 'Card.gameId', 'Game.id')
//         .count('Card.id as cardsCount')
//         .groupBy('Game.id');

//     for (const game of games) {
//         const cards = await db
//             .table<Card>('Card')
//             .select('id', 'content')
//             .where({ gameId: game.id });

//         output.games.push({ ...game, cards });
//     }

//     writeFileSync('./games.json', JSON.stringify(output));

//     return;
// })();
