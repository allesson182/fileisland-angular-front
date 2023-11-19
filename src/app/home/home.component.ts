import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FileStorageService} from "../services/File-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public filesForUpload: any[] = [];
  filesFull: any[];
  files:any;
  searchWord: string = '';
   constructor(private _snackBar: MatSnackBar, private fileStorageService: FileStorageService) { }

  ngOnInit(): void {
     this.files = this.filesFull;
  }

  onSearch() {
     console.log(this.searchWord)
    if (this.searchWord == '')
      this.files = this.filesFull;
    else
      this.files = this.filesFull.filter((file) => {
        return file.nome.includes(this.searchWord);
      });
  }

  download() {
    console.log('download')
  }
  onFileChange(pFileList: File[]){
    this.filesForUpload = pFileList;
    console.log(this.filesForUpload)
    this._snackBar.open("Successfully upload!", 'Close', {
      duration: 2000,
    });
  }
  onFileChangeInput(input){
     console.log(input)
    //get the file object from change event
    let fileList: FileList = input.target.files;
    this.onFileChange(Array.from(fileList));

  }
  deleteFile(f){
    this.filesForUpload = this.files.filter(function(w){ return w.name != f.name });
    this.fileStorageService.deleteFile(f.name).subscribe((data) => {
      console.log("Arquivo deletado com sucesso!");
    }, error => {
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
    return this.filesForUpload.length == 0;
  }
}
