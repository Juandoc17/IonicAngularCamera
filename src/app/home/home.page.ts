import { Component, ElementRef, ViewChild} from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as watermark from 'watermarkjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  photo: SafeResourceUrl;
  originalImage = null;
  blobimage = null;
  image = null;
  @ViewChild('previewimage') waterMarkImage: ElementRef
  constructor(private sanitizer: DomSanitizer) {}

  async takePicture(){
    let image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    watermark([this.photo])
    .image(watermark.text.lowerRight('Pokemon MarkWater!', '28px serif', '#fff', 0.5))
    .then(function (img) {
      document.getElementById('imagenWaterMark').appendChild(img);
    });
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  addImageWatermark(){
    watermark([this.photo])
    .image(watermark.text.lowerRight('MyPhoto', '28px serif', '#fff', 0.5))
    .then(function (img) {
      document.getElementById('text').appendChild(img);
    });
  }
}

