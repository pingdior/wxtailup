const http = require("../service.js")
import MyPromise from "../promise/es6-promise"

module.exports = {
  /** -----------------------标签start--------------------- */
  // 动物健康标签
  getHealthyList() {
    return http.get("/healthTag/list", ...arguments)
  },
  // 动物外形标签
  getShapeList() {
    return http.get("/shapeTag/list", ...arguments)
  },
  // 动物性格标签
  getCharacterList() {
    return http.get("/characterTag/list", ...arguments)
  },
  // 动物救助标签
  getSuccorList() {
    return http.get("/succorTag/list", ...arguments)
  },
}