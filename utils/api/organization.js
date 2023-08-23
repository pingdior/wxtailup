const http = require("../service.js")
module.exports = {
  /** -----------------------基地相关start--------------------- */
  /**
   * 关注基地
   * @params baseId string 基地id
   * @returns 
   */
  baseFocus({ baseId }) {
    return http.get('/base/focus', { baseId })
  },
  /**
   * 获取基地主页信息
   * @params baseId string 基地id
   * @returns 
   */
  getBaseHomeInfo({ baseId }) {
    return http.get('/base/getBaseHomeInfo', { baseId })
  },
  /**
   * 获取基地基本信息
   * @params baseId string 基地id
   * @returns 
   */
  getBaseInfo({ baseId }) {
    return http.get('/base/getBaseInfo', { baseId })
  },
  /**
   * 新增、修改基地信息
   * @params baseId string 基地id
   * @returns 
   */
  postBase() {
    return http.post('/base/updateBase', ...arguments)
  },
  /** -----------------------基地相关end--------------------- */

  // 获取答疑列表
  getFaqList({baseId}) {
    return http.get('/baseQa/list', {baseId})
  },
  /**
   * 添加、修改答疑
   * @param {*} baseId string 基地id
   * @param {*} list   array  答疑列表
   * @returns 
   */
  postFaqItem({baseId, list}) {
    return http.post('/baseQa/updateBaseQas?baseId=' + baseId, list)
  },
  
}