import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Expose} from "class-transformer";

@Entity()
export class File {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({type: 'varchar', length: 255})
    name: string;

    @Expose()
    @Column({type: 'varchar', length: 255})
    path: string;

    @Expose()
    @Column({type: 'boolean', default: true})
    ready: boolean;

    @Expose()
    @CreateDateColumn()
    createdAt: Date;

    @Expose()
    @UpdateDateColumn()
    updatedAt: Date;
}