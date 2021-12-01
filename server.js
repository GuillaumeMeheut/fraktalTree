const { writeFile } = require("fs/promises");
const { canvas, generateRandomTree } = require("./treeServer");

async function test(id) {
  try {
    generateRandomTree();

    const img = canvas.toDataURL();
    const data = img.replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(data, "base64");

    const promise = writeFile(`image${id}.jpg`, buf);
    console.log(`Image ${id} succefully created`);

    await promise;
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error(err);
  }
}

for (let i = 1; i <= 5; i++) {
  test(i);
}
