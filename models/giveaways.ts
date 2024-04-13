import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('giveaways')
export class Giveaways {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	time!: number;

	@Column({ type: 'varchar', length: 22 })
	channel!: string;

	@Column({ type: 'varchar', length: 22 })
	message!: string;

	@Column({ type: 'integer' })
	end!: number;

	@Column({ type: 'integer' })
	winners!: number;

	@Column({ type: 'text' })
	from!: string;

	@Column({ type: 'text' })
	item!: string;
}
