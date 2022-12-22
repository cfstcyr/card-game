/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('User', (table) => {
        table.integer('id').notNullable().primary();
        table.string('email', 255).notNullable().unique();
        table.string('password', 255).notNullable();
        table.boolean('isAdmin').notNullable().defaultTo(false);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTable('User');
};
