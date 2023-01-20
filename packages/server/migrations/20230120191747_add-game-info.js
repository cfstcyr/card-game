/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.alterTable('Game', (table) => {
        table.string('instructions', 1024);
        table.boolean('nsfw').defaultTo(true).notNullable();
        table.string('mode').defaultTo('default').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.alterTable('Game', (table) => {
        table.dropColumn('instructions', 1024);
        table.dropColumn('nsfw');
        table.dropColumn('mode');
    });
};
