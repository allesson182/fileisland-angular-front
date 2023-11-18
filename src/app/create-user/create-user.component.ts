import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  username: string = '';
  password: string = '';
  email: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Implemente a lógica de criação de usuário aqui
    console.log('Usuário criado com sucesso!');
  }
}
