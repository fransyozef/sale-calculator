import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'sale-calculator', pathMatch: 'full' },
  { path: 'sale-calculator', 
    loadChildren: () => import('./sale-calculator/sale-calculator.module').then(mod=>mod.SaleCalculatorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
