import db from '../../db'

export const Resolvers = {
  Query: {
    list: (Model) => (_, args, context) => {
      return db.get(Model.name)
    },
    single: (Model) => (_, filters) => {
      return db.get(Model.name, {filters, single: true, })
    }
  },
  Mutation: {
    delete: (Model) => (_, args) => {
      const { input, } = args
      db.delete(Model.name, input)
      return {
        id: input.id,
      }
    },
    save: (Model) => (_, args, update) => db.set(Model.name, args, update),
  }
}
