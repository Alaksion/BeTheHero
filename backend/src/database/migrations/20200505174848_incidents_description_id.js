
exports.up = function(knex) {
    return knex.schema.raw("ALTER TABLE `incidents` ADD COLUMN `description` CHAR DEFAULT NULL")
       
};

exports.down = function(knex) {
    return knex.schema.raw("ALTER TABLE `incidents` ADD COLUMN `description` CHAR DEFAULT NULL")
}