import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('prefix')
export class Prefix {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'varchar', length: 22 })
	guild!: string;

	@Column()
	value!: string;
}
