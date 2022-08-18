const express = require("express");

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require(`${__dirname}/../controllers/tourController.js`);
const tourController = require(`${__dirname}/../controllers/tourController.js`);

const router = express.Router();

// router.param("id", (req, res, next, val) => {
//   console.log(req);
//   console.log(res);
//   console.log(val);
//   next();
// });

router.route("/").get(tourController.getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;

// // app.get("/api/v1/tours", getAllTours);
// // app.post("/api/v1/tours", createTour);
// // // Or
// tourRouter.route("/").get(getAllTours).post(createTour);

// // // ? mean id is optional
// // // app.get("/api/v1/tours/:id?", getTour);
// // app.get("/api/v1/tours/:id", getTour);
// // app.patch("/api/v1/tours/:id", updateTour);
// // app.delete("/api/v1/tours/:id", deleteTour);
// // // Or
// tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
