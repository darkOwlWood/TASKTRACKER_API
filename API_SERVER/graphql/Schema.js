const fs = require('fs');
const path = require('path');
const { composeResolvers, makeExecutableSchema } = require('graphql-tools');
const { resolversComposition } = require('./ComposedResolvers');
const { Query } = require('./Query');
const { Mutation } = require('./Mutation');
const { Types } = require('./Types');

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8');
const preResolvers = { Query, Mutation, ...Types };
const resolvers = { ...composeResolvers(preResolvers, resolversComposition) };

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = {
    schema,
}