import { DatePipe, DecimalPipe } from "@angular/common";
import { makeEnvironmentProviders, EnvironmentProviders } from "@angular/core";
import { WuiModalOverlayContainer, WuiModalOverlay, WuiModal } from "./components/modal/modal-overlay";
import { WuiPageOverlayContainer, WuiPageOverlay, WuiPage } from "./components/page/page-overlay";

export function provideWui(): EnvironmentProviders {
  return makeEnvironmentProviders([
    // Pipes
    DatePipe,
    DecimalPipe,

    // Modal overlay
    WuiModalOverlayContainer,
    WuiModalOverlay,
    WuiModal,

    // Page overlay
    WuiPageOverlayContainer,
    WuiPageOverlay,
    WuiPage,
  ]);
}