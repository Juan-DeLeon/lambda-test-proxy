"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = exports.get = void 0;
const dbService_1 = require("../services/dbService");
function get(branch) {
    const pool = (0, dbService_1.init)();
    return pool.table('BranchEmail').select([
        'Name',
        'Description',
        'Email',
        'Branch_No'
    ]).first()
        .where({ Branch_No: branch });
}
exports.get = get;
// TO DO: BranchEmail interface
function create(data) {
    const pool = (0, dbService_1.init)();
}
exports.create = create;
function update(branch, data) {
    const pool = (0, dbService_1.init)();
}
exports.update = update;
