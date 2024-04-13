import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blacklist')
export class Blacklist {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'varchar', length: 22 })
	user!: string;
}
