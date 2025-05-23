// src/models/Schedule.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Bus } from "./bus";
import { Stop } from "./Stop";

@Entity({ name: "schedules" })
export class Schedule {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    busId!: number;

    @ManyToOne(() => Bus)
    @JoinColumn({ name: "busId" })
    bus!: Bus;

    @Column()
    stopId!: number;

    @ManyToOne(() => Stop)
    @JoinColumn({ name: "stopId" })
    stop!: Stop;

    @Column("time")
    departureTime!: string;

    @Column("int", { default: 0 })
    dwellTime!: number;
}
