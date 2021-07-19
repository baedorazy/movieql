import { people, getById } from './db';

const resolvers = {
	Query: {
		people: () => people,
		person: (_, { id }) => {
			return getById(id);
		}
	}
};

//
// const resolvers = {
// 	Query: {
// 		person: function () {
// 			return baezzy
// 		}
// 	}
// };

export default resolvers;
