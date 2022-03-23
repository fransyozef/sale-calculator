import { Component, OnInit } from '@angular/core';

import { Platform, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ToastOptions, LoadingOptions } from '@ionic/core';
import { Subscription } from 'rxjs';

import { get, set } from 'idb-keyval';
import { SwUpdate } from '@angular/service-worker';

import { AngularPageVisibilityService, AngularPageVisibilityStateEnum } from 'angular-page-visibility';

import { isIos, isInStandaloneMode } from './_shared/helpers';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  onPageVisibleSubscription: Subscription;

  toastInstall: any;

  constructor(
    private platform: Platform,
    public loadingController: LoadingController,
    private swUpdate: SwUpdate,
    private alertController: AlertController,
    private angularPageVisibilityService: AngularPageVisibilityService,
    private toastController: ToastController,
  ) {

  }


  async checkIosInstallBanner() {

    // Show the banner once
    const isBannerShown = await get('isBannerShown');

    // Checks if it should display install popup notification
    if (isIos() && !isInStandaloneMode() && isBannerShown === undefined) {
      set('isBannerShown', true);
      await this.showIosInstallBanner();
    }
  }

  async showIosInstallBanner() {
    if (!this.toastInstall) {
      this.toastInstall = await this.toastController.create({
        buttons: [
          {
            icon: 'close',
            side: 'end',
            handler: () => { }
          },
        ],
        color: 'dark',
        // cssClass: 'custom-toast',
        position: 'bottom',
        header: 'Install Percentage Calculator on your device',
        message: `<br>1. Tap the share icon on your browser toolbar<br><br><img src='/assets/share_toolbar.png'><br><br>2. Then select 'Add to Home Screen'<br><br><img src='/assets/add_to_homescreen.png'>`,
      });
      this.toastInstall.present();
    }
  }

  checkUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(async (evt) => {
        switch (evt.type) {
          // case 'VERSION_DETECTED':
          //   console.log(`Downloading new app version: ${evt.version.hash}`);
          //   break;
          case 'VERSION_READY':
            // console.log(`Current app version: ${evt.currentVersion.hash}`);
            // console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
            const alert = await this.alertController.create({
              header: `App update!`,
              message: `Newer version of the app is available. It's a quick refresh away!`,
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                }, {
                  text: 'Refresh',
                  handler: () => {
                    window.location.reload();
                  },
                },
              ],
            });
            await alert.present();
            break;
          // case 'VERSION_INSTALLATION_FAILED':
          //   console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          //   break;
        }
      });
    }
  }

  initPageVisibility() {
    if (isIos() && isInStandaloneMode()) {
      // listen on page visibility change
      this.onPageVisibleSubscription = this.angularPageVisibilityService.$onPageVisibilityChange.subscribe((
        visibilityState: AngularPageVisibilityStateEnum
      ) => {
        const visibility = localStorage.getItem('visibility');
        let status = '';
        switch (visibilityState) {
          case AngularPageVisibilityStateEnum.VISIBLE: {
            status = 'VISIBLE';
            localStorage.setItem('visibility', status);
            if (visibility === 'HIDDEN') {
              this.onAppStarted();
            }
            break;
          }
          case AngularPageVisibilityStateEnum.HIDDEN: {
            status = 'HIDDEN';
            localStorage.setItem('visibility', status);
            break;
          }
        }
      });
    }
  }


  initializeApp() {
    this.checkIosInstallBanner();
    this.checkUpdate();
    this.initPageVisibility();
  }

  ngOnInit() {
    this.initializeApp();
  }

  onAppStarted() {
    this.swUpdate.checkForUpdate();
  }
}
