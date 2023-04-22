System.register("helpers", [], function (exports_1, context_1) {
    "use strict";
    var isDefined, isObject, noop, extend, deepExtend;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("isDefined", isDefined = (variable) => {
                return variable !== undefined && variable !== null;
            });
            exports_1("isObject", isObject = (variable) => {
                return typeof variable === 'object' && variable !== null;
            });
            exports_1("noop", noop = () => { });
            exports_1("extend", extend = (...objects) => {
                const result = objects[0];
                for (const iterator of objects) {
                    for (const key in iterator) {
                        // @ts-ignore
                        const value = iterator[key];
                        result[key] = value;
                    }
                }
                return result;
            });
            exports_1("deepExtend", deepExtend = (...objects) => {
                let depth = 3;
                const _deepExtend = (...objects) => {
                    const result = objects[0];
                    for (const iterator of objects) {
                        for (const key in iterator) {
                            // @ts-ignore
                            const value = iterator[key];
                            if (isObject(value) && depth > 0) {
                                result[key] = deepExtend(value);
                                depth--;
                            }
                            else {
                                result[key] = value;
                            }
                        }
                    }
                    return result;
                };
                return _deepExtend(...objects);
            });
        }
    };
});
System.register("components/core/model", ["helpers"], function (exports_2, context_2) {
    "use strict";
    var helpers_1, BaseOptions, Model;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (helpers_1_1) {
                helpers_1 = helpers_1_1;
            }
        ],
        execute: function () {
            BaseOptions = class BaseOptions {
                constructor() {
                    this.visible = true;
                }
            };
            exports_2("BaseOptions", BaseOptions);
            Model = class Model {
                constructor(options) {
                    this.options = helpers_1.deepExtend({}, this.getDefaultOptions(), options || {});
                }
                get height() {
                    return this.options.height;
                }
                get width() {
                    return this.options.width;
                }
                get visible() {
                    return this.options.visible;
                }
            };
            exports_2("Model", Model);
        }
    };
});
System.register("components/button/button.model", ["components/core/model"], function (exports_3, context_3) {
    "use strict";
    var model_1, ButtonOptions, ButtonModel;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (model_1_1) {
                model_1 = model_1_1;
            }
        ],
        execute: function () {
            ButtonOptions = class ButtonOptions extends model_1.BaseOptions {
                constructor() {
                    super(...arguments);
                    this.disabled = false;
                    this.text = '';
                    this.title = '';
                }
            };
            exports_3("ButtonOptions", ButtonOptions);
            ButtonModel = class ButtonModel extends model_1.Model {
                get disabled() {
                    return this.options.disabled;
                }
                get onClick() {
                    return this.options.onClick;
                }
                get text() {
                    return this.options.text;
                }
                get title() {
                    return this.options.title;
                }
                constructor(options) {
                    super(options);
                }
                getDefaultOptions() {
                    return new ButtonOptions();
                }
            };
            exports_3("ButtonModel", ButtonModel);
        }
    };
});
System.register("components/core/view", ["components/core/module"], function (exports_4, context_4) {
    "use strict";
    var module_1, View;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (module_1_1) {
                module_1 = module_1_1;
            }
        ],
        execute: function () {
            View = class View extends module_1.Module {
            };
            exports_4("View", View);
        }
    };
});
System.register("components/core/controller", ["components/core/module"], function (exports_5, context_5) {
    "use strict";
    var module_2, Controller;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (module_2_1) {
                module_2 = module_2_1;
            }
        ],
        execute: function () {
            Controller = class Controller extends module_2.Module {
            };
            exports_5("Controller", Controller);
        }
    };
});
System.register("components/core/module", [], function (exports_6, context_6) {
    "use strict";
    var Module;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            Module = class Module {
                constructor(component) {
                    this.component = component;
                    this.component = component;
                }
                initialize() { }
                ;
                getViewByName(name) {
                    return this.component.getView(name);
                }
                getControllerByName(name) {
                    return this.component.getController(name);
                }
                get model() {
                    return this.component.model;
                }
                getView(viewType) {
                    return this.component.getView(viewType.name);
                }
                getController(controllerType) {
                    return this.component.getController(controllerType.name);
                }
            };
            exports_6("Module", Module);
        }
    };
});
System.register("components/core/component", ["helpers"], function (exports_7, context_7) {
    "use strict";
    var helpers_2, Component;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (helpers_2_1) {
                helpers_2 = helpers_2_1;
            }
        ],
        execute: function () {
            Component = class Component {
                constructor(name, container, model, view, controller) {
                    this.views = {};
                    this.controllers = {};
                    this.name = name;
                    if (container === undefined || container === null)
                        throw new Error('container is undefined');
                    this.container = container;
                    this.model = model;
                    this.registerModule(this.views, view);
                    this.registerModule(this.controllers, controller);
                    this.initializeModules();
                }
                registerModule(modules, moduleContructors) {
                    if (moduleContructors !== undefined) {
                        moduleContructors = Array.isArray(moduleContructors) ? moduleContructors : [moduleContructors];
                        moduleContructors.forEach(contructor => {
                            const module = new contructor(this);
                            if (helpers_2.isDefined(modules[contructor.name])) {
                                throw new Error(`Module with name ${contructor.name} is already defined.`);
                            }
                            modules[contructor.name] = module;
                        });
                    }
                }
                initializeModules() {
                    const modules = [
                        ...Object.values(this.views),
                        ...Object.values(this.controllers)
                    ];
                    for (const module of modules) {
                        module.initialize();
                    }
                }
                getView(name) {
                    const view = this.views[name];
                    if (view === undefined)
                        throw new Error('Invalid view name ' + name);
                    return view;
                }
                getController(name) {
                    const controller = this.controllers[name];
                    if (controller === undefined)
                        throw new Error('Invalid controller name ' + name);
                    return controller;
                }
            };
            exports_7("Component", Component);
        }
    };
});
System.register("components/button/button.controller", ["components/core/controller"], function (exports_8, context_8) {
    "use strict";
    var controller_1, ButtonController;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (controller_1_1) {
                controller_1 = controller_1_1;
            }
        ],
        execute: function () {
            ButtonController = class ButtonController extends controller_1.Controller {
                onClick(event) {
                    if (this.model.disabled === false) {
                        this.model.onClick(event);
                    }
                }
            };
            exports_8("ButtonController", ButtonController);
        }
    };
});
System.register("components/button/button.view", ["components/core/view", "components/button/button.controller"], function (exports_9, context_9) {
    "use strict";
    var view_1, button_controller_1, ButtonView;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (button_controller_1_1) {
                button_controller_1 = button_controller_1_1;
            }
        ],
        execute: function () {
            ButtonView = class ButtonView extends view_1.View {
                initialize() {
                    this.controller = this.getController(button_controller_1.ButtonController);
                    this.render(this.component.container);
                }
                render(container) {
                    if (this.model.visible) {
                        const button = document.createElement("button");
                        button.innerText = this.model.text;
                        button.disabled = this.model.disabled;
                        button.title = this.model.title;
                        if (this.model.width) {
                            button.style.width = this.model.width + 'px';
                        }
                        if (this.model.height) {
                            button.style.height = this.model.height + 'px';
                        }
                        button.addEventListener('click', this.controller.onClick.bind(this));
                        container.appendChild(button);
                    }
                }
            };
            exports_9("ButtonView", ButtonView);
        }
    };
});
System.register("components/button/index", ["components/button/button.model", "components/core/component", "components/button/button.controller", "components/button/button.view"], function (exports_10, context_10) {
    "use strict";
    var button_model_1, component_1, button_controller_2, button_view_1, Button;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (button_model_1_1) {
                button_model_1 = button_model_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (button_controller_2_1) {
                button_controller_2 = button_controller_2_1;
            },
            function (button_view_1_1) {
                button_view_1 = button_view_1_1;
            }
        ],
        execute: function () {
            Button = class Button extends component_1.Component {
                constructor(container, options) {
                    const model = new button_model_1.ButtonModel(options);
                    super("Button", container, model, button_view_1.ButtonView, button_controller_2.ButtonController);
                }
            };
            exports_10("Button", Button);
        }
    };
});
System.register("components/index", ["components/button/index"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (index_1_1) {
                exports_11({
                    "Button": index_1_1["Button"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("index", ["components/index"], function (exports_12, context_12) {
    "use strict";
    var index_2;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (index_2_1) {
                index_2 = index_2_1;
            }
        ],
        execute: function () {
            window.addEventListener('load', () => {
                console.log('loaded');
                const buttonContainer = document.getElementById('button');
                // @ts-ignore
                new index_2.Button(buttonContainer, {
                    text: 'aboba',
                    onClick: () => alert('ABOBA!'),
                    title: 'abobus?',
                    width: 200,
                    height: 80
                });
            });
        }
    };
});
//# sourceMappingURL=bundle.js.map