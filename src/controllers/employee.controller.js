const { filter } = require("mongodb/lib/core/connection/logger");
const Employee = require("../models/employee");
const employee = require("../models/employee");
const mongoose = require("mongoose");

const employeeCtrl = {};

employeeCtrl.getEmployees = async (req, res, next) => {
  const employees = await Employee.find();
  res.json(employees);
};

employeeCtrl.createEmployee = async (req, res, next) => {
  const employee = new Employee({
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  });
  await employee.save();
  res.json({ status: "Employee created" });
};

employeeCtrl.getEmployee = async (req, res, next) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  res.json(employee);
};

employeeCtrl.editEmployee = async (req, res, next) => {
  const { id } = req.params;
  await Employee.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "Employee Updated" });
};

employeeCtrl.deleteEmployee = async (req, res, next) => {
  await Employee.findByIdAndRemove(req.params.id);
  res.json({ status: "Employee Deleted" });
};

employeeCtrl.deleteAllEmployees = async (req, res, next) => {
  await Employee.deleteMany({});
  res.json({status:"All Employees Deleted"})
}

module.exports = employeeCtrl;
