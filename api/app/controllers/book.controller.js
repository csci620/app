const db = require("../models");
const Book = db.books;
//const bi = require("@wsmckenz/book-info");

//console.dir(bi)

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

//    bi.get_info(req.body.title, req.body.author, data =>{
//      if (data.totalItems > 0)
//      
//      console.log(data.items[0]);
//    })
  
    // Create a Book
    const book = new Book({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      published: req.body.published ? req.body.published : false,
      editions: req.body.editions
    });
  
    // Save Book in the database
    book
      .save(book)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Book."
        });
      });
  };
  
  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Book.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving books."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Book.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Book with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Book with id=" + id });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Book with id=${id}. Maybe Book was not found!`
          });
        } else res.send({ message: "Book was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Book with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Book.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
          });
        } else {
          res.send({
            message: "Book was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Book with id=" + id
        });
      });
  };
  
  exports.deleteAll = (req, res) => {
    Book.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Books were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all books."
        });
      });
  };

  exports.findAllPublished = (req, res) => {
    Book.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving books."
        });
      });
  };