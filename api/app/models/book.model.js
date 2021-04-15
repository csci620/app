module.exports = mongoose => {

    const Book = mongoose.model(
      "book",
      mongoose.Schema(
        {
          title: String,
          description: String,
          author: String,
          published: Boolean,
          editions: [{
            publishDate: {type: Date, required: true},
            publisher: String
          }],
        },
        { timestamps: true },
      )
    );
  
    return Book;
  };