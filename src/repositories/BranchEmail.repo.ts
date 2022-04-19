import { init } from '../services/dbService';

export function get(branch: number) {
    const pool = init();

    return pool.table('BranchEmail').select([
        'Name',
        'Description',
        'Email',
        'Branch_No'
    ]).first()
    .where({Branch_No: branch});
}

// TO DO: BranchEmail interface
export function create(data: any) {
    const pool = init();
}

export function update(branch: number, data: any) {
    const pool = init();
}