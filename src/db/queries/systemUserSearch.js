"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemUserSearch = void 0;
// Inserts System User and returns the uuid
function systemUserSearch(sysUser) {
    const { uuid, firstname, lastname, email, phone_number } = sysUser;
    if (!uuid && !firstname && !lastname && !email && !phone_number)
        return;
    const attributes = [firstname, lastname, phone_number, email];
    const attNames = ["firstname", "lastname", "phone_number", "email"];
    let query = `SELECT 
                        System_Users.id::UUID AS uuid, firstname, lastname, phone_number, email
                 FROM System_Users
                 WHERE `;
    // Special Attributes
    if (uuid)
        query += ` System_Users.id::UUID = '${uuid}' `;
    for (let i = 0; i < attributes.length; i++) {
        if (attributes[i]) {
            attributes[i] = attNames[i] !== "phone_number" ? `'${attributes[i]}'` : attributes[i];
            query += query.includes("AND") ? `AND ${attNames[i]} = ${attributes[i]} ` : `${attNames[i]} = ${attributes[i]} `;
        }
    }
    query += ";";
    return query;
}
exports.systemUserSearch = systemUserSearch;
