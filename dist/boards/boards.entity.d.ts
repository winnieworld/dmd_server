import { BaseEntity } from "typeorm";
export declare class Board extends BaseEntity {
    id: number;
    title: string;
    contents: string;
    imageUrl: string;
    created_at: Date;
    updated_at: Date;
}
