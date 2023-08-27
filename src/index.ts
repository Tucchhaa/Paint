import { DataSource } from 'core/data_source';
import { Button, Input, List } from './components';
import { data, Task } from './data';

window.addEventListener('load', () => {
    const dataSource = DataSource.create<Task, 'id'>({
        key: 'id',
        store: {
            items: data,
        },
    });

    const list = new List(
        document.getElementById('list')!,
        { selectionEnabled: true },
        dataSource.forList({
            text(item: Task): string {
                if(item.id === 13)
                    return item.aboba!;
                
                return item.text;
            },
        })
    );

    // ===

    const input = new Input(document.getElementById('input')!);

    // ===

    new Button(document.getElementById('add-btn')!, {
        text: 'add',
        onClick: async () => await createTask(),
    });

    async function createTask() {
        if(input.model.value.length) {
            await dataSource.addItem({ text: input.model.value });
            input.model.value = '';
            list.container.scrollTo({
                top: list.container.scrollHeight,
                behavior: 'smooth',
            });
        }
    }
});
