// src/models/Route.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "routes" })
export class Route {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;
}
