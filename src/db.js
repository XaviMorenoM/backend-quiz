import data from './data'

class Database {
  constructor() {
    this.data = data
  }

  get(modelName, args) {
    const model = require(`./models/${modelName}/model`).default
    const modelData = this.data[modelName]
    const { filters, single, } = args || {}
    const method = single ? 'find' : 'filter'
    if (!filters) return modelData.map(m => new model(m))
    const props = Object.keys(filters)
    const filtered = modelData[method]((m) => {
      let valid = true
      props.forEach((prop) => {
        if (m[prop] !== filters[prop]) valid = false
      })
      return valid
    })
    return single ? new model(filtered) : filtered.map(m => new model(m))
  }

  set(modelName, datum) {
    // You should write this method
    // and use it for inserts and updates
  }

  delete(modelName, datum) {
    const data = this.data[modelName]
    this.data[modelName] = data.filter(obj => obj.id !== datum.id)
  }
}

export default new Database()
