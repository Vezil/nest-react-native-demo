import { Injectable } from '@nestjs/common';

interface Todo {
    id: number;
    text: string;
    done: boolean;
}

@Injectable()
export class AppService {
    private todos: Todo[] = [];

    getData(): Todo[] {
        return this.todos;
    }
}
