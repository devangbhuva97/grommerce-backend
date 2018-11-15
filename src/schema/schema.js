const graphql = require("graphql");

const Address = require("../models/address");
const Category = require("../models/category");
const Manufacturer = require("../models/manufacturer");
const Product = require("../models/product");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const AddressType = new GraphQLObjectType({
  name: "Address",
  fields: () => ({
    id: { type: GraphQLID },
    line1: { type: GraphQLString },
    line2: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    pincode: { type: GraphQLInt },
    gpluscode: { type: GraphQLInt }
  })
});
const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});
const ManufacturerType = new GraphQLObjectType({
  name: "Manufacturer",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    address: {
      type: AddressType,
      resolve(parent, args) {
        return Address.findById(parent.addressId);
      }
    },
    contactNo: { type: GraphQLInt },
    email: { type: GraphQLString },
    website: { type: GraphQLString },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find({ manufacturerId: parent.id });
      }
    }
  })
});

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve(parent, args) {
        return Category.findById({ categoryId: parent.categoryId });
      }
    },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    manufactureDate: { type: GraphQLString },
    expireDate: { type: GraphQLString },
    manufacturer: {
      type: ManufacturerType,
      resolve(parent, args) {
        return Manufacturer.findById({ manufacturerId: parent.manufacturerId });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    address: {
      type: AddressType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Address.findById(args.id);
      }
    },
    addresses: {
      type: new GraphQLList(AddressType),
      resolve(parent, args) {
        return Address.find({});
      }
    },
    category: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Category.findById(args.id);
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find({});
      }
    },
    manufacturer: {
      type: ManufacturerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Manufacturer.findById(args.id);
      }
    },
    manufacturers: {
      type: new GraphQLList(ManufacturerType),
      resolve(parent, args) {
        return Manufacturer.find({});
      }
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Product.findById(args.id);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAddress: {
      type: AddressType,
      args: {
        line1: { type: new GraphQLNonNull(GraphQLString) },
        line2: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        pincode: { type: GraphQLInt },
        gpluscode: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let address = new Address({
          line1: args.line1,
          line2: args.line2,
          city: args.city,
          state: args.state,
          country: args.country,
          pincode: args.pincode,
          gpluscode: args.gpluscode
        });
        return address.save();
      }
    },
    addCategory: {
      type: CategoryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let category = new Category({
          name: args.name
        });
        return category.save();
      }
    },
    addManufacturer: {
      type: ManufacturerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        addressId: { type: new GraphQLNonNull(GraphQLID) },
        contactNo: { type: new GraphQLNonNull(GraphQLInt) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        website: { type: GraphQLString }
      },
      resolve(parent, args) {
        let manufacturer = new Manufacturer({
          name: args.name,
          address: args.address,
          contactNo: args.contactNo,
          email: args.email,
          website: args.website
        });
        return manufacturer.save();
      }
    },
    addProduct: {
      type: ProductType,
      args: {
        categoryId: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        manufactureDate: { type: new GraphQLNonNull(GraphQLString) },
        expireDate: { type: new GraphQLNonNull(GraphQLString) },
        manufacturerId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let product = new Product({
          categoryId: args.categoryId,
          name: args.name,
          title: args.title,
          description: args.description,
          manufactureDate: args.manufactureDate,
          expireDate: args.expireDate,
          manufactureDate: args.manufactureDate
        });
        return product.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
