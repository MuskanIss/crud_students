const http = require("http");
const users = require("./users.json");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.write("Welcome to Home page");
  } else if (req.url === "/users" && req.method === "GET") {
    res.write(JSON.stringify(users));
  } else if (req.url === "/users" && req.method === "POST") {
    req.setEncoding("utf8");
    req.on("data", (body) => {
      var data1 = JSON.parse(fs.readFileSync("users.json"));
      data1["users"].push(JSON.parse(body));
      var newData2 = JSON.stringify(data1);
      fs.writeFile("users.json", newData2, (err) => {
        if (err) throw err;

        console.log("BOOK ADDED SUCCESSFULLY!!!!");
      });
    });
  } else if (req.url === "/user" && req.method === "PATCH") {
    req.setEncoding("utf8");
    req.on("data", (body) => {
      var data1 = JSON.parse(fs.readFileSync("users.json"));
      var body1 = JSON.parse(body);
      data1["users"].map((el) => {
        if (el.id == body1.id) {
          el["first_name"] = body1["first_name"]
            ? body1["first_name"]
            : el["first_name"];
          el["last_name"] = body1["last_name"]
            ? body1["last_name"]
            : el["last_name"];
          el["email"] = body1["email"] ? body1["email"] : el["email"];
          el["gender"] = body1["gender"] ? body1["gender"] : el["gender"];
          el["ip_address"] = body1["ip_address"]
            ? body1["ip_address"]
            : el["ip_address"];
          el["age"] = body1["age"] ? body1["age"] : el["age"];
        }
      });
      var newData2 = JSON.stringify(data1);
      fs.writeFile("users.json", newData2, (err) => {
        if (err) throw err;
      });
    });
  } else if (req.url === "/user" && req.method === "DELETE") {
    req.setEncoding("utf8");
    req.on("data", (body) => {
      var data1 = JSON.parse(fs.readFileSync("users.json"));
      var body1 = JSON.parse(body);
      data1["users"] = data1["users"].filter((el) => {
        if (el.id !== body1.id) {
          return el;
        }
      });
      var newData2 = JSON.stringify(data1);
      fs.writeFile("users.json", newData2, (err) => {
        if (err) throw err;
      });
    });
  }
  res.end();
});

server.listen(8000, () => {
  console.log("Starting server");
});
