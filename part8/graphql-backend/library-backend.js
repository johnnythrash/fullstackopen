const { ApolloServer, gql } = require('apollo-server')
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title:
      'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
]

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: String!
    genres: [String]
  }

  type Author {
    name: String!
    born: Int
    id: String!
    bookCount: Int!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
  }

  type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`

const findBooksByAuthor = (author, books) => {
  return books.filter((book) => book.author === author)
}

const findBooksByGenre = (genre, books) => {
  return books.filter((book) => book.genres.includes(genre))
}
const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args.author && args.genre) {
        const authorsBooks = findBooksByAuthor(args.author, books)
        return findBooksByGenre(args.genre, authorsBooks)
      } else if (args.author) {
        return findBooksByAuthor(args.author, books)
      } else if (args.genre) {
        return findBooksByGenre(args.genre, books)
      }
      return books
    },
    allAuthors: () => authors,
  },

  Author: {
    bookCount: (root) => {
      let bookArr = books.filter((book) => book.author === root.name)
      return bookArr.length
    },
  },

  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      const bookAuthor = book.author
      currentAuthors = books.map((book) => book.author)
      if (!currentAuthors.includes(bookAuthor)) {
        authors = authors.concat({
          name: bookAuthor,
          id: uuid(),
        })
      }
      books = books.concat(book)
      return book
    },

    editAuthor: (root, args) => {
      const currentAuthors = authors.map((author) => author.name)
      const authorToBeChanged = args.name
      const authorBirthDate = args.setBornTo
      let changedAuthor = null
      if (currentAuthors.includes(authorToBeChanged)) {
        if (authorBirthDate) {
          authors.map((author) => {
            if (author.name === authorToBeChanged) {
              author.born = args.setBornTo
              changedAuthor = author
            }
          })
        }
      }
      return changedAuthor
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
