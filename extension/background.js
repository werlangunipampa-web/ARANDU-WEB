'use strict';
// O usuário controla quando abrir/fechar a barra lateral.
browser.browserAction.onClicked.addListener(async () => {
  try {
    await browser.sidebarAction.toggle();
  } catch (error) {
    console.error('ARANDU WEB: não foi possível alternar a barra lateral', error);
  }
});
