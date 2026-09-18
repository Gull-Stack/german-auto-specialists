/**
 * The machine-readable fact sheet, available to templates.
 *
 * /llms.txt is generated from this rather than retyping the facts, because
 * retyping them is the only way they come to disagree. docs/notes.md records
 * brand-facts.json sitting stale at 4.9 / 150 / 2005 for months for exactly
 * that reason. Edit src/.well-known/brand-facts.json and both surfaces move.
 */
module.exports = require("../.well-known/brand-facts.json");
