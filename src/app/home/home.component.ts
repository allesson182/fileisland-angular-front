import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FileStorageService} from "../services/File-storage.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {S3Object} from "../entity/S3Object";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public filesForUpload: any[] = [];
  filesFull: S3Object[] = []
  files: S3Object[] = [];
  searchWord: string = '';
   constructor(private _snackBar: MatSnackBar,
               private fileStorageService: FileStorageService,
               private authService:AuthService,
               private router:Router) { }

  ngOnInit(): void {
     this.files = this.filesFull;
     this.getUserFiles()
  }

  onSearch() {
     console.log(this.searchWord)
    if (this.searchWord == '')
      this.files = this.filesFull;
    else
      this.files = this.filesFull.filter((file) => {
        return file.key.includes(this.searchWord);
      });
  }

  download() {
    console.log('download')
  }
  onFileChange(pFileList: File[]){
    this.filesForUpload.push(...pFileList)
    this.filesForUpload.forEach((file) => {
      this.fileStorageService.uploadFile(file.name, file).subscribe((data) => {
        this._snackBar.open(file.name.concat(": Upload realizado com sucesso!"), "Close", {duration: 1000});
        this.deleteFromUploadList(file)
        this.getUserFiles()
      }, error => {
        this.deleteFromUploadList(file)
        this._snackBar.open(file.name.concat(": Erro ao subir arquivo"), "Close", {duration: 1000});
      })});


  }
  onFileChangeInput(inputEvent: any){
    let fileList: FileList = inputEvent.target.files;
    this.onFileChange(Array.from(fileList));

  }
  deleteFile(f){
    let key = this.formatKey(f.key);
    this.fileStorageService.deleteFile(key).subscribe((data) => {
      this._snackBar.open(key.concat(": Arquivo deletado com sucesso!"), "Close", {duration: 1000});
      this.getUserFiles()
    }, error => {
      this._snackBar.open(key.concat(": Erro ao deletar arquivo"), "Close", {duration: 1000});
      console.log(error);
    });

  }

  downloadFile() {
    const bucketName = 'seu-bucket'; // Substitua pelo nome do seu bucket
    const objectKey = 'seu-arquivo.txt'; // Substitua pelo nome do seu arquivo
    this.fileStorageService.downloadFile(objectKey).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = objectKey; // Nome do arquivo
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  uploadFile() {
    this.filesForUpload.forEach((file) => {
      this.fileStorageService.uploadFile(file.name, file).subscribe((data) => {
        console.log("Upload realizado com sucesso!");
      }, error => {
        console.log(error);
      });
    });
  }

  isEmpty() {
    return this.filesFull.length == 0;
  }
  private getUserFiles() {
    this.authService.isLoggedIn().subscribe((data) => {
          this.fileStorageService.listFiles(this.searchWord, 0, 30).subscribe((data) => {
            this.filesFull = data;
            this.files = data;
          }, error => {
            console.log(error);
          });
    }, error => {
      this.router.navigate(['/login']);
    });

    }

  deleteFromUploadList(file: any) {
    this.filesForUpload = this.filesForUpload.filter(function(w){ return w.name != file.name });
  }

  formatKey(key: string) {
     //remove the prefix
      return key.split('/')[1];

  }
  formateDate(date: Date) {
      return new Date(date).toLocaleDateString();
  }

  formatSize(size: number) {
     //format bytes to KB or MB or GB or TB or PB
    if (size < 1024) {
      return size + ' B';
    }
    const i = Math.floor(Math.log(size) / Math.log(1024));
    const num = size / Math.pow(1024, i);
    const round = Math.round(num);
    const decimals = round == num ? 0 : 2;
    const result = round.toFixed(decimals);
    return result + ' ' + 'KMGTPEZY'[i - 1] + 'B';
  }

  getType(key: string) {
    const ext = key.split('.')[1];
    if (ext == 'pdf') {
      return 'pdf';
    } else if (ext == 'jpg' || ext == 'jpeg' || ext == 'png') {
      return 'image';
    } else if (ext == 'mp4') {
      return 'video';
    } else if (ext == 'mp3') {
      return 'audio';
    } else {
      return 'file';
    }
  }
}
