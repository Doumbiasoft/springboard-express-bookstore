process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");
const Book = require("../models/book");


describe("Book Routes Test", function(){

        beforeEach(async ()=>  {
            await db.query("DELETE FROM books");
        
            await Book.create({
                
                    isbn: "0691161518",
                    amazon_url: "http://a.co/eobPtX2",
                    author: "Matthew Lane",
                    language: "english",
                    pages: 264,
                    publisher: "Princeton University Press",
                    title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                    year: 2017
                
            });
        });
      /** GET /books  */
      it('can get list of all books', function(done) {
        request(app)
          .get('/books')
          .expect(200, done);
      });
       /** GET /books/:id  */
       it('can get one book', function(done) {
        request(app)
          .get('/books/0691161518')
          .expect(200, done);
      });
        /** POST /book => {book: newBook}  */
        it('can add a new book', function(done) {
            request(app)
              .post('/books')
              .send({
                isbn: "7691161518",
                amazon_url: "http://a.co/eobPtX2",
                author: "Mouhamed Doumbia",
                language: "French",
                pages: 64,
                publisher: "ACTIV",
                title: "Code interviewing",
                year: 2021
              })
              .set('Accept', 'application/json')
              .expect(201,{book:{
                isbn: "7691161518",
                amazon_url: "http://a.co/eobPtX2",
                author: "Mouhamed Doumbia",
                language: "French",
                pages: 64,
                publisher: "ACTIV",
                title: "Code interviewing",
                year: 2021
              }}, done);
          });

        /** POST /book => {book: newBook}  */
        it('Try adding a new book with missing parameters "pages,language"', function(done) {
            request(app)
                .post("/books")
                .send({
                    isbn: "7691161518",
                    amazon_url: "http://a.co/eobPtX2",
                    author: "Mouhamed Doumbia",
                    publisher: "Princeton University Press",
                    title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                    year: 2021
                  })
                  .expect({
                    error: 400,
                    message: [
                        "instance requires property \"language\"",
                        "instance requires property \"pages\""
                    ]},done);
        });




          /** DELETE /book => {message: deleted}  */
        it('Can delete a book', function(done) {
        request(app)
                .delete(`/books/0691161518`)
                .expect(200,{ message: "Book deleted" },done);
        });

        afterAll(async function () {
            await db.end();
      });


});