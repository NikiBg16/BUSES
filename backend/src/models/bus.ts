// src/models/Bus.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "buses" })
export class Bus {
    @PrimaryGeneratedColumn()
    id!: number;               // <-- добавено "!"

    @Column({ unique: true })
    number!: string;           // <-- добавено "!"

    @Column()
    carrier!: string;          // <-- добавено "!"

    @Column({ type: "int", default: 50 })
    capacity!: number;         // <-- добавено "!"

    @Column({ default: true })
    isActive!: boolean;        // <-- добавено "!"
}
