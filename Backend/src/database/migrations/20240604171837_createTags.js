export const up = knex => knex.schema.createTable("notes_tags", table => {
    table.increments("id");
    table.text("name").notNullable();
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
})

export const down = knex => knex.schema.dropTable("notes_tags")