const fs = require("fs");
var path = require("path");
const Jimp = require("jimp");

var nameDimenson = "";
var widthStartImage = 0;
var widthEndImage = widthStartImage;
var widthImageDifference = 0
var heightImage = 0;
var qualityImageSave = 60;
var addTextNameFile = "";

async function fileReadFolder() {
  try {
    // const imagesFolder = '../Site/HTML Prototipagem/img/img-projetos/10.001.A/320x212-Carousel-icon';
    const imagesFolder =
      "carousel";
    path.dirname(imagesFolder);

    // await setDimensonFull();
    // await setDimensonMain();
    await setDimensonIcon();

    await getImagesFolder(imagesFolder);

    console.log("Image processing...");
  } catch (error) {
    console.log(`error: ${error}, in folder/diretory: ${imagesFolder}`);
  }
}

async function getImagesFolder(imagesFolder) {
  await fs.readdirSync(imagesFolder).forEach((file) => {
    const pathFullFile = `${imagesFolder + "/" + file}`;

    console.log(`Image Processing... ${pathFullFile}`);
    imageReadFlipAndSave(path.resolve(pathFullFile));
  });
}

async function imageReadFlipAndSave(file) {
  try {

     var image = await readImage(file);
    // image = await flipImage(image);

    image = await resizeImage(image, widthStartImage, heightImage);
    image = await qualityImage(image, qualityImageSave);
    
    if (widthImageDifference != 0) {
      // console.log(`image,  (widthStartImage ${widthStartImage} - widthEndImage ${widthEndImage}) / 2, 0, widthStartImage ${widthStartImage}, heightImage ${heightImage}`);
      // 
      image = await cutImage(image, (widthStartImage - widthEndImage) / 2, 0, widthEndImage, heightImage);
    }

    var namefile = await getPath(file, addTextNameFile);
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
  const folderPath = path.dirname(nameFile);
  
  // const folderPathChange = path.join(__dirname, nameDimenson); // funcionou para a base do programa
  const folderPathChange = path.join(folderPath, nameDimenson); 
  
  const baseName = path.basename(nameFile);
  const baseNameNew = nameAdd + baseName;

  const namefile = path.join(folderPathChange, baseNameNew);
  return namefile;
}

async function saveImage(image, nameFile) {
  await image.write(nameFile);
  console.log(nameFile);
}

// Name	width	heigth	aj. Width	  aj. Heigth	  fator
// Full	1920	1080
// baix 1778	1000	  1778	      1000,125	  0,926041666667
// main	730	  486	    864	        486	        0,450000000000
// icon	320	  212	    376,89408	  212,00292	  0,196299000000
async function setDimensonFull() {
  nameDimenson = "carousel-full";
  widthStartImage = 1920;
  widthEndImage = widthStartImage;
  widthImageDifference = 0;
  heightImage = 1080;
  addTextNameFile ="";
}

async function setDimensonMain() {
  nameDimenson = "carousel-main";
  // 864 x 486 => 730 x 486 - main
  widthStartImage = 864;
  widthImageDifference = 134;
  widthEndImage = widthStartImage - widthImageDifference //730
  heightImage = 486;
  addTextNameFile = "";
}

async function setDimensonIcon() {
  nameDimenson = "carousel-icon";
    // 376 x 212 =>  320 x 212 - icon
  widthStartImage = 376;
  widthImageDifference = 56;
  widthEndImage = widthStartImage - widthImageDifference //320
  heightImage = 212;
  addTextNameFile = "";
}

async function setDimensonPlantaBaixa() {
  nameDimenson = "planta-baixa";
  // 1778 x 1000 - Planta baixa
  widthStartImage = 1778;
  widthImageDifference = 0;
  widthEndImage = widthStartImage;
  heightImage = 1000;
  addTextNameFile = "";
}

fileReadFolder();
