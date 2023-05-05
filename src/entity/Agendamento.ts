import { generateKey } from "crypto"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Agendamento {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "datetime", nullable: true })
    data: Date;

    @Column({ type: "time", nullable: true })
    hora: Date;

    @Column({ nullable: true, default: null })
    name: string

    @Column({ nullable: true, default: null })
    medicoName: string

    @Column({ nullable: true, default: null })
    pacienteName: string

    @Column({ nullable: true, default: null })
    type: string

}
