import {Injectable, NgZone} from '@angular/core';
// @ts-ignore
import * as svg from './lib/saveSvgAsPng.js'
import * as JSZip from "jszip";

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(private ngZone: NgZone) {
  }

  createFile(
    base64: string,
    fileName: string,
    folder: JSZip | null
  ): JSZip | undefined {
    return folder?.file(fileName,base64.split(',')[1],{base64:true});
  }

  createFolder(name: string): JSZip | null {
    const zip = new JSZip();
    return zip.folder(name);
  }
}
