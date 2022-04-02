import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css'],
})
export class ImageUploaderComponent implements OnInit, OnChanges {
  @ViewChild('file') fileInput: ElementRef | undefined;
  @Output() files: EventEmitter<File[]>;
  data: any;
  type: string;
  @Input() loadedFiles: number;
  loadingStatus: string;
  private allFiles: number;

  constructor(private ngZone: NgZone) {
    this.data = new FormGroup({
      file: new FormControl(),
    });
    this.type = 'images';
    this.files = new EventEmitter<File[]>();
    this.loadingStatus = 'Nothing uploaded';
    this.loadedFiles = 0;
    this.allFiles = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.loadedFiles) {
      const progress = (this.loadedFiles / this.allFiles) * 100;
      this.loadingStatus = progress.toFixed(0) + '%';
      const isAllLoaded = this.allFiles === this.loadedFiles;
      const isUploaded = this.loadedFiles !== 0;
      if (isAllLoaded && isUploaded) {
        this.loadingStatus = 'Done';
      }
    }
  }

  ngOnInit(): void {}

  onSubmit(data: any): void {
    this.ngZone.runOutsideAngular(() => {
      this.loadFile(data);
    });
  }

  loadFile(data: any): void {
    const files = data.target.files;
    this.allFiles = files.length;
    this.files.emit(files);
    data.target.value = '';
  }

  getProgress(): any {
    let progress = (this.loadedFiles / this.allFiles) * 100;
    if (progress === 100) progress = 0;
    return { width: progress + '%' };
  }
}
