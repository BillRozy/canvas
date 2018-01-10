"use strict";
import axios from "axios";
import Promise from 'Promise'

const getAllEvents = function() {
  return new Promise((resolve, reject) => {
    axios.get("/api/events")
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err);
    })
  })
}
const getEventById = function(id) {
  return new Promise((resolve, reject) => {
    axios.get("/api/events/" + id)
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err);
    })
  })
}
export {
  getAllEvents,
  getEventById,
}