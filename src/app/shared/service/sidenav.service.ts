import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

/**
 * Service for open, close and toggle the set sidenav.
 * This service was mainly created to support the thread service.
 */
@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenav!: MatSidenav;

  /**
   * Sets the given sidenav as the current sidenav for the service.
   * @param sidenav Material sidenav
   */
  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  /**
   * Returns a boolean if the sidenav is set.
   * @returns Boolean.
   */
  public isSidenavSet(): boolean {
    return this.sidenav ? true : false;
  }
 
  /**
   * Opens the current set sidenav.
   */
  public open() {
    this.sidenav.open();
  }

  /**
   * Closes the current set sidenav.
   */
  public close() {
    this.sidenav.close();
  }

  /**
   * Toggles the current set sidenav.
   */
  public toggle(): void {
    this.sidenav.toggle();
  }
}
