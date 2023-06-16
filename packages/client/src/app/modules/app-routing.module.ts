import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { GamePageComponent } from '../pages/game-page/game-page.component';
import { InstructionPageComponent } from '../pages/instruction-page/instruction-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'game/instructions/:id', component: InstructionPageComponent },
  { path: 'game/:id', component: GamePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
