# jet

Here's the demo: https://tucchhaa.github.io/demos/jet/demo.html

Jet is a web components library. The main principles that I put into Jet components are high perfomance and customization. Even though at this moment only three components are ready, the application archicture is designed and implemented completely.

The architecture is based on the MVC pattern. I intend to make Jet components usable in native JS as well as in all popular frameworks (React, Vue, Angular). That's why I separated my logic into business and rendering parts. For rendering I use Inferno.js (React library, but with Virtual DOM). But I can use any other framework easily, since the architecture is not tied to the use of a specific tool.
