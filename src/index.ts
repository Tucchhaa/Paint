import { Button } from "./components";

window.addEventListener('load', () => {
    const buttonContainer = document.getElementById('button');

    new Button(buttonContainer, {
        text: 'aboba',
        onClick: () => alert('ABOBA!'),
        title: 'abobus?',
        width: 200,
        height: 80
    });
});

/*
TODO настроить линтер
TODO рассмотреть возможность билденжки компонента во все фреймворки
TODO настроить CI/CD
TODO написать jest тесты
TODO рассмотреть вариант полной поддержки Inferno вьюх
TODO проанализировать какие плюсы дают подобная архитектура по сравнению обычного использования React или Vue
 */