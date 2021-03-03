import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent} from './login/login.component';
import { NapraviNoviComponent } from './napravi-novi/napravi-novi.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ProdajaComponent } from './prodaja/prodaja.component';
import { RegisterComponent} from './register/register.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', component: PocetnaComponent},
  { path: 'pocetna', component: PocetnaComponent},
  { path: 'prodaja', component: ProdajaComponent},
  { path: 'shoppingCard', component: ShoppingCardComponent, canActivate: [AuthGuard]},
  { path: 'napraviNovi', component: NapraviNoviComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
