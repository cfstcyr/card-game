const NUMBER_GAMES = 3;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('Card').del();
    await knex('Game').del();

    await knex('Game').insert(
        new Array(NUMBER_GAMES).fill(0).map((_, i) => ({
            id: i,
            name: `Game ${i + 1}`,
            description: `Game number ${i + 1}`,
        })),
    );

    await knex('Card').insert(
        new Array(NUMBER_GAMES)
            .fill(0)
            .map((_, i) =>
                new Array(15).fill(0).map((_, j) => ({
                    id: j,
                    gameId: i,
                    content: `Card ${i + 1}.${j + 1}`,
                })),
            )
            .flat(),
    );
    // await knex('table_name').insert([
    //     { id: 1, colName: 'rowValue1' },
    //     { id: 2, colName: 'rowValue2' },
    //     { id: 3, colName: 'rowValue3' },
    // ]);
};
