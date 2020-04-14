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

// Name	width	heigth	aj. Width	  aj. Heigth	  fator
// Full	1920	1080
// baix 1778	1000	  1778	      1000,125	  0,926041666667
// main	730	  486	    864	        486	        0,450000000000
// icon	320	  212	    376,89408	  212,00292	  0,196299000000

async function imageReadFlipAndSave(file) {
  try {
    const width = 864;
    const height = 486;
    const qualityImageSave = 60;
    const nameAdd = width - 134 + "x" + height + "-";

    var image = await readImage(file);
    // image = await flipImage(image);
    image = await resizeImage(image, width, height);
    image = await qualityImage(image, qualityImageSave);
    image = await cutImage(image, (width - 730) / 2, 0, 730, 486);
    var namefile = await getPath(file, nameAdd);
    await saveImage(image, namefile);
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

async function cutImage(image, pontX, pontY, width, heigth) {
  const imageCut = await image.crop(pontX, pontY, width, heigth);
  return imageCut;
}

function getPath(nameFile, nameAdd) {
  const dirName = path.dirname(nameFile);
  const baseName = path.basename(nameFile);
  const baseNameNew = nameAdd + baseName;

  const namefile = path.join(dirName, baseNameNew);
  return namefile;
}

async function saveImage(image, nameFile) {
  await image.write(nameFile);
  console.log(nameFile);
}

fileReadFolder();
