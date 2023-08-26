import { ListDataSource } from 'components/list/list.data-source';
import { Button, Input, List } from './components';
import { data, Task } from './data';

window.addEventListener('load', () => {
    const list = new List<Task, 'id'>(
        document.getElementById('list')!,
        { selectionEnabled: true },
        new ListDataSource<Task, 'id'>({
            key: 'id',
            store: {
                items: data,
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
            await list.dataSource.addItem({ text: input.model.value });
            input.model.value = '';
            list.container.scrollTo({
                top: list.container.scrollHeight,
                behavior: 'smooth',
            });
        }
    }
    (window as any).input = input;
});

