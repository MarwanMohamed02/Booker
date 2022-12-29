"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemberDibs = void 0;
function getMemberDibs(uuid, sort) {
    return `SELECT 
                book_id,
                book_name,
                author,
                book_description,
                avg_rating,
                FROM_UNIXTIME(Reservations.reservation_date) as reservation_date 
                FROM  Reservations 
            RIGHT JOIN Books ON Reservations.book_id = Books.isbn 
            WHERE Reservations.member_id = UUID_TO_BIN("${uuid}") 
            ORDER BY reservation_date ${sort}; `;
}
exports.getMemberDibs = getMemberDibs;
