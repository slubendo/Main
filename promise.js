const fs = require("fs");
const { EOL } = require("os");

const viewAllSupply = (coffeeType) => {
  return new Promise((resolve, reject) => {
    fs.readFile("supply.txt", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let counter = 0;
        for (const item of data.split(EOL)) {
          if (item === coffeeType) {
            counter++;
          }
        }
        resolve(counter);
      }
    });
  });
};

const addSupply = (coffeeType) => {

  return new Promise((resolve, reject) => {
    fs.appendFile("supply.txt", `${EOL}${coffeeType}`, (err) => {
      if (err) {
        reject(err);
      } else {  
        resolve();
      }
    });

  })  

};

const deleteSupply = (coffeeType, quantity) => {
  return new Promise((resolve, reject) => {
    const originalQuantity = quantity;
  
    fs.readFile("supply.txt", "utf8", (err, data) => {
      if (err) {
        return reject(err);
      }
      const splitData = data.split(EOL);
      const newSupply = [];
      for (let i = 0; i < splitData.length; i++) {
        const currentItem = splitData[i];
        if (quantity === "*") {
          if (currentItem != coffeeType) {
            newSupply.push(currentItem);
          }
        } else {
          if (currentItem === coffeeType && quantity > 0) {
            quantity--;
            continue;
          } else {
            newSupply.push(currentItem);
          }
        }
      }
  
      fs.writeFile("supply.txt", newSupply.join(EOL), (err) => {
        if (err) {
          return reject(err);
        }
        const deletionMsg =
          quantity === "*"
            ? `All coffee(s) deleted`
            : `${originalQuantity - quantity} ${coffeeType} coffee(s) deleted.`;
        resolve(deletionMsg);
      });
    });
  })



};

viewAllSupply("MR")
  .then((count) => console.log(count))
  .then(() => addSupply("MR"))
  .then(() => viewAllSupply("MR"))
  .then((count) => console.log(count))
  .then(() => deleteSupply("MR", 2))
  .then((msg) => console.log(msg))
  .then(() => viewAllSupply("MR"))
  .then((count) => console.log(count))
  .then(() => deleteSupply("MR", "*"))
  .then((msg) => console.log(msg))
  .then(() => viewAllSupply("MR"))
  .then((count) => console.log(count))
  .catch((err) => console.log(err));