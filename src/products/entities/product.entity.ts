import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'varchar', length: 10, nullable: true})
  sku: string

  @Column({type: 'varchar', length: 200})
  name: string

  @Column({type: 'varchar', length: 200})
  brand: string

  @Column({type: 'varchar', length: 200})
  model: string

  @Column({type: 'varchar', length: 200})
  category: string

  @Column({type: 'varchar', length: 100, nullable: true})
  color: string

  @Column({type: 'varchar', length: 5, default: 'USD'})
  currency: string

  @Column({type: 'decimal'})
  price: number

  @Column({type:'int', default: 0})
  stock: number

  @CreateDateColumn()
  createdAt: Date
}

@Entity()
export class DeletedProduct {

  @PrimaryColumn({type: 'varchar', length: 10})
  id: number

  @CreateDateColumn()
  deletedOn: Date

}