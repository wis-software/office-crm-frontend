/* tslint:disable */
import { enableProdMode, NgModuleRef } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { Environment } from './model';

enableProdMode();

export const environment: Environment = {
  apiUrl: 'https://office-manager-test.herokuapp.com',
  production: true,
  showDevModule: false,

  /** Angular debug tools in the dev console
   * https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
   * @param modRef
   * @return {NgModuleRef}
   */
  decorateModuleRef(modRef: NgModuleRef<any>) {
    disableDebugTools();
    return modRef;
  },
  ENV_PROVIDERS: [

  ]
};
