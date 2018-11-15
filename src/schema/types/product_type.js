const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { type: GraphQLString }
  }
});

module.exports = ProductType;
