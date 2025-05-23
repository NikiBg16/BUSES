// src/models/Stop.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "stops" })
export class Stop {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @Column()
    address!: string;

    @Column("decimal", { precision: 9, scale: 6 })
    latitude!: number;

    @Column("decimal", { precision: 9, scale: 6 })
    longitude!: number;
}
