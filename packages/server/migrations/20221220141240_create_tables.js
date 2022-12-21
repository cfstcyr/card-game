/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('Game', (table) => {
        table.integer('id').notNullable().primary();
        table.string('name', 255).notNullable();
        table.string('description', 255);
        table.timestamps();
    });
    await knex.schema.createTable('Card', (table) => {
        table.integer('gameId').notNullable();
        table.integer('id').notNullable();
        table.string('content', 255).notNullable();
        table.timestamps();

        table.primary(['id', 'gameId']);
        table.foreign('gameId').references('Game.id');
    });

    knex('Game').insert({
        id: 1,
        name: 'Default game',
        description: 'This is the default game',
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTable('Card');
    await knex.schema.dropTable('Game');
};
