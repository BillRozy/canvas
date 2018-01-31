"use strict";
import axios from "axios";
import Promise from 'Promise'
const UserActions = {
  ratePortfolio(rate, portfolioId) {
    return new Promise((resolve, reject) => {
      axios.post("/api/ratings/", {
        rate,
        portfolioId
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  confirmRegistration(token) {
    return new Promise((resolve, reject) => {
      axios.post(`/confirmation/${token}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  }
}
export default UserActions