
exports.up = function(knex) {
    return knex.schema.createTable('incidents', (table)=>{
        table.increments('id') //id auto incrementado PK
        table.string('title').notNullable()
        table.decimal('value').notNullable()
        table.string('description').notNullable()

        table.string('ong_id').notNullable() //fk
        table.foreign('ong_id').references('id').inTable('ongs')

    })
};

exports.down = function(knex) {
    return knex.schema.droptable('incidents')
  
};
