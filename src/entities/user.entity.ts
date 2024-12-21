import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Expose} from "class-transformer";

@Entity()
export class User {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({type: 'varchar', length: 100, unique: true})
    email: string;

    @Column({type: 'varchar', length: 255})
    password: string;

    @Expose()
    @Column({type: 'varchar', length: 50})
    role: string;

    @Column({type: 'boolean', default: false})
    confirmed: boolean;

    @Expose()
    @CreateDateColumn()
    createdAt: Date;

    @Expose()
    @UpdateDateColumn()
    updatedAt: Date;
}