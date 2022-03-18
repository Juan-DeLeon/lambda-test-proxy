"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizedUsers = void 0;
const dbService_1 = require("../services/dbService");
async function AuthorizedUsers(AppId) {
    // check cache for existing info on clientid
    const cachedData = global.DatabaseCache[AppId];
    if (cachedData)
        return cachedData;
    const pool = (0, dbService_1.init)();
    console.log("getting from db");
    // const trx = await pool.transaction({isolationLevel: 'read uncommitted'});
    const res = await pool.table({ U: 'ApplicationUser' })
        .join({ UR: 'ApplicationUserRole' }, 'U.ApplicationUserId', 'UR.ApplicationUserId')
        .join({ R: 'ApplicationRole' }, 'UR.ApplicationRoleId', 'R.ApplicationRoleId')
        .select({
        email: 'Email',
        role: 'R.Code',
        roleId: 'R.ApplicationRoleId',
        active: 'UR.Active'
    })
        .where({
        'ApplicationId': AppId
    });
    // await trx.commit();
    console.log("got from db", res);
    let mappedUsers = {};
    res.forEach((el) => {
        mappedUsers[el.email] = el;
    });
    global.DatabaseCache[AppId] = mappedUsers;
    // return user authorized true / false
    return mappedUsers;
}
exports.AuthorizedUsers = AuthorizedUsers;
