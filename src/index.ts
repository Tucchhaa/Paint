import { Button } from "./components";

window.addEventListener('load', () => {
    const buttonContainer = document.getElementById('button');
    for(let i=0;i<=2;i++){}
    new Button(buttonContainer, {
        text: 'aboba',
        onClick: () => alert('ABOBA!'),
        title: 'abobus?',
        width: 200,
        height: 80
    })
})

/*
TODO настроить линтер - DONE
    настроить CI/CD для линтера
    fix-lint

TODO рассмотреть возможность билденжки компонента во все фреймворки
TODO настроить CI/CD
TODO написать jest тесты
TODO настроить билдежку по темам
TODO проанализировать какие плюсы дают подобная архитектура по сравнению обычного использования React или Vue
- Inferno дает самый быстрый перфоманс
- Возможность билдить только вьюхи, без интегрирования в них бизнес логики, что поможет использовать одинаковую
логику на разных платформах
-


Какие компоненты можно создать?
LoadingSkeleton
List - для туду листа
Для компонента button добавить возможность задания иконки, размеров, а также задать тип (с border или без)
 */