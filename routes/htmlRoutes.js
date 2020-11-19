// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------
//...when the url is localhost:8080/tables-->tables.html will show.
  app.get("/notes", function(req, res) { //here we are directing it to the html pages aka files that we created
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // If no matching route is found default to home

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};