const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Coundn't write file!");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data, err) => {
  return new Promise((resolve, reject) => {
    if (err) reject("Coundn't write file!");
    resolve("Write file success!");
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    writeFilePro("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Random dog saved!");
  })
  .catch((err) => {
    console.log(err.message);
  });

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       if (err) {
//         return console.log(err.message);
//       }

//       console.log(JSON.stringify(res.body));

//       fs.writeFile("dog-img.txt", JSON.stringify(res.body), (err) => {
//         if (err) {
//           return console.log(err.message);
//         }
//         console.log("Random dog image saved to file!");
//       });
//     });
// });
