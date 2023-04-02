import { Button } from "./components/index";

window.addEventListener('load', () => {
    console.log('loaded');

    const buttonContainer = document.getElementById('button');

    // @ts-ignore
    new Button(buttonContainer, {
        text: 'aboba',
        onClick: () => alert('ABOBA!'),
        title: 'abobus?',
        width: 200,
        height: 80
    });
});