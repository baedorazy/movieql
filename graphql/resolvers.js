const baezzy = {
	name : 'baezzy',
	age: 26,
	gender : 'female'
}

// 아래 코드와 동일하지만 shortcut
const resolvers = {
	Query: {
		person: () => baezzy
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