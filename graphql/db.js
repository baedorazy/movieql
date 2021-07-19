export const people = [
	{
		id: 1,
			name : 'baezzy',
		age: 36,
		gender : 'female'
	},
	{
		id: 2,
			name : 'hoi',
		age: 36,
		gender : 'male'
	},
	{
		id: 3,
			name : 'hyuni',
		age: 38,
		gender : 'female'
	},
	{
		id: 4,
			name : 'bong2',
		age: 35,
		gender : 'male'
	}
];

export const getById = id => {
	const filterPeople = people.filter(people => people.id === id);
	return filterPeople[0];
}
