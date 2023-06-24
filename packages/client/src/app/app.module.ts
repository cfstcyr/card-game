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
import { GameCardComponent } from './components/game-card/game-card.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LayoutComponent } from './components/layout/layout.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ModalModule } from './modules/modal/modal.module';
import { UiModule } from './modules/ui/ui.module';
import { InstructionPageComponent } from './pages/instruction-page/instruction-page.component';
import { MarkdownModule } from 'ngx-markdown';
import { GamesService } from './services/game-service/games.service';
import { environment } from 'src/environments/environment';
import { LocalGamesService } from './services/game-service/local-games.service';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DataRendererComponent,
    GamePageComponent,
    GameListComponent,
    GameCardComponent,
    LayoutComponent,
    InstructionPageComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SwiperComponent,
    SlideComponent,
    LoadingBarModule,
    ModalModule,
    UiModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MarkdownModule.forRoot({}),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true,
  }, {
    provide: GamesService,
    useClass: environment.LOCAL_DATA ? LocalGamesService : GamesService,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
