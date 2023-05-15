import { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Save file
async function saveFile(file: UploadedFile): Promise<string> {

    // Extract ext 01
    // const extArr = book.image.name.split('.');
    // const ext = extArr[extArr.length-1];
    // book.imageName = uuidv4() + "." + ext;

    // Extract ext 02
    // const ext = book.image.name.substring(book.image.name.lastIndexOf('.'));
    // book.imageName = uuidv4() + ext;

    // Extract ext 03
    const ext = path.extname(file.name);
    const fileName = uuidv4() + ext;
    await file.mv("./src/1-assets/images/" + fileName);
    return fileName;
}

// Delete file
function deleteFile(fileName: string): void {
    if (fileExists(fileName)) {
        fs.unlinkSync("./src/1-assets/images/" + fileName)
    }
}


// File exists
function fileExists(fileName: string): boolean {
    if (fs.existsSync("./src/1-assets/images/" + fileName)) {
        return true;
    }
    return false;
}


export default {
    saveFile,
    deleteFile,
    fileExists
}