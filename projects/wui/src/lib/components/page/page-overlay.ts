import { Directionality } from "@angular/cdk/bidi";
import { Overlay, OverlayContainer, OverlayKeyboardDispatcher, OverlayOutsideClickDispatcher, OverlayPositionBuilder, ScrollStrategyOptions } from "@angular/cdk/overlay";
import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector, NgZone, Optional } from "@angular/core";
import { DOCUMENT, Location as Location_2 } from '@angular/common';
import { DEFAULT_DIALOG_CONFIG, Dialog, DIALOG_SCROLL_STRATEGY, DialogConfig } from "@angular/cdk/dialog";

@Injectable()
export class WuiPageOverlayContainer extends OverlayContainer {

    public setContainerElement(containerElement: HTMLElement): void {
        this._containerElement = containerElement;
    }

}

@Injectable()
export class WuiPageOverlay extends Overlay {

    private _pageOverlayContainer: WuiPageOverlayContainer;

    constructor(
        _scrollStrategies: ScrollStrategyOptions,
        _overlayContainer: WuiPageOverlayContainer,
        _componentFactoryResolver: ComponentFactoryResolver,
        _positionBuilder: OverlayPositionBuilder,
        _keyboardDispatcher: OverlayKeyboardDispatcher,
        _appRef: ApplicationRef,
        _injector: Injector,
        _ngZone: NgZone,
        @Inject(DOCUMENT) _document: any,
        _directionality: Directionality,
        _location: Location_2,
        _outsideClickDispatcher: OverlayOutsideClickDispatcher
    ) {
        super(
            _scrollStrategies,
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

        this._pageOverlayContainer = _overlayContainer;
    }

    public setContainerElement(containerElement: HTMLElement): void {
        this._pageOverlayContainer.setContainerElement(containerElement);
    }

}

@Injectable()
export class WuiPage extends Dialog {

    private _customOverlay: WuiPageOverlay;

    constructor(
        _overlay: WuiPageOverlay,
        _injector: Injector,
        @Optional() @Inject(DEFAULT_DIALOG_CONFIG) _defaultOptions: DialogConfig,
        _parentDialog: Dialog,
        _overlayContainer: WuiPageOverlayContainer,
        @Optional() @Inject(DIALOG_SCROLL_STRATEGY) _scrollStrategy: any
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

    public setContainerElement(containerElement: HTMLElement) {
        this._customOverlay.setContainerElement(containerElement);
    }

}