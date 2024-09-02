import { Injectable } from '@nestjs/common';
import { Todo } from '@nest-react-native-demo/shared-types';

@Injectable()
export class AppService {
    private todos: Todo[] = [];

    getData(): Todo[] {
        return this.todos;
    }

    add(text: string): void {
        this.todos.push({
            id: this.todos.length,
            text,
            isDone: false
        });
    }

    setTodoStatus(id: number, isDone: boolean): void {
        this.todos = this.todos.map(todo => ({
            ...todo,
            isDone: todo.id === id ? isDone : todo.isDone
        }));
    }
}
