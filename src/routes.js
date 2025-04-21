const { storeBooks, getAllBooks, getBookById, updateBookById, deleteBookById } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: storeBooks,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks,
    },
    {
        method: 'GET',
        path: '/books/{bookid}',
        handler: getBookById,
    },
    {
        method: 'PUT',
        path: '/books/{bookid}',
        handler: updateBookById,
    },
    {
        method: 'DELETE',
        path: '/books/{bookid}',
        handler: deleteBookById,
    }
]



module.exports = routes;