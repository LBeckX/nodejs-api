import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Expose} from "class-transformer";

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
    @Column({type: 'timestamp', nullable: true})
    validUntil: Date;

    @Expose()
    @CreateDateColumn()
    createdAt: Date;

    @Expose()
    @UpdateDateColumn()
    updatedAt: Date;
}