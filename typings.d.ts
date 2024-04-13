export type wynnGuildQuery = {
	name: string;
	prefix: string;
	members: [
		{
			name: string;
			uuid: string;
			rank: string;
			contributed: string;
			joined: string;
			joinedFriendly: string;
		},
	];
	xp: number;
	level: number;
	created: string;
	createdFriendly: string;
	territories: number;
	banner: {
		base: string;
		tier: number;
		layers: [
			{
				colour: string;
				pattern: string;
			},
		];
	};
	request: {
		timestamp: number;
		version: number;
	};
};
