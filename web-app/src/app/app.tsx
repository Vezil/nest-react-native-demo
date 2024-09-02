import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';

import { Todo } from '@nest-react-native-demo/shared-types';

export function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const getTodos = useCallback(async () => {
        const response = await axios.get<Todo[]>('http://localhost:3000/api');

        setTodos(response.data);
    }, []);

    useEffect(() => {
        getTodos();
    }, []);

    const textInputRef = useRef<HTMLInputElement>(null);

    const onAddTodo = useCallback(async () => {
        if (!textInputRef.current) {
            return;
        }

        await axios.post('http://localhost:3000/api', {
            text: textInputRef.current.value
        });

        textInputRef.current.value = '';
        getTodos();
    }, [getTodos]);

    const onToggle = useCallback(
        async (id: number) => {
            const foundTodo = todos.find(todo => todo.id === id);

            if (!foundTodo) {
                return;
            }

            await axios.post('http://localhost:3000/api/setTodoStatus', {
                id,
                isDone: !foundTodo.isDone
            });

            getTodos();
        },
        [todos, getTodos]
    );

    return (
        <div>
            {todos.map(todo => {
                return (
                    <div key={todo.id}>
                        <input type="checkbox" checked={todo.isDone} onChange={() => onToggle(todo.id)} />
                        {todo.text}
                    </div>
                );
            })}

            <div>
                <input ref={textInputRef} />
            </div>
            <div>
                <button onClick={onAddTodo}>Add</button>
            </div>
        </div>
    );
}

export default App;
