import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DataRendererComponent } from './components/data-renderer/data-renderer.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { SwiperComponent } from './modules/swiper/components/swiper/swiper.component';
import { SlideComponent } from './modules/swiper/components/slide/slide.component';
import { ButtonComponent } from './components/button/button.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LayoutComponent } from './components/layout/layout.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SimpleButtonComponent } from './components/simple-button/simple-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DataRendererComponent,
    GamePageComponent,
    GameListComponent,
    ButtonComponent,
    GameCardComponent,
    LayoutComponent,
    SimpleButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SwiperComponent,
    SlideComponent,
    LoadingBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
