const request = require("supertest")("http://localhost:3000/api");
const expect = require("chai").expect;

const test_data = [
  ["A Tale of Two Cities", "Dickens, Charles"],
  ["The Principles of Mathematics", "Russel, Bertrand"],
  ["Pride and Prejudice", "Austen, Jane", [{publishDate: "12/12/1875", publisher: "random house"}]],
  ["Great Expectations", "Dickens, Charles"],
  ["The Name of the Rose", "Eco, Umberto"],
  ["The Godfather", "Puzo, Mario"]
];

const one_book = {
  name: "Pride and Prejudice",
  author: "Austen, Jane",
  editions: [
    {
      publishDate: "12/12/1863",
      publisher: "Random House"
    }
  ]
}

describe("DELETE /books", function () {
  it("Deletes all books", async function () {
    const response1 = await request.delete("/books");
    expect(response1.status).to.eql(200);
    // expect(response.body.data.length).to.eql(30);
    const response2 = await request.get("/books");
    expect(response2.status).to.eql(200);
    expect(response2.body.length).to.eql(0);
  });
});

describe("POST /books", function () {
  it("Adds a new book", async function () {
    const response = await request
      .post("/books")
      .send(one_book);

    expect(response.status).to.eql(200);
  });
});


describe("GET /books", function () {
  it("returns all books", async function () {
    await request.delete("/books");

    for (let book of test_data) {
      await request
        .post("/books")
        .send({ title: book[0], author: book[1], editions: book[2] || []});

    }

    const response = await request.get("/books");

    expect(response.status).to.eql(200);
    expect(response.body.length).to.eql(test_data.length);
  });
});