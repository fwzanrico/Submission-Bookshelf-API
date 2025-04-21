const { nanoid } = require("nanoid");
const books = require("./books");



const storeBooks = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    if(name == undefined){
        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }

    if(readPage > pageCount){
        const response = h.response(
            {
                "status": "fail",
                "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
            }
        );
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    let finished = false;
    if(readPage == pageCount){
         finished = true;
    }

    const insertedAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const newBooks = {
        id,
        name,
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage,
        finished, 
        reading,
        insertedAt,
        updatedAt,
    }

    books.push(newBooks);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if(isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId:id,
            },
        });

        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan'
    });
    response.code(400);
    return response;

};
const getAllBooks = (request, h) => {
    const { name, reading, finished } = request.query;

    let filteredBooks = books;
  
    if (name !== undefined) {
      filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }
  
    if (reading !== undefined) {
      filteredBooks = filteredBooks.filter((book) => book.reading == reading);
    }
    if (finished !== undefined) {
      filteredBooks = filteredBooks.filter((book) => book.finished == finished);
    }
  
    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooks.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  };

const getBookById = (request, h) => {
    const { bookid } = request.params;
    const book = books.filter((n) => n.id == bookid)[0];

    if(book !== undefined){
        const response = h.response({
            status: 'success',
            data:{
                book,
            }
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        "status": "fail",
        "message": "Buku tidak ditemukan"
    });
    response.code(404);
    return response;
};
const updateBookById = (request, h) => {
    const { bookid } = request.params;
    const index = books.findIndex((book) => book.id === bookid);
    if(index == -1){
        return h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Id tidak ditemukan"
        }).code(404);
    }

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if(name == undefined){
        return h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Mohon isi nama buku"
        }).code(400);
    }
    if(readPage > pageCount){
        const response = h.response(
            {
                "status": "fail",
                "message": 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
            }
        );
        response.code(400);
        return response;
    };

    const updatedAt = new Date().toISOString();

    books[index] = {
        ...books[index],
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        reading,
        updatedAt 
    };
    const response = h.response({
        "status": "success",
        "message": "Buku berhasil diperbarui"
    });
      response.code(200);
      return response;
};
const deleteBookById = (request, h) => {
    const { bookid } = request.params;
    const index = books.findIndex((book) => book.id === bookid);
    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            "status": "success",
            "message": "Buku berhasil dihapus"
        });
        response.code(200);
        return response;
      }
     
    const response = h.response({
        "status": "fail",
        "message": "Buku gagal dihapus. Id tidak ditemukan"
    });
      response.code(404);
      return response;
};
module.exports = {storeBooks, getAllBooks, getBookById, updateBookById, deleteBookById};