import { Button } from "./components/index";

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