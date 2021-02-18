
const fetch = require('node-fetch');

console.log("Loading book-info");


const get_info = (name,author, callback) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${name.replace(' ', '_')}+inauthor:${author.split(' ')[0]}`)
        .then(response => response.json())
        .then(data => callback(data));
}

exports.get_info = get_info;
