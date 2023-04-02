System.register(["./components/index"], function (exports_1, context_1) {
    "use strict";
    var index_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            window.addEventListener('load', () => {
                console.log('loaded');
                const buttonContainer = document.getElementById('button');
                new index_1.Button(buttonContainer);
            });
        }
    };
});
