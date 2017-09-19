import db from '../../db'

export const Resolvers = {
  Query: {
    list: (Model) => (unusedFirstParameter, args, context) => {
      return db.get(Model.name)
    },
    single: (Model) => (unusedFirstParameter, args) => {
      return db.get(Model.name, {...args, single: true, })
    }
  },
  Mutation: {
    delete: (Model) => (unusedFirstParameter, args) => {
      const { input, } = args
      db.delete(Model.name, input)
      return {
        id: input.id,
      }
    }
  }
}
