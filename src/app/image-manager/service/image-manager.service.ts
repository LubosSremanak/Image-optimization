import {Injectable} from '@angular/core';

import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Subject} from 'rxjs';
import {Image} from "./model/image";

@Injectable({
  providedIn: 'root',
})
export class ImageManagerService {
  constructor() {
    this._files = 0;
    this._images = [];
    this._uploadedImages = 0;
    this._isImageUploaded = new Subject<boolean>();
  }

  private readonly _isImageUploaded: Subject<boolean>;

  get isImageUploaded(): Subject<boolean> {
    return this._isImageUploaded;
  }

  private _images: Image[];

  get images(): Image[] {
    return this._images;
  }

  set images(value: Image[]) {
    this._images = value;
  }

  private _uploadedImages: number;

  get uploadedImages(): number {
    return this._uploadedImages;
  }

  private _files: number;

  get files(): number {
    return this._files;
  }

  set files(value: number) {
    this._files = value;
  }

  async createImagesFromFiles(files: File[]): Promise<void> {
    this.files = files.length;
    return new Promise((resolve) => {
      for (const file of files) {
        this.createImageFromFile(file, resolve);
      }
    });
  }

  public sortImageAsc(): void {
    this.images.sort(this.handleImageSort);
  }

  public deleteImage(index: number): void {
    this.handleRootRemoved(this.images, index);
    this.images.splice(index, 1);
    this.recountImagesOrder();
  }

  recountImagesOrder(): void {
    this.images.forEach(this.changeOrderHandler);
  }

  public getImageIndexByOrder(order: number): number {
    return this.images.findIndex((image) => image.order === order);
  }

  public setRootImage(image: Image): void {
    this.removeAllRoots();
    image.rootImage = true;
  }

  public getImagePath(index: number) {
    const image = this.images[index];
    if (image) {
      if (image.path) return image.path as string;
      if (image.base64) return image.base64 as string;
    }

    return '../../../../assets/placeholder.png';
  }

  public handleImageDrop(event: CdkDragDrop<any>): void {
    const source = event.previousContainer.data;
    const destination = event.container.data;
    this.images[source.index] = destination.item;
    this.images[destination.index] = source.item;
    this.recountImagesOrder();
  }

  private createImageFromFile(file: File, resolve: any): void {
    const reader = new FileReader();
    reader.onload = this.createHandler(resolve);
    reader.readAsDataURL(file);
  }

  private createHandler =
    (resolve: any): any =>
      (event: any): void => {
        const base64 = event.target.result as string;
        this.appendImage(base64, resolve);
      };

  private appendImage = (base64: string, resolve: any): void => {
    const order = this._images.length + 1;
    const rootImage = order === 1;
    this._uploadedImages++;
    this._images.push({base64, order, rootImage: rootImage});
    this._isImageUploaded.next(true);
    if (this._uploadedImages === this._files) {
      this.recountImagesOrder();
      this._uploadedImages = 0;
      resolve();
    }
  };

  private handleImageSort = (a: Image, b: Image) => {
    return a.order - b.order;
  };

  private handleRootRemoved(images: Image[], order: number) {
    if (images[order].rootImage) {
      const next: Image = this._images[order + 1];
      const previous: Image = this._images[order - 1];
      if (next) {
        next.rootImage = true;
      } else {
        if (previous) {
          previous.rootImage = true;
        }
      }
    }
  }

  private removeAllRoots(): void {
    this.images.forEach(this.removeImageRoot);
  }

  private removeImageRoot = (image: Image): void => {
    image.rootImage = false;
  };

  private changeOrderHandler = (image: Image, index: number) => {
    image.order = index + 1;
  };
}
