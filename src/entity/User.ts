import { generateKey } from "crypto"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column({ nullable: true, default: null })
    codigo: string

    @Column({
        nullable: true,
        unique: true,
        default: null
    })
    matricula: string

    @Column({
        nullable: true,
        unique: true,
        default: null
    })
    disciplina: string

    @Column({ nullable: true, default: null })
    name: string

    @Column({ nullable: true, default: null })
    type: string
}
