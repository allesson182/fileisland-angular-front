import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 filesFull = [{nome: 'nome 1'}, {nome:'nome 2'}, {nome:'nome 3'}, {nome:'nome 4'}, {nome:'nome 5'}, {nome:'nome 6'}, {nome:'nome 7'}, {nome:'nome 8'}, {nome:'nome 9'}, {nome:'nome 10'}, {nome:'nome 11'}, {nome:'nome 12'}, {nome:'nome 13'}, {nome:'nome 14'}, {nome:'nome 15'}, {nome:'nome16'}, {nome:'nome17'}, {nome:'nome18'}, {nome:'nome19'}, {nome:'nome20'}, {nome:'nome21'}, {nome:'nome22'}, {nome:'nome23'}, {nome:'nome24'}, {nome:'nome25'}, {nome:'nome26'}, {nome:'nome27'}, {nome:'nome28'}, {nome:'nome29'}, {nome:'nome30'}, {nome:'nome31'}, {nome:'nome32'}, {nome:'nome33'}, {nome:'nome34'}, {nome:'nome35'}, {nome:'nome36'}, {nome:'nome37'}, {nome:'nome38'}, {nome:'nome39'}, {nome:'nome40'}, {nome:'nome41'}, {nome:'nome42'}, {nome:'nome43'}, {nome:'nome44'}, {nome:'nome45'}, {nome:'nome46'}, {nome:'nome47'}, {nome:'nome48'}, {nome:'nome49'}, {nome:'nome50'}];
 files:any;
 searchWord: string = '';
   constructor() { }

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
}
