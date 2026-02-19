// Type definitions for Board, Column, and Card
// use: import { Card, Column, Board } from '../../shared/types'

export interface Board {
    id: string;
    title: string;
    description: string;
    createdAt: number;
    userID: number;
}

export interface Column {
    id: string;
    title: string;
    createdAt: number;
    position: number;
    boardID: string;
}

export interface Card {
    id: string;
    title: string;
    description: string;
    createdAt: number;
    position: number;
    columnID: string
}