const fs = require("fs");
const Tour = require("../models/tourModel");

// const tours = fs.existsSync(`${__dirname}/../data/testData.json`)
//   ? JSON.parse(fs.readFileSync(`${__dirname}/../data/testData.json`))
//   : {};

// Get all tours
const getAllTours = (req, res) => {
  console.log("Get all tours is working!!!");
  res.status(200).send({
    data: {
      // tours: tours,
      // length: tours.length,
      requestTime: req.requestTime,
    },
    status: 200,
  });
};

// Get one specify tour
const getTour = (req, res) => {
  // try {
  //   const data = tours.find((e) => {
  //     return String(e.id) === String(req.params.id);
  //   });
  //   if (!data) {
  //     res.status(404).json({
  //       status: "Failed",
  //       message: "No data found",
  //     });
  //     return;
  //   }
  //   res.status(200).json({
  //     status: "Success",
  //     data: {
  //       tour: data,
  //       requestTime: req.requestTime,
  //     },
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
};

// Add one tour
const createTour = (req, res) => {
  try {
    const newTour = await Tour.create(
      Object.assign({
        createdAt: req.requestTime,
        ...req.body,
      })
    );
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status("404").json({
      status: "Failed",
      message: err,
    });
  }
};

// Update entire data
const updateTour = (req, res) => {
  // try {
  //   const data = tours.find((e) => {
  //     return e.id * 1 === req.params.id * 1;
  //   });
  //   if (!data) {
  //     res.status(404).json({
  //       status: "Failed",
  //       message: "No data found",
  //     });
  //     return;
  //   }
  //   const newTours = tours.map((value) => {
  //     if (value.id * 1 !== req.params.id * 1) {
  //       return value;
  //     } else {
  //       return { ...data, ...req.body };
  //     }
  //   });
  //   fs.writeFile(
  //     `${__dirname}/testData.json`,
  //     JSON.stringify(newTours),
  //     (err) => {
  //       res.status(200).json({
  //         status: "success",
  //         data: {
  //           tour: { ...data, ...req.body },
  //         },
  //       });
  //     }
  //   );
  // } catch (err) {
  //   console.log(err);
  // }
};

// Delete entire tours (Truly delete)
const deleteTour = (req, res) => {
  // try {
  //   const data = tours.filter((value) => {
  //     return value.id * 1 === req.params.id * 1;
  //   });
  //   const newTours = tours.filter((value) => {
  //     return value.id * 1 !== req.params.id * 1;
  //   });
  //   if (data.length !== 0) {
  //     fs.writeFile(
  //       `${__dirname}/newData.json`,
  //       JSON.stringify(newTours),
  //       (err) => {
  //         res.status(200).json({
  //           status: "Success",
  //           data: { tour: data[0] },
  //         });
  //       }
  //     );
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
};

module.exports = { getAllTours, createTour, getTour, updateTour, deleteTour };
