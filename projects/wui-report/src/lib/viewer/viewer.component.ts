import { Component, OnInit, ViewChild, Input, Renderer2 } from '@angular/core';

declare var pdfjsLib: any;

@Component({
  selector: 'wui-report-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  @ViewChild('container') container: any;
  @Input('url') url: string;
  @Input('title') title: string;
  @Input('show') show: boolean = false;

  base64: string = '';
  document: any = null;
  pages: any = [];
  @Input('fileName') fileName: any = 'download.pdf';

  constructor(
    private renderer2: Renderer2
  ) { }

  async open() {
    this.show = true;
    await this.refresh();
  }

  close() {
    this.show = false;
  }

  print() {
    let frameId = 'printFrame';
    let printFrame : any = document.getElementById(frameId);

    if(printFrame == null) {
      printFrame = this.renderer2.createElement('iframe');
      this.renderer2.setStyle(printFrame, 'display', 'none');
      printFrame.id = frameId;
    }

    let data = Uint8Array.from(atob(this.base64), c => c.charCodeAt(0));
    let localPdf = URL.createObjectURL(new Blob([data], {type: 'application/pdf'}));
    printFrame.setAttribute('src', localPdf);

    let body = document.getElementsByTagName('body')[0];
    this.renderer2.appendChild(body, printFrame);
    printFrame.contentWindow.print();
  }

  download() {
    let url = 'data:application/pdf;base64,'+this.base64;
    let link = document.createElement('a');
    link.href = url;
    link.download = this.fileName;
    link.click();
  }

  convertToBase64(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        var reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result.toString());
        }
        let res = await fetch(this.url);
        let blob = await res.blob();
        reader.readAsDataURL(blob);
      } catch(e) {
        reject(e);
      }
    });
  }

  async refresh() {
    try {
      let res = await this.convertToBase64();
      this.base64 = res.split(',')[1];
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/pdfjs/pdf.worker.min.js';
      this.document = await pdfjsLib.getDocument({data: atob(this.base64)}).promise;
      for(let i = 1; i <= this.document.numPages; i++) {
        let page = await this.document.getPage(i);
        let initialViewport = page.getViewport({scale: 1.0});
        let viewport = page.getViewport({scale: (800 / initialViewport.width)});

        let canvas = this.renderer2.createElement('canvas');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        let context = canvas.getContext('2d');
        let renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        await page.render(renderContext).promise;      
        this.renderer2.appendChild(this.container.nativeElement, canvas);
      }
    } catch(e) {
      console.log('Unable to print');
    }
  }

  ngOnInit() {
    
  }

}
