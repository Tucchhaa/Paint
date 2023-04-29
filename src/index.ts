import { Button } from "./components";

window.addEventListener('load', () => {
    const buttonContainer = document.getElementById('button');
    for(let i=0;i<=2;i++){}
    new Button(buttonContainer, {
        text: 'aboba',
        onClick: () => alert('ABOBA!'),
        title: 'abobus?',
        width: 200,
        height: 80,
    });
});
