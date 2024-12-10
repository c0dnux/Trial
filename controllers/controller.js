const fs = require("fs/promises");

let data;

(async () => {
  try {
    const tData = await fs.readFile("./data.json", "utf-8");
    data = JSON.parse(tData); // Assign the parsed data to the global variable
  } catch (error) {
    console.error("Error reading file: ", error);
    data = []; // Fallback to an empty array if the file read fails
  }
})();

exports.checkId = (req, res, next, val) => {
  console.log(val);

  const idManage = data.find((elem) => elem.id === Number(val));
  console.log(idManage);

  if (!idManage) {
    return res.status(404).json({ status: "failed", message: "Invalid ID" });
  }
  next();
};

exports.getAll = async (req, res) => {
  res.status(200).json({ status: "success", data }); // Use the global variable
};
exports.getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const single = data.find((elem) => elem.id === id);
    // console.log(single,req.params);
    res.status(200).json({ status: "success", data: single }); // Use the global variable}}
  } catch (err) {
    res.status(500).json({ status: "Failed", Error: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    const summit = req.body;
    data.push(summit);
    res.status(200).json({ status: "success", data: data }); // Use the global variable}}
  } catch (error) {
    res.status(500).json({ status: "Failed", Error: error });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const update = req.body;
    const index = data.findIndex((elem) => elem.id === id);
    data[index] = Object.assign(data[index], update);
    const updated = data[index];
    res.status(200).json({ status: "success", update: updated, data: data }); // Use the global variable}}
  } catch (error) {}
};
