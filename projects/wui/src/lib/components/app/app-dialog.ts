import {
    DEFAULT_DIALOG_CONFIG,
    Dialog,
    DIALOG_SCROLL_STRATEGY,
    DialogConfig,
    DialogModule,
} from '@angular/cdk/dialog';
import {
  Injector,
  Injectable,
  ComponentFactoryResolver,
  NgZone,
  Inject,
  Renderer2,
  NgModule,
  Optional,
} from '@angular/core';
import {
  OverlayContainer,
  Overlay,
  ScrollStrategyOptions,
  OverlayPositionBuilder,
  OverlayKeyboardDispatcher,
  OverlayOutsideClickDispatcher,
} from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { Location as Location_2 } from '@angular/common';

@Injectable()
export class AppDialogOverlayContainer extends OverlayContainer {
  public setContainerElement(containerElement: HTMLElement): void {
    this._containerElement = containerElement;
  }
}
  
@Injectable()
export class AppDialogOverlay extends Overlay {
  private _customOverlayContainer: AppDialogOverlayContainer;

  constructor(
    scrollStrategy: ScrollStrategyOptions,
    _overlayContainer: AppDialogOverlayContainer,
    _componentFactoryResolver: ComponentFactoryResolver,
    _positionBuilder: OverlayPositionBuilder,
    _keyboardDispatcher: OverlayKeyboardDispatcher,
    _injector: Injector,
    _ngZone: NgZone,
    @Inject(DOCUMENT) _document: any,
    _directionality: Directionality,
    _location: Location_2,
    _outsideClickDispatcher: OverlayOutsideClickDispatcher
  ) {
    super(
      scrollStrategy,
      _overlayContainer,
      _componentFactoryResolver,
      _positionBuilder,
      _keyboardDispatcher,
      _injector,
      _ngZone,
      _document,
      _directionality,
      _location,
      _outsideClickDispatcher
    );

    this._customOverlayContainer = _overlayContainer;
  }

  public setContainerElement(containerElement: HTMLElement): void {
    this._customOverlayContainer.setContainerElement(containerElement);
  }
}
  
@Injectable()
export class AppDialog extends Dialog {
  private _customOverlay: AppDialogOverlay;

  constructor(
    _overlay: AppDialogOverlay,
    _injector: Injector,
    @Optional() @Inject(DEFAULT_DIALOG_CONFIG) _defaultOptions: DialogConfig,
    _parentDialog: Dialog,
    _overlayContainer: OverlayContainer,
    @Inject(DIALOG_SCROLL_STRATEGY) _scrollStrategy: any
  ) {
    super(
      _overlay,
      _injector,
      _defaultOptions,
      _parentDialog,
      _overlayContainer,
      _scrollStrategy
    );

    this._customOverlay = _overlay;
  }

  public setContainerElement(
    containerElement: HTMLElement,
    renderer: Renderer2
  ): void {
    renderer.setStyle(containerElement, 'transform', 'translateZ(0)');
    this._customOverlay.setContainerElement(containerElement);
  }
}