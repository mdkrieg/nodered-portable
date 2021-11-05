module.exports = function(){
    var http = require('http');
    var express = require("express");
    var RED = require("../node_modules/node-red");

    // Create an Express app
    var app = express();

    // Add a simple route for static content served from 'public'
    app.use("/",express.static("public"));

    // Create a server
    var server = http.createServer(app);

    // Create the settings object - see default settings.js file for other options
    var settings = {
        httpAdminRoot:"/red",
        httpNodeRoot: "/api",
        userDir:"nodered",
        httpStatic:"public",
        functionGlobalContext: { }    // enables global context
    };

    // Initialise the runtime with a server and settings
    RED.init(server,settings);

    // Serve the editor UI from /red
    app.use(settings.httpAdminRoot,RED.httpAdmin);

    // Serve the http nodes UI from /api
    app.use(settings.httpNodeRoot,RED.httpNode);

    server.listen(50820);

    // Start the runtime
    RED.start();
};
if (require.main === module) {
    module.exports();
}