//export default()=>({})

export default () => ({
	isLoading: true,
	entries: [
		{
			date: new Date().toDateString(),
			id: new Date().getTime(),
			picture: null,
			text: "Ad sit proident cupidatat aliqua qui non incididunt nostrud elit.",
		},
		{
			date: new Date().toDateString() + 1000,
			id: new Date().getTime(),
			picture: null,
			text: "Adipisicing ullamco occaecat reprehenderit est dolore adipisicing veniam laborum ut.",
		},
		{
			date: new Date().toDateString() + 2000,
			id: new Date().getTime(),
			picture: null,
			text: "Est pariatur ullamco do in et.",
		},
	],
});
