import { Button } from "./components";

window.addEventListener('load', () => {
    const buttonContainer = document.getElementById('button');

    new Button(buttonContainer, {
        text: 'aboba',
        onClick: () => alert('ABOBA!'),
        styleMode: 'outline',
    });
});
