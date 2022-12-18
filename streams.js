const fs = require("fs")
const process = require("process");
const { pipeline, Transform } = require("stream")
const csvFilePath = "data.csv.gz";
const nd = require("ndjson")
const rs = fs.createReadStream("Cell_Phones_and_Accessories.ndjson")
const afinn = require("./AFINN.json")




//creating a tranform for filtering spam
const filterSpam = () => {
    return new Transform ({
        // objectMode: true
    transform: function(chunk, enc, push) {
        const obj = JSON.parse(chunk);
//checking if the class in 0 as thats means its not spam 
// push null for everything else as it is spam
        if (obj.class == "int 0") {
        push(null, chunk);
      } else {
        push(null);
    }
}});
}

let positive = 0
//created a variable called positive to keep count
//creating a tranform stream to add positive score
const checkPositive = () => {
    return new Transform ({
    transform: function(chunk, enc, push) {
        const obj = JSON.parse(chunk);
        const object = JSON.parse(afinn)
//making both the file and afinn into objects so they are accessible

//making the file from string into array
        for (const pieces of chunk.reviewText) {
            let string = chunk.reviewText
            const array = string.split(" ")
            chunk.reviewText = array
        }
//Checking if words in the array match the afinn
        for (pieces of chunk.reviewText) {
            if (pieces in afinn == true ) {
//If words in array match the afinn, use the word as key to add
//positivity valuue to count(cont is variable called positive)
             positive += Number(object.pieces)
//created a key called positivity with the count value
             obj.positivity = positive   
             push(null, chunk);
             let positive = 0
//reset the count so for every key review the count is zero
//so that every review has a positive score
            } else {
              push(null);
            }
            }
       }
    })
};
//created a stream to sort the positive scores
const sortStream = () => {
    return new Transform ({
    transform: function(chunk, enc, push) {
        const obj = JSON.parse(chunk);
        
        const sort = obj.positivity.sort((a, b) => b.value - a.value);
//using the sort method to sort reviews positivity from highest to lowest
        push(null, chunk);
      }
});
};
//created a stream to write to file the reviews in the sorted order
const writeFile = () => {
    return new Transform ({
    transform: function(chunk, enc, push) {
//used fs.appendFile to write to a sorted reviews to file
        fs.appendFile('filteredData.ndjson', chunck, function (err) {
            if (err) {
            console.log(err);
          } else {
            console.log(`Reviews sorted and saved`)
            push(null, chunk);
          }
        })
    }
});
};

//pipeline all my streams in proper order
pipeline(rs, filterSpam(), checkPositive(), sortStream(), writeFile(), process.stdout, (err) => console.log(err));