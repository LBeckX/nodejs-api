import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Expose} from "class-transformer";
import {File} from './file.entity.js'

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

    @Column({type: 'timestamp', default: null, nullable: true})
    bannedUntil: Date | null;

    @Column({type: 'smallint', default: 0})
    loginAttempts: number;

    @Expose()
    @OneToOne(() => File, {nullable: true, eager: true})
    @JoinColumn()
    avatar: File;

    @Expose()
    @CreateDateColumn()
    createdAt: Date;

    @Expose()
    @UpdateDateColumn()
    updatedAt: Date;
}