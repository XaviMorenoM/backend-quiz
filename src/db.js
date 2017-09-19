import data from './data'

class Database {
  constructor() {
    this.data = data
  }

  get(modelName, args) {
    const model = require(`./models/${modelName}/model`).default
    const modelData = this.data[modelName]
    console.log(args)
    if (!args) return modelData.map(m => new model(m))
    return modelData[args.single ? 'find' : 'filter'](
      model => true
    )

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
