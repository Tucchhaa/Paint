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
        { selectionEnabled: true },
        dataSource.forList({
            text(item: Task): string {
                if(item.id === 13)
                    return item.aboba!;
                
                return item.text;
            },
        })
    );

    list.render(document.getElementById('list')!);

    // ===

    const input = new Input({});
    input.render(document.getElementById('input')!);

    // ===

    // const button = new Button({
    //     text: 'add',
    //     onClick: async () => await createTask(),
    //     // icon: new Icon(iconOptions)
    //     // icon: Icon.create(iconOptions)
    // });
    // button.render(document.getElementById('add-btn')!);

    Button.render(document.getElementById('add-btn')!, {
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

/*
я хочу разделить рендеринг на:
1)
const button = new Button(options)
button.render(container)

2)
Button.render(container, state, dataSource)
*/