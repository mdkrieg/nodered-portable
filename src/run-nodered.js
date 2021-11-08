module.exports = function(){
    const http = require('http');
    const express = require("express");
    let inputs;
    if (require.main === module) {
        inputs = {};
        startNodeRED();
    }else{
        const WebSocket = require('ws');
        const WSv = new WebSocket.Server({port: 50820});
        let socket;
        WSv.on('connection', function(s) {
            socket = s;
            // When you receive a message, send that message to every socket.
            socket.on('message', function(msg) {
                inputs = JSON.parse(msg);
            });

            // Only start NR on websocket close
            socket.on('close', function() {
                startNodeRED();
            });
        });
    }

    function startNodeRED(){
        var RED = require("../node_modules/node-red");

        // Create an Express app
        var app = express();
        
        // Create a server
        var REDserver = http.createServer(app);

        // Create the settings object - see default settings.js file for other options
        var settings = {
            httpAdminRoot: inputs.adminPath || "/red",
            httpNodeRoot: inputs.nodePath || "/api",
            userDir:".",
            httpStatic:"public",
            contextStorage: {
                default: {
                    module:"localfilesystem",
                    config: {
                        dir: "context"
                    }
                }
            }
        };

        // Initialise the runtime with a server and settings
        RED.init(REDserver,settings);
        
        // Add a simple route for static content served from 'public'
        app.use("/",express.static(settings.httpStatic));
        // Serve the editor UI from /red
        app.use(settings.httpAdminRoot,RED.httpAdmin);
        // Serve the http nodes UI from /api
        app.use(settings.httpNodeRoot,RED.httpNode);
        
        REDserver.listen(inputs.port || 1880);
        
        // Start the runtime
        RED.start();
    }
};
if (require.main === module) {
    module.exports();
}