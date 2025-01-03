import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Expose} from "class-transformer";
import * as dateFns from 'date-fns';

@Entity()
export class Token {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({type: 'varchar', length: 100, unique: true})
    token: string;

    @Expose()
    @Column({type: 'varchar', length: 100, default: ''})
    name: string;

    @Expose()
    @Column({type: 'varchar', length: 255})
    value: string;

    @Expose()
    @Column({type: 'timestamp', default: dateFns.addHours(new Date(), 1)})
    validUntil: Date;

    @Expose()
    @CreateDateColumn()
    createdAt: Date;

    @Expose()
    @UpdateDateColumn()
    updatedAt: Date;
}