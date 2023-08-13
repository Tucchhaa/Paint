import { ListDataSource } from "components/list/list.data-source";
import { Button, Input, List } from "./components";
import { data } from "./data";

window.addEventListener('load', () => {
    const list = new List<any>(
        document.getElementById('list')!,
        { selectionEnabled: true },
        new ListDataSource({
            keyExpr: 'id',
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
        onClick: () => createTask(),
    });

    function createTask() {
        if(input.model.value.length) {
            list.dataSource.addItem({ text: input.model.value });
            input.model.value = "";
            list.container.scrollTo({
                top: list.container.scrollHeight,
                behavior: 'smooth',
            });
        }
    }
    (window as any).input = input;
});

