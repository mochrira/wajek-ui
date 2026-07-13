import { DatePipe, DecimalPipe } from "@angular/common";
import { makeEnvironmentProviders, EnvironmentProviders, InjectionToken } from "@angular/core";
import { WuiModalOverlayContainer, WuiModalOverlay, WuiModal } from "./components/modal/modal-overlay";
import { WuiPageOverlayContainer, WuiPageOverlay, WuiPage } from "./components/page/page-overlay";
import { WuiService } from "./services/wui.service";

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
    WuiPage
  ]);
}