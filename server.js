// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const express = require('express');
const fs = require('fs');
const  Jimp  = require ('jimp'); 

function main () {
  fileReadFolder();
}


async function fileReadFolder() {
  try {
    // const imagesFolder = '../Site/HTML Prototipagem/img/img-projetos/10.001.A/320x212-Carousel-icon';
    const imagesFolder = '../Site/HTML Prototipagem/img/img-projetos/10.001.A/Flip-320x212-Carousel-icon';

    getImagesFolder(imagesFolder);
    console.log("Images Processing Completed");
  } catch (error) {
    console.log(`error: ${error}, in folder/diretory: ${imagesFolder}`)
  }
}

async function getImagesFolder(imagesFolder) {
  fs.readdirSync(imagesFolder).forEach(file => {
    console.log(`Image Processing... ${file}` );
    imageReadFlipAndSave(file);
  });
}

async function imageReadFlipAndSave(file) {
  try {
    let image = readImage(file);
    image = flipImage(image);
    saveImageFlip(image);
  } catch (error) {
    console.log(`error: ${error}, in file: ${file}`)
  }
}

async function readImage(file) { 
  const image = await Jimp.read(file); 
  return image;
}

async function flipImage(image) { 
  const imageFlip = image.flip(true, false);
  return imageFlip;
} 

async function SaveImage(image, nameFile) { 
  const nameFileFlip = "Flip-" + nameFile;
  await image.write(nameFileFlip); 
} 
  

// async function readImage(file) { 
//   const image = await Jimp.read(file); 
// // flip function also known as mirror function  
//   image.flip(true, false)  
//   .write('flip1.jpg'); 
// } 