const hello = (req, res) => {
  res.render("index", {});
};

const upload = (req, res) => {
  console.log(req.file);
  res.send("Uploaded");
};

module.exports = { hello, upload };
