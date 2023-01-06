/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.alterTable('Game', (table) => {
        table.string('image', 255);
        table.string('color', 255);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.alterTable('Game', (table) => {
        table.dropColumn('image');
        table.dropColumn('color');
    });
};
