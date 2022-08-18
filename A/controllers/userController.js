const fs = require("fs");
const M = require("minimatch");
const moment = require("moment");

const users = fs.existsSync(`${__dirname}/../data/userData.json`)
  ? JSON.parse(fs.readFileSync(`${__dirname}/../data/userData.json`))
  : [];

// const sort

const getAllUsers = (req, res) => {
  try {
    let listUser;

    // Check status

    if (req.query.status !== undefined && Number(req.query.status) === 0) {
      listUser = users.filter((value) => value.isDeleted === true);
    } else {
      listUser = users;
    }

    // Check if data has nothing

    if (listUser.length < 1) {
      res.status(200).json({
        status: "success",
        message: "Nobody was created!",
      });
      return;
    }

    // HANDLE QUERY

    if (req.query.sortBy !== undefined && req.query.orderBy !== undefined) {
      if (req.query.orderBy === "desc") {
        listUser = listUser.sort((a, b) => {
          return ("" + b[req.query.sortBy]).localeCompare(
            "" + a[req.query.sortBy]
          );
        });
      } else {
        listUser = listUser.sort((a, b) => {
          return ("" + a[req.query.sortBy]).localeCompare(
            "" + b[req.query.sortBy]
          );
        });
      }
    } else if (
      req.query.sortBy === undefined &&
      req.query.orderBy !== undefined
    ) {
      if (req.query.orderBy === "desc") {
        listUser = listUser.sort((a, b) => {
          return ("" + b.createdAt).localeCompare("" + a.createdAt);
        });
      } else {
        listUser = listUser.sort((a, b) => {
          return ("" + a.createdAt).localeCompare("" + b.createdAt);
        });
      }
    } else {
      listUser = listUser.sort((a, b) => {
        return ("" + a.createdAt).localeCompare("" + b.createdAt);
      });
    }

    // PAGINATION

    const pageSize = Number(req.query.pageSize) || listUser.length;
    const pageNumber = Number(req.query.pageNumber) || 0;

    const from = pageNumber * pageSize;
    const to = from + pageSize;

    if (isNaN(from) || isNaN(to) || from + to === 1 || from * to === 1) {
      listUser = listUser;
      // listUser = listUser.slice(0, 10);
    } else {
      listUser = listUser.slice(from, to);
    }

    const pagination = {
      pageSize: pageSize,
      pageNumber: pageNumber,
      hasPrev: pageNumber === 0 ? false : true,
      hasNext:
        pageSize - 1 === pageNumber ||
        pageNumber === Math.ceil(users.length / pageSize) - 1
          ? false
          : true,
      countPage: Math.ceil(users.length / pageSize),
      countData: users.length,
      currentLength: listUser.length,
    };

    res.status(200).json({
      status: "success",
      data: {
        users: listUser.map((value) => {
          return {
            ...value,
            createdAt: moment(value.createdAt).format("DD/MM/YYYY | HH:mm:ss"),
          };
        }),
        length: listUser.length,
      },
      pagination: pagination,
      timeRequest: moment(req.requestTime).format("DD/MM/YYYY | HH:mm:ss"),
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error,
    });
  }
};

const createUser = (req, res) => {
  try {
    const listUser = users.sort(
      (a, b) => moment(a.createdAt) - moment(b.createdAt)
    );
    const newId =
      listUser.length > 0 ? listUser[listUser.length - 1].id + 1 : 0;

    const newUser = Object.assign({
      id: newId,
      createdAt: req.requestTime,
      isDeleted: false,
      ...req.body,
    });

    users.push(newUser);

    fs.writeFile(
      `${__dirname}/../data/userData.json`,
      JSON.stringify(users),
      (err) => {
        res.status(200).json({
          status: "success",
          data: {
            user: newUser,
          },
        });
        return;
      }
    );
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};

const getUser = (req, res) => {
  const listUser = users.sort((a, b) => {
    return ("" + a.createdAt).localeCompare("" + b.createdAt);
  });

  try {
    if (
      listUser.length === 0 ||
      Number(req.params.id) > Number(listUser[listUser.length - 1].id)
    ) {
      res.status(404).json({
        status: "Failed",
        message: "Nobody found!",
      });
      return;
    }

    const user = listUser.find(
      (value) => Number(value.id) === Number(req.params.id)
    );
    res.status(200).json({
      status: "success",
      timeRequest: req.requestTime,
      data: {
        user: user,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error,
    });
  }
};

const updateUser = (req, res) => {
  try {
    let user = users.find((value) => {
      return value.id * 1 === req.params.id * 1;
    });

    if (!user) {
      res.status(404).json({
        status: "Failed",
        message: "No data found",
      });

      return;
    }

    user = { ...user, ...req.body };

    const newUsers = users.map((value) => {
      if (user.id * 1 !== value.id * 1) {
        return value;
      } else {
        return user;
      }
    });

    fs.writeFile(
      `${__dirname}/../data/userData.json`,
      JSON.stringify(newUsers),
      (err) => {
        res.status(200).json({
          status: "success",
          timeRequest: req.requestTime,
          data: {
            user: user,
          },
        });
      }
    );

    return;
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error,
    });
    return;
  }
};

const deleteUser = (req, res) => {
  try {
    const user = users.find((value) => {
      return value.id * 1 !== req.params.id * 1;
    });
    const newUsers = users.filter((value) => {
      return value.id * 1 !== req.params.id * 1;
    });

    if (newUsers.length === users.length) {
      res.status(404).json({
        status: "Failed",
        message: "No data found",
      });
      return;
    }

    fs.writeFile(
      `${__dirname}/../data/userData.json`,
      JSON.stringify(newUsers),
      (err) => {
        res.status(200).json({
          status: "success",
          timeRequest: req.requestTime,
          data: {
            user: user,
          },
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error,
    });
    return;
  }
};

module.exports = { getAllUsers, createUser, getUser, updateUser, deleteUser };
