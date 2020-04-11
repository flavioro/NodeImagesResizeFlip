const fs = require("fs");
var path = require("path");
const Jimp = require("jimp");

async function fileReadFolder() {
  try {
    // const imagesFolder = '../Site/HTML Prototipagem/img/img-projetos/10.001.A/320x212-Carousel-icon';
    const imagesFolder =
      "../Site/HTML Prototipagem/img/img-projetos/10.001.A/1920x1080";
    path.dirname(imagesFolder);

    await getImagesFolder(imagesFolder);
    console.log("Horizontal mirror image processing");
  } catch (error) {
    console.log(`error: ${error}, in folder/diretory: ${imagesFolder}`);
  }
}

async function getImagesFolder(imagesFolder) {
  fs.readdirSync(imagesFolder).forEach((file) => {
    const pathFullFile = `${imagesFolder + "/" + file}`;

    console.log(`Image Processing... ${pathFullFile}`);
    imageReadFlipAndSave(path.resolve(pathFullFile));
  });
}

async function imageReadFlipAndSave(file) {
  try {
    var image = await readImage(file);
    // image = await flipImage(image);
    image = await resizeImage(image, 1920, 1080);
    image = await qualityImage(image, 60);
    await saveImage(image, file);
  } catch (error) {
    console.log(`error: ${error}, in file: ${file}`);
  }
}

async function readImage(file) {
  const image = await Jimp.read(file);
  return image;
}

async function flipImage(image) {
  const imageFlip = await image.flip(true, false);
  return imageFlip;
}

async function resizeImage(image, width, height) {
  const imageResize = await image.resize(width, height);
  return imageResize;
}

async function qualityImage(image, quality) {
  const imageQuality = await image.quality(quality);
  return imageQuality;
}

async function saveImage(image, nameFile) {
  const dirName = path.dirname(nameFile);
  const baseName = path.basename(nameFile);
  const baseNameNew = "Flip-" + baseName;

  const nameFileFlip = path.join(dirName, baseNameNew);

  await image.write(nameFileFlip);
  console.log(nameFileFlip);
}

fileReadFolder();
