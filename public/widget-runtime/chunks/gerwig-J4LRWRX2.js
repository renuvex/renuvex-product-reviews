/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as Ke,c as ui}from"./chunk-D4BSMMIO.js";var Qa=e=>{throw TypeError(e)},Xa=(e,t,i)=>t.has(e)||Qa("Cannot "+i),Qn=(e,t,i)=>(Xa(e,t,"read from private field"),i?i.call(e):t.get(e)),Xn=(e,t,i)=>t.has(e)?Qa("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,i),Jn=(e,t,i,a)=>(Xa(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),jn=`<template id="media-theme-gerwig">
  <style>
    @keyframes pre-play-hide {
      0% {
        transform: scale(1);
        opacity: 1;
      }

      30% {
        transform: scale(0.7);
      }

      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }

    :host {
      --_primary-color: var(--media-primary-color, #fff);
      --_secondary-color: var(--media-secondary-color, transparent);
      --_accent-color: var(--media-accent-color, #fa50b5);
      --_text-color: var(--media-text-color, #000);

      --media-icon-color: var(--_primary-color);
      --media-control-background: var(--_secondary-color);
      --media-control-hover-background: var(--_accent-color);
      --media-time-buffered-color: rgba(255, 255, 255, 0.4);
      --media-preview-time-text-shadow: none;
      --media-control-height: 14px;
      --media-control-padding: 6px;
      --media-tooltip-container-margin: 6px;
      --media-tooltip-distance: 18px;

      color: var(--_primary-color);
      display: inline-block;
      width: 100%;
      height: 100%;
    }

    :host([audio]) {
      --_secondary-color: var(--media-secondary-color, black);
      --media-preview-time-text-shadow: none;
    }

    :host([audio]) ::slotted([slot='media']) {
      height: 0px;
    }

    :host([audio]) media-loading-indicator {
      display: none;
    }

    :host([audio]) media-controller {
      background: transparent;
    }

    :host([audio]) media-controller::part(vertical-layer) {
      background: transparent;
    }

    :host([audio]) media-control-bar {
      width: 100%;
      background-color: var(--media-control-background);
    }

    /*
     * 0.433s is the transition duration for VTT Regions.
     * Borrowed here, so the captions don't move too fast.
     */
    media-controller {
      --media-webkit-text-track-transform: translateY(0) scale(0.98);
      --media-webkit-text-track-transition: transform 0.433s ease-out 0.3s;
    }
    media-controller:is([mediapaused], :not([userinactive])) {
      --media-webkit-text-track-transform: translateY(-50px) scale(0.98);
      --media-webkit-text-track-transition: transform 0.15s ease;
    }

    /*
     * CSS specific to iOS devices.
     * See: https://stackoverflow.com/questions/30102792/css-media-query-to-target-only-ios-devices/60220757#60220757
     */
    @supports (-webkit-touch-callout: none) {
      /* Disable subtitle adjusting for iOS Safari */
      media-controller[mediaisfullscreen] {
        --media-webkit-text-track-transform: unset;
        --media-webkit-text-track-transition: unset;
      }
    }

    media-time-range {
      --media-box-padding-left: 6px;
      --media-box-padding-right: 6px;
      --media-range-bar-color: var(--_accent-color);
      --media-time-range-buffered-color: var(--_primary-color);
      --media-range-track-color: transparent;
      --media-range-track-background: rgba(255, 255, 255, 0.4);
      --media-range-thumb-background: radial-gradient(
        circle,
        #000 0%,
        #000 25%,
        var(--_accent-color) 25%,
        var(--_accent-color)
      );
      --media-range-thumb-width: 12px;
      --media-range-thumb-height: 12px;
      --media-range-thumb-transform: scale(0);
      --media-range-thumb-transition: transform 0.3s;
      --media-range-thumb-opacity: 1;
      --media-preview-background: var(--_primary-color);
      --media-box-arrow-background: var(--_primary-color);
      --media-preview-thumbnail-border: 5px solid var(--_primary-color);
      --media-preview-border-radius: 5px;
      --media-text-color: var(--_text-color);
      --media-control-hover-background: transparent;
      --media-preview-chapter-text-shadow: none;
      color: var(--_accent-color);
      padding: 0 6px;
    }

    :host([audio]) media-time-range {
      --media-preview-time-padding: 1.5px 6px;
      --media-preview-box-margin: 0 0 -5px;
    }

    media-time-range:hover {
      --media-range-thumb-transform: scale(1);
    }

    media-preview-thumbnail {
      border-bottom-width: 0;
    }

    [part~='menu'] {
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      bottom: 50px;
      padding: 2.5px 10px;
    }

    [part~='menu']::part(indicator) {
      fill: var(--_accent-color);
    }

    [part~='menu']::part(menu-item) {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 6px 10px;
      min-height: 34px;
    }

    [part~='menu']::part(checked) {
      font-weight: 700;
    }

    media-captions-menu,
    media-rendition-menu,
    media-audio-track-menu,
    media-playback-rate-menu {
      position: absolute; /* ensure they don't take up space in DOM on load */
      --media-menu-background: var(--_primary-color);
      --media-menu-item-checked-background: transparent;
      --media-text-color: var(--_text-color);
      --media-menu-item-hover-background: transparent;
      --media-menu-item-hover-outline: var(--_accent-color) solid 1px;
    }

    media-rendition-menu {
      min-width: 140px;
    }

    /* The icon is a circle so make it 16px high instead of 14px for more balance. */
    media-audio-track-menu-button {
      --media-control-padding: 5px;
      --media-control-height: 16px;
    }

    media-playback-rate-menu-button {
      --media-control-padding: 6px 3px;
      min-width: 4.4ch;
    }

    media-playback-rate-menu {
      --media-menu-flex-direction: row;
      --media-menu-item-checked-background: var(--_accent-color);
      --media-menu-item-checked-indicator-display: none;
      margin-right: 6px;
      padding: 0;
      --media-menu-gap: 0.25em;
    }

    media-playback-rate-menu[part~='menu']::part(menu-item) {
      padding: 6px 6px 6px 8px;
    }

    media-playback-rate-menu[part~='menu']::part(checked) {
      color: #fff;
    }

    :host(:not([audio])) media-time-range {
      /* Adding px is required here for calc() */
      --media-range-padding: 0px;
      background: transparent;
      z-index: 10;
      height: 10px;
      bottom: -3px;
      width: 100%;
    }

    media-control-bar :is([role='button'], [role='switch'], button) {
      line-height: 0;
    }

    media-control-bar :is([part*='button'], [part*='range'], [part*='display']) {
      border-radius: 3px;
    }

    .spacer {
      flex-grow: 1;
      background-color: var(--media-control-background, rgba(20, 20, 30, 0.7));
    }

    media-control-bar[slot~='top-chrome'] {
      min-height: 42px;
      pointer-events: none;
    }

    media-control-bar {
      --gradient-steps:
        hsl(0 0% 0% / 0) 0%, hsl(0 0% 0% / 0.013) 8.1%, hsl(0 0% 0% / 0.049) 15.5%, hsl(0 0% 0% / 0.104) 22.5%,
        hsl(0 0% 0% / 0.175) 29%, hsl(0 0% 0% / 0.259) 35.3%, hsl(0 0% 0% / 0.352) 41.2%, hsl(0 0% 0% / 0.45) 47.1%,
        hsl(0 0% 0% / 0.55) 52.9%, hsl(0 0% 0% / 0.648) 58.8%, hsl(0 0% 0% / 0.741) 64.7%, hsl(0 0% 0% / 0.825) 71%,
        hsl(0 0% 0% / 0.896) 77.5%, hsl(0 0% 0% / 0.951) 84.5%, hsl(0 0% 0% / 0.987) 91.9%, hsl(0 0% 0%) 100%;
    }

    :host([title]) media-control-bar[slot='top-chrome']::before,
    :host([videotitle]) media-control-bar[slot='top-chrome']::before {
      content: '';
      position: absolute;
      width: 100%;
      padding-bottom: min(100px, 25%);
      background: linear-gradient(to top, var(--gradient-steps));
      opacity: 0.8;
      pointer-events: none;
    }

    :host(:not([audio])) media-control-bar[part~='bottom']::before {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      padding-bottom: min(100px, 25%);
      background: linear-gradient(to bottom, var(--gradient-steps));
      opacity: 0.8;
      z-index: 1;
      pointer-events: none;
    }

    media-control-bar[part~='bottom'] > * {
      z-index: 20;
    }

    media-control-bar[part~='bottom'] {
      padding: 6px 6px;
    }

    media-control-bar[slot~='top-chrome'] > * {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      position: relative;
    }

    media-controller::part(vertical-layer) {
      transition: background-color 1s;
    }

    media-controller:is([mediapaused], :not([userinactive]))::part(vertical-layer) {
      background-color: var(--controls-backdrop-color, var(--controls, transparent));
      transition: background-color 0.25s;
    }

    .center-controls {
      --media-button-icon-width: 100%;
      --media-button-icon-height: auto;
      --media-tooltip-display: none;
      pointer-events: none;
      width: 100%;
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: center;
      paint-order: stroke;
      stroke: rgba(102, 102, 102, 1);
      stroke-width: 0.3px;
      text-shadow:
        0 0 2px rgb(0 0 0 / 0.25),
        0 0 6px rgb(0 0 0 / 0.25);
    }

    .center-controls media-play-button {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      --media-control-padding: 0;
      width: 40px;
      filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.25)) drop-shadow(0 0 6px rgb(0 0 0 / 0.25));
    }

    [breakpointsm] .center-controls media-play-button {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      transition: background 0.4s;
      padding: 24px;
      --media-control-background: #000;
      --media-control-hover-background: var(--_accent-color);
    }

    .center-controls media-seek-backward-button,
    .center-controls media-seek-forward-button {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      padding: 0;
      margin: 0 20px;
      width: max(33px, min(8%, 40px));
      text-shadow:
        0 0 2px rgb(0 0 0 / 0.25),
        0 0 6px rgb(0 0 0 / 0.25);
    }

    [breakpointsm]:not([audio]) .center-controls.pre-playback {
      display: grid;
      align-items: initial;
      justify-content: initial;
      height: 100%;
      overflow: hidden;
    }

    [breakpointsm]:not([audio]) .center-controls.pre-playback media-play-button {
      place-self: var(--_pre-playback-place, center);
      grid-area: 1 / 1;
      margin: 16px;
    }

    /* Show and hide controls or pre-playback state */

    [breakpointsm]:is([mediahasplayed], :not([mediapaused])):not([audio])
      .center-controls.pre-playback
      media-play-button {
      /* Using \`forwards\` would lead to a laggy UI after the animation got in the end state */
      animation: 0.3s linear pre-play-hide;
      opacity: 0;
      pointer-events: none;
    }

    .autoplay-unmute {
      --media-control-hover-background: transparent;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.25)) drop-shadow(0 0 6px rgb(0 0 0 / 0.25));
    }

    .autoplay-unmute-btn {
      --media-control-height: 16px;
      border-radius: 8px;
      background: #000;
      color: var(--_primary-color);
      display: flex;
      align-items: center;
      padding: 8px 16px;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
    }

    .autoplay-unmute-btn:hover {
      background: var(--_accent-color);
    }

    [breakpointsm] .autoplay-unmute-btn {
      --media-control-height: 30px;
      padding: 14px 24px;
      font-size: 26px;
    }

    .autoplay-unmute-btn svg {
      margin: 0 6px 0 0;
    }

    [breakpointsm] .autoplay-unmute-btn svg {
      margin: 0 10px 0 0;
    }

    media-controller:not([audio]):not([mediahasplayed]) *:is(media-control-bar, media-time-range) {
      display: none;
    }

    media-error-dialog:not([mediaerrorcode]) {
      opacity: 0;
    }

    media-loading-indicator {
      --media-loading-icon-width: 100%;
      --media-button-icon-height: auto;
      display: var(--media-control-display, var(--media-loading-indicator-display, flex));
      pointer-events: none;
      position: absolute;
      width: min(15%, 150px);
      flex-flow: row;
      align-items: center;
      justify-content: center;
    }

    /* Intentionally don't target the div for transition but the children
     of the div. Prevents messing with media-chrome's autohide feature. */
    media-loading-indicator + div * {
      transition: opacity 0.15s;
      opacity: 1;
    }

    media-loading-indicator[medialoading]:not([mediapaused]) ~ div > * {
      opacity: 0;
      transition-delay: 400ms;
    }

    media-volume-range {
      width: min(100%, 100px);
      --media-range-padding-left: 10px;
      --media-range-padding-right: 10px;
      --media-range-thumb-width: 12px;
      --media-range-thumb-height: 12px;
      --media-range-thumb-background: radial-gradient(
        circle,
        #000 0%,
        #000 25%,
        var(--_primary-color) 25%,
        var(--_primary-color)
      );
      --media-control-hover-background: none;
    }

    media-time-display {
      white-space: nowrap;
    }

    /* Generic style for explicitly disabled controls */
    media-control-bar[part~='bottom'] [disabled],
    media-control-bar[part~='bottom'] [aria-disabled='true'] {
      opacity: 60%;
      cursor: not-allowed;
    }

    media-text-display {
      --media-font-size: 16px;
      --media-control-padding: 14px;
      font-weight: 500;
    }

    media-play-button.animated *:is(g, path) {
      transition: all 0.3s;
    }

    media-play-button.animated[mediapaused] .pause-icon-pt1 {
      opacity: 0;
    }

    media-play-button.animated[mediapaused] .pause-icon-pt2 {
      transform-origin: center center;
      transform: scaleY(0);
    }

    media-play-button.animated[mediapaused] .play-icon {
      clip-path: inset(0 0 0 0);
    }

    media-play-button.animated:not([mediapaused]) .play-icon {
      clip-path: inset(0 0 0 100%);
    }

    media-seek-forward-button,
    media-seek-backward-button {
      --media-font-weight: 400;
    }

    .mute-icon {
      display: inline-block;
    }

    .mute-icon :is(path, g) {
      transition: opacity 0.5s;
    }

    .muted {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='low'] :is(.volume-medium, .volume-high),
    media-mute-button[mediavolumelevel='medium'] :is(.volume-high) {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='off'] .unmuted {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='off'] .muted {
      opacity: 1;
    }

    /**
     * Our defaults for these buttons are to hide them at small sizes
     * users can override this with CSS
     */
    media-controller:not([breakpointsm]):not([audio]) {
      --bottom-play-button: none;
      --bottom-seek-backward-button: none;
      --bottom-seek-forward-button: none;
      --bottom-time-display: none;
      --bottom-playback-rate-menu-button: none;
      --bottom-pip-button: none;
    }

    [part='mux-badge'] {
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 2;
      opacity: 0.6;
      transition:
        opacity 0.2s ease-in-out,
        bottom 0.2s ease-in-out;
    }

    [part='mux-badge']:hover {
      opacity: 1;
    }

    [part='mux-badge'] a {
      font-size: 14px;
      font-family: var(--_font-family);
      color: var(--_primary-color);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    [part='mux-badge'] .mux-badge-text {
      transition: opacity 0.5s ease-in-out;
      opacity: 0;
    }

    [part='mux-badge'] .mux-badge-logo {
      width: 40px;
      height: auto;
      display: inline-block;
    }

    [part='mux-badge'] .mux-badge-logo svg {
      width: 100%;
      height: 100%;
      fill: white;
    }

    media-controller:not([userinactive]):not([mediahasplayed]) [part='mux-badge'],
    media-controller:not([userinactive]) [part='mux-badge'],
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] {
      transition: bottom 0.1s ease-in-out;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] {
      transition: bottom 0.2s ease-in-out 0.62s;
    }

    media-controller:not([userinactive]) [part='mux-badge'] .mux-badge-text,
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] .mux-badge-text {
      opacity: 1;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] .mux-badge-text {
      opacity: 0;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] {
      bottom: 10px;
    }

    media-controller:not([userinactive]):not([mediahasplayed]) [part='mux-badge'] {
      bottom: 10px;
    }

    media-controller:not([userinactive])[mediahasplayed] [part='mux-badge'],
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] {
      bottom: calc(28px + var(--media-control-height, 0px) + var(--media-control-padding, 0px) * 2);
    }
  </style>

  <template partial="TitleDisplay">
    <template if="videotitle">
      <template if="videotitle != true">
        <media-text-display part="top title display" class="title-display">{{videotitle}}</media-text-display>
      </template>
    </template>
    <template if="!videotitle">
      <template if="title">
        <media-text-display part="top title display" class="title-display">{{title}}</media-text-display>
      </template>
    </template>
  </template>

  <template partial="PlayButton">
    <media-play-button
      part="{{section ?? 'bottom'}} play button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      class="animated"
    >
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="icon">
        <g class="play-icon">
          <path
            d="M15.5987 6.2911L3.45577 0.110898C2.83667 -0.204202 2.06287 0.189698 2.06287 0.819798V13.1802C2.06287 13.8103 2.83667 14.2042 3.45577 13.8891L15.5987 7.7089C16.2178 7.3938 16.2178 6.6061 15.5987 6.2911Z"
          />
        </g>
        <g class="pause-icon">
          <path
            class="pause-icon-pt1"
            d="M5.90709 0H2.96889C2.46857 0 2.06299 0.405585 2.06299 0.9059V13.0941C2.06299 13.5944 2.46857 14 2.96889 14H5.90709C6.4074 14 6.81299 13.5944 6.81299 13.0941V0.9059C6.81299 0.405585 6.4074 0 5.90709 0Z"
          />
          <path
            class="pause-icon-pt2"
            d="M15.1571 0H12.2189C11.7186 0 11.313 0.405585 11.313 0.9059V13.0941C11.313 13.5944 11.7186 14 12.2189 14H15.1571C15.6574 14 16.063 13.5944 16.063 13.0941V0.9059C16.063 0.405585 15.6574 0 15.1571 0Z"
          />
        </g>
      </svg>
    </media-play-button>
  </template>

  <template partial="PrePlayButton">
    <media-play-button
      part="{{section ?? 'center'}} play button pre-play"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="icon" style="transform: translate(3px, 0)">
        <path
          d="M15.5987 6.2911L3.45577 0.110898C2.83667 -0.204202 2.06287 0.189698 2.06287 0.819798V13.1802C2.06287 13.8103 2.83667 14.2042 3.45577 13.8891L15.5987 7.7089C16.2178 7.3938 16.2178 6.6061 15.5987 6.2911Z"
        />
      </svg>
    </media-play-button>
  </template>

  <template partial="SeekBackwardButton">
    <media-seek-backward-button
      seekoffset="{{backwardseekoffset}}"
      part="{{section ?? 'bottom'}} seek-backward button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg viewBox="0 0 22 14" aria-hidden="true" slot="icon">
        <path
          d="M3.65 2.07888L0.0864 6.7279C-0.0288 6.87812 -0.0288 7.12188 0.0864 7.2721L3.65 11.9211C3.7792 12.0896 4 11.9703 4 11.7321V2.26787C4 2.02968 3.7792 1.9104 3.65 2.07888Z"
        />
        <text transform="translate(6 12)" style="font-size: 14px; font-family: 'ArialMT', 'Arial'">
          {{backwardseekoffset}}
        </text>
      </svg>
    </media-seek-backward-button>
  </template>

  <template partial="SeekForwardButton">
    <media-seek-forward-button
      seekoffset="{{forwardseekoffset}}"
      part="{{section ?? 'bottom'}} seek-forward button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg viewBox="0 0 22 14" aria-hidden="true" slot="icon">
        <g>
          <text transform="translate(-1 12)" style="font-size: 14px; font-family: 'ArialMT', 'Arial'">
            {{forwardseekoffset}}
          </text>
          <path
            d="M18.35 11.9211L21.9136 7.2721C22.0288 7.12188 22.0288 6.87812 21.9136 6.7279L18.35 2.07888C18.2208 1.91041 18 2.02968 18 2.26787V11.7321C18 11.9703 18.2208 12.0896 18.35 11.9211Z"
          />
        </g>
      </svg>
    </media-seek-forward-button>
  </template>

  <template partial="MuteButton">
    <media-mute-button part="bottom mute button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" slot="icon" class="mute-icon" aria-hidden="true">
        <g class="unmuted">
          <path
            d="M6.76786 1.21233L3.98606 3.98924H1.19937C0.593146 3.98924 0.101743 4.51375 0.101743 5.1607V6.96412L0 6.99998L0.101743 7.03583V8.83926C0.101743 9.48633 0.593146 10.0108 1.19937 10.0108H3.98606L6.76773 12.7877C7.23561 13.2547 8 12.9007 8 12.2171V1.78301C8 1.09925 7.23574 0.745258 6.76786 1.21233Z"
          />
          <path
            class="volume-low"
            d="M10 3.54781C10.7452 4.55141 11.1393 5.74511 11.1393 6.99991C11.1393 8.25471 10.7453 9.44791 10 10.4515L10.7988 11.0496C11.6734 9.87201 12.1356 8.47161 12.1356 6.99991C12.1356 5.52821 11.6735 4.12731 10.7988 2.94971L10 3.54781Z"
          />
          <path
            class="volume-medium"
            d="M12.3778 2.40086C13.2709 3.76756 13.7428 5.35806 13.7428 7.00026C13.7428 8.64246 13.2709 10.233 12.3778 11.5992L13.2106 12.1484C14.2107 10.6185 14.739 8.83796 14.739 7.00016C14.739 5.16236 14.2107 3.38236 13.2106 1.85156L12.3778 2.40086Z"
          />
          <path
            class="volume-high"
            d="M15.5981 0.75L14.7478 1.2719C15.7937 2.9919 16.3468 4.9723 16.3468 7C16.3468 9.0277 15.7937 11.0082 14.7478 12.7281L15.5981 13.25C16.7398 11.3722 17.343 9.211 17.343 7C17.343 4.789 16.7398 2.6268 15.5981 0.75Z"
          />
        </g>
        <g class="muted">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.39976 4.98924H1.19937C1.19429 4.98924 1.17777 4.98961 1.15296 5.01609C1.1271 5.04369 1.10174 5.09245 1.10174 5.1607V8.83926C1.10174 8.90761 1.12714 8.95641 1.15299 8.984C1.17779 9.01047 1.1943 9.01084 1.19937 9.01084H4.39977L7 11.6066V2.39357L4.39976 4.98924ZM7.47434 1.92006C7.4743 1.9201 7.47439 1.92002 7.47434 1.92006V1.92006ZM6.76773 12.7877L3.98606 10.0108H1.19937C0.593146 10.0108 0.101743 9.48633 0.101743 8.83926V7.03583L0 6.99998L0.101743 6.96412V5.1607C0.101743 4.51375 0.593146 3.98924 1.19937 3.98924H3.98606L6.76786 1.21233C7.23574 0.745258 8 1.09925 8 1.78301V12.2171C8 12.9007 7.23561 13.2547 6.76773 12.7877Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.2677 9.30323C15.463 9.49849 15.7796 9.49849 15.9749 9.30323C16.1701 9.10796 16.1701 8.79138 15.9749 8.59612L14.2071 6.82841L15.9749 5.06066C16.1702 4.8654 16.1702 4.54882 15.9749 4.35355C15.7796 4.15829 15.4631 4.15829 15.2678 4.35355L13.5 6.1213L11.7322 4.35348C11.537 4.15822 11.2204 4.15822 11.0251 4.35348C10.8298 4.54874 10.8298 4.86532 11.0251 5.06058L12.7929 6.82841L11.0251 8.59619C10.8299 8.79146 10.8299 9.10804 11.0251 9.3033C11.2204 9.49856 11.537 9.49856 11.7323 9.3033L13.5 7.53552L15.2677 9.30323Z"
          />
        </g>
      </svg>
    </media-mute-button>
  </template>

  <template partial="PipButton">
    <media-pip-button part="bottom pip button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="icon">
        <path
          d="M15.9891 0H2.011C0.9004 0 0 0.9003 0 2.0109V11.989C0 13.0996 0.9004 14 2.011 14H15.9891C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.9891 0ZM17 11.9891C17 12.5465 16.5465 13 15.9891 13H2.011C1.4536 13 1.0001 12.5465 1.0001 11.9891V2.0109C1.0001 1.4535 1.4536 0.9999 2.011 0.9999H15.9891C16.5465 0.9999 17 1.4535 17 2.0109V11.9891Z"
        />
        <path
          d="M15.356 5.67822H8.19523C8.03253 5.67822 7.90063 5.81012 7.90063 5.97282V11.3836C7.90063 11.5463 8.03253 11.6782 8.19523 11.6782H15.356C15.5187 11.6782 15.6506 11.5463 15.6506 11.3836V5.97282C15.6506 5.81012 15.5187 5.67822 15.356 5.67822Z"
        />
      </svg>
    </media-pip-button>
  </template>

  <template partial="CaptionsMenu">
    <media-captions-menu-button part="bottom captions button">
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="on">
        <path
          d="M15.989 0H2.011C0.9004 0 0 0.9003 0 2.0109V11.9891C0 13.0997 0.9004 14 2.011 14H15.989C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.989 0ZM4.2292 8.7639C4.5954 9.1902 5.0935 9.4031 5.7233 9.4031C6.1852 9.4031 6.5544 9.301 6.8302 9.0969C7.1061 8.8933 7.2863 8.614 7.3702 8.26H8.4322C8.3062 8.884 8.0093 9.3733 7.5411 9.7273C7.0733 10.0813 6.4703 10.2581 5.732 10.2581C5.108 10.2581 4.5699 10.1219 4.1168 9.8489C3.6637 9.5759 3.3141 9.1946 3.0685 8.7058C2.8224 8.2165 2.6994 7.6511 2.6994 7.009C2.6994 6.3611 2.8224 5.7927 3.0685 5.3034C3.3141 4.8146 3.6637 4.4323 4.1168 4.1559C4.5699 3.88 5.108 3.7418 5.732 3.7418C6.4703 3.7418 7.0733 3.922 7.5411 4.2818C8.0094 4.6422 8.3062 5.1461 8.4322 5.794H7.3702C7.2862 5.4283 7.106 5.1368 6.8302 4.921C6.5544 4.7052 6.1852 4.5968 5.7233 4.5968C5.0934 4.5968 4.5954 4.8116 4.2292 5.2404C3.8635 5.6696 3.6804 6.259 3.6804 7.009C3.6804 7.7531 3.8635 8.3381 4.2292 8.7639ZM11.0974 8.7639C11.4636 9.1902 11.9617 9.4031 12.5915 9.4031C13.0534 9.4031 13.4226 9.301 13.6984 9.0969C13.9743 8.8933 14.1545 8.614 14.2384 8.26H15.3004C15.1744 8.884 14.8775 9.3733 14.4093 9.7273C13.9415 10.0813 13.3385 10.2581 12.6002 10.2581C11.9762 10.2581 11.4381 10.1219 10.985 9.8489C10.5319 9.5759 10.1823 9.1946 9.9367 8.7058C9.6906 8.2165 9.5676 7.6511 9.5676 7.009C9.5676 6.3611 9.6906 5.7927 9.9367 5.3034C10.1823 4.8146 10.5319 4.4323 10.985 4.1559C11.4381 3.88 11.9762 3.7418 12.6002 3.7418C13.3385 3.7418 13.9415 3.922 14.4093 4.2818C14.8776 4.6422 15.1744 5.1461 15.3004 5.794H14.2384C14.1544 5.4283 13.9742 5.1368 13.6984 4.921C13.4226 4.7052 13.0534 4.5968 12.5915 4.5968C11.9616 4.5968 11.4636 4.8116 11.0974 5.2404C10.7317 5.6696 10.5486 6.259 10.5486 7.009C10.5486 7.7531 10.7317 8.3381 11.0974 8.7639Z"
        />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="off">
        <path
          d="M5.73219 10.258C5.10819 10.258 4.57009 10.1218 4.11699 9.8488C3.66389 9.5758 3.31429 9.1945 3.06869 8.7057C2.82259 8.2164 2.69958 7.651 2.69958 7.0089C2.69958 6.361 2.82259 5.7926 3.06869 5.3033C3.31429 4.8145 3.66389 4.4322 4.11699 4.1558C4.57009 3.8799 5.10819 3.7417 5.73219 3.7417C6.47049 3.7417 7.07348 3.9219 7.54128 4.2817C8.00958 4.6421 8.30638 5.146 8.43238 5.7939H7.37039C7.28639 5.4282 7.10618 5.1367 6.83039 4.9209C6.55459 4.7051 6.18538 4.5967 5.72348 4.5967C5.09358 4.5967 4.59559 4.8115 4.22939 5.2403C3.86369 5.6695 3.68058 6.2589 3.68058 7.0089C3.68058 7.753 3.86369 8.338 4.22939 8.7638C4.59559 9.1901 5.09368 9.403 5.72348 9.403C6.18538 9.403 6.55459 9.3009 6.83039 9.0968C7.10629 8.8932 7.28649 8.6139 7.37039 8.2599H8.43238C8.30638 8.8839 8.00948 9.3732 7.54128 9.7272C7.07348 10.0812 6.47049 10.258 5.73219 10.258Z"
        />
        <path
          d="M12.6003 10.258C11.9763 10.258 11.4382 10.1218 10.9851 9.8488C10.532 9.5758 10.1824 9.1945 9.93685 8.7057C9.69075 8.2164 9.56775 7.651 9.56775 7.0089C9.56775 6.361 9.69075 5.7926 9.93685 5.3033C10.1824 4.8145 10.532 4.4322 10.9851 4.1558C11.4382 3.8799 11.9763 3.7417 12.6003 3.7417C13.3386 3.7417 13.9416 3.9219 14.4094 4.2817C14.8777 4.6421 15.1745 5.146 15.3005 5.7939H14.2385C14.1545 5.4282 13.9743 5.1367 13.6985 4.9209C13.4227 4.7051 13.0535 4.5967 12.5916 4.5967C11.9617 4.5967 11.4637 4.8115 11.0975 5.2403C10.7318 5.6695 10.5487 6.2589 10.5487 7.0089C10.5487 7.753 10.7318 8.338 11.0975 8.7638C11.4637 9.1901 11.9618 9.403 12.5916 9.403C13.0535 9.403 13.4227 9.3009 13.6985 9.0968C13.9744 8.8932 14.1546 8.6139 14.2385 8.2599H15.3005C15.1745 8.8839 14.8776 9.3732 14.4094 9.7272C13.9416 10.0812 13.3386 10.258 12.6003 10.258Z"
        />
        <path
          d="M15.9891 1C16.5465 1 17 1.4535 17 2.011V11.9891C17 12.5465 16.5465 13 15.9891 13H2.0109C1.4535 13 1 12.5465 1 11.9891V2.0109C1 1.4535 1.4535 0.9999 2.0109 0.9999L15.9891 1ZM15.9891 0H2.0109C0.9003 0 0 0.9003 0 2.0109V11.9891C0 13.0997 0.9003 14 2.0109 14H15.9891C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.9891 0Z"
        />
      </svg>
    </media-captions-menu-button>
    <media-captions-menu
      hidden
      anchor="auto"
      part="bottom captions menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      exportparts="menu-item"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            display: none;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg></div
    ></media-captions-menu>
  </template>

  <template partial="AirplayButton">
    <media-airplay-button part="bottom airplay button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="icon">
        <path
          d="M16.1383 0H1.8618C0.8335 0 0 0.8335 0 1.8617V10.1382C0 11.1664 0.8335 12 1.8618 12H3.076C3.1204 11.9433 3.1503 11.8785 3.2012 11.826L4.004 11H1.8618C1.3866 11 1 10.6134 1 10.1382V1.8617C1 1.3865 1.3866 0.9999 1.8618 0.9999H16.1383C16.6135 0.9999 17.0001 1.3865 17.0001 1.8617V10.1382C17.0001 10.6134 16.6135 11 16.1383 11H13.9961L14.7989 11.826C14.8499 11.8785 14.8798 11.9432 14.9241 12H16.1383C17.1665 12 18.0001 11.1664 18.0001 10.1382V1.8617C18 0.8335 17.1665 0 16.1383 0Z"
        />
        <path
          d="M9.55061 8.21903C9.39981 8.06383 9.20001 7.98633 9.00011 7.98633C8.80021 7.98633 8.60031 8.06383 8.44951 8.21903L4.09771 12.697C3.62471 13.1838 3.96961 13.9998 4.64831 13.9998H13.3518C14.0304 13.9998 14.3754 13.1838 13.9023 12.697L9.55061 8.21903Z"
        />
      </svg>
    </media-airplay-button>
  </template>

  <template partial="FullscreenButton">
    <media-fullscreen-button part="bottom fullscreen button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="enter">
        <path
          d="M1.00745 4.39539L1.01445 1.98789C1.01605 1.43049 1.47085 0.978289 2.02835 0.979989L6.39375 0.992589L6.39665 -0.007411L2.03125 -0.020011C0.920646 -0.023211 0.0176463 0.874489 0.0144463 1.98509L0.00744629 4.39539H1.00745Z"
        />
        <path
          d="M17.0144 2.03431L17.0076 4.39541H18.0076L18.0144 2.03721C18.0176 0.926712 17.1199 0.0237125 16.0093 0.0205125L11.6439 0.0078125L11.641 1.00781L16.0064 1.02041C16.5638 1.02201 17.016 1.47681 17.0144 2.03431Z"
        />
        <path
          d="M16.9925 9.60498L16.9855 12.0124C16.9839 12.5698 16.5291 13.022 15.9717 13.0204L11.6063 13.0078L11.6034 14.0078L15.9688 14.0204C17.0794 14.0236 17.9823 13.1259 17.9855 12.0153L17.9925 9.60498H16.9925Z"
        />
        <path
          d="M0.985626 11.9661L0.992426 9.60498H-0.0074737L-0.0142737 11.9632C-0.0174737 13.0738 0.880226 13.9767 1.99083 13.98L6.35623 13.9926L6.35913 12.9926L1.99373 12.98C1.43633 12.9784 0.983926 12.5236 0.985626 11.9661Z"
        />
      </svg>
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="exit">
        <path
          d="M5.39655 -0.0200195L5.38955 2.38748C5.38795 2.94488 4.93315 3.39708 4.37565 3.39538L0.0103463 3.38278L0.00744629 4.38278L4.37285 4.39538C5.48345 4.39858 6.38635 3.50088 6.38965 2.39028L6.39665 -0.0200195H5.39655Z"
        />
        <path
          d="M12.6411 2.36891L12.6479 0.0078125H11.6479L11.6411 2.36601C11.6379 3.47651 12.5356 4.37951 13.6462 4.38271L18.0116 4.39531L18.0145 3.39531L13.6491 3.38271C13.0917 3.38111 12.6395 2.92641 12.6411 2.36891Z"
        />
        <path
          d="M12.6034 14.0204L12.6104 11.613C12.612 11.0556 13.0668 10.6034 13.6242 10.605L17.9896 10.6176L17.9925 9.61759L13.6271 9.60499C12.5165 9.60179 11.6136 10.4995 11.6104 11.6101L11.6034 14.0204H12.6034Z"
        />
        <path
          d="M5.359 11.6315L5.3522 13.9926H6.3522L6.359 11.6344C6.3622 10.5238 5.4645 9.62088 4.3539 9.61758L-0.0115043 9.60498L-0.0144043 10.605L4.351 10.6176C4.9084 10.6192 5.3607 11.074 5.359 11.6315Z"
        />
      </svg>
    </media-fullscreen-button>
  </template>

  <template partial="CastButton">
    <media-cast-button part="bottom cast button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="enter">
        <path
          d="M16.0072 0H2.0291C0.9185 0 0.0181 0.9003 0.0181 2.011V5.5009C0.357 5.5016 0.6895 5.5275 1.0181 5.5669V2.011C1.0181 1.4536 1.4716 1 2.029 1H16.0072C16.5646 1 17.0181 1.4536 17.0181 2.011V11.9891C17.0181 12.5465 16.5646 13 16.0072 13H8.4358C8.4746 13.3286 8.4999 13.6611 8.4999 13.9999H16.0071C17.1177 13.9999 18.018 13.0996 18.018 11.989V2.011C18.0181 0.9003 17.1178 0 16.0072 0ZM0 6.4999V7.4999C3.584 7.4999 6.5 10.4159 6.5 13.9999H7.5C7.5 9.8642 4.1357 6.4999 0 6.4999ZM0 8.7499V9.7499C2.3433 9.7499 4.25 11.6566 4.25 13.9999H5.25C5.25 11.1049 2.895 8.7499 0 8.7499ZM0.0181 11V14H3.0181C3.0181 12.3431 1.675 11 0.0181 11Z"
        />
      </svg>
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="exit">
        <path
          d="M15.9891 0H2.01103C0.900434 0 3.35947e-05 0.9003 3.35947e-05 2.011V5.5009C0.338934 5.5016 0.671434 5.5275 1.00003 5.5669V2.011C1.00003 1.4536 1.45353 1 2.01093 1H15.9891C16.5465 1 17 1.4536 17 2.011V11.9891C17 12.5465 16.5465 13 15.9891 13H8.41773C8.45653 13.3286 8.48183 13.6611 8.48183 13.9999H15.989C17.0996 13.9999 17.9999 13.0996 17.9999 11.989V2.011C18 0.9003 17.0997 0 15.9891 0ZM-0.0180664 6.4999V7.4999C3.56593 7.4999 6.48193 10.4159 6.48193 13.9999H7.48193C7.48193 9.8642 4.11763 6.4999 -0.0180664 6.4999ZM-0.0180664 8.7499V9.7499C2.32523 9.7499 4.23193 11.6566 4.23193 13.9999H5.23193C5.23193 11.1049 2.87693 8.7499 -0.0180664 8.7499ZM3.35947e-05 11V14H3.00003C3.00003 12.3431 1.65693 11 3.35947e-05 11Z"
        />
        <path d="M2.15002 5.634C5.18352 6.4207 7.57252 8.8151 8.35282 11.8499H15.8501V2.1499H2.15002V5.634Z" />
      </svg>
    </media-cast-button>
  </template>

  <template partial="LiveButton">
    <media-live-button part="{{section ?? 'top'}} live button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <span slot="text">Live</span>
    </media-live-button>
  </template>

  <template partial="PlaybackRateMenu">
    <media-playback-rate-menu-button part="bottom playback-rate button"></media-playback-rate-menu-button>
    <media-playback-rate-menu
      hidden
      anchor="auto"
      rates="{{playbackrates}}"
      exportparts="menu-item"
      part="bottom playback-rate menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-playback-rate-menu>
  </template>

  <template partial="VolumeRange">
    <media-volume-range
      part="bottom volume range"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-volume-range>
  </template>

  <template partial="TimeDisplay">
    <media-time-display
      remaining="{{defaultshowremainingtime}}"
      showduration="{{!hideduration}}"
      part="bottom time display"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-time-display>
  </template>

  <template partial="TimeRange">
    <media-time-range part="bottom time range" disabled="{{disabled}}" aria-disabled="{{disabled}}" exportparts="thumb">
      <media-preview-thumbnail slot="preview"></media-preview-thumbnail>
      <media-preview-chapter-display slot="preview"></media-preview-chapter-display>
      <media-preview-time-display slot="preview"></media-preview-time-display>
      <div slot="preview" part="arrow"></div>
    </media-time-range>
  </template>

  <template partial="AudioTrackMenu">
    <media-audio-track-menu-button part="bottom audio-track button">
      <svg aria-hidden="true" slot="icon" viewBox="0 0 18 16">
        <path d="M9 15A7 7 0 1 1 9 1a7 7 0 0 1 0 14Zm0 1A8 8 0 1 0 9 0a8 8 0 0 0 0 16Z" />
        <path
          d="M5.2 6.3a.5.5 0 0 1 .5.5v2.4a.5.5 0 1 1-1 0V6.8a.5.5 0 0 1 .5-.5Zm2.4-2.4a.5.5 0 0 1 .5.5v7.2a.5.5 0 0 1-1 0V4.4a.5.5 0 0 1 .5-.5ZM10 5.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.4-.8a.5.5 0 0 1 .5.5v5.6a.5.5 0 0 1-1 0V5.2a.5.5 0 0 1 .5-.5Z"
        />
      </svg>
    </media-audio-track-menu-button>
    <media-audio-track-menu
      hidden
      anchor="auto"
      part="bottom audio-track menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      exportparts="menu-item"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            display: none;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </media-audio-track-menu>
  </template>

  <template partial="RenditionMenu">
    <media-rendition-menu-button part="bottom rendition button">
      <svg aria-hidden="true" slot="icon" viewBox="0 0 18 14">
        <path
          d="M2.25 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM9 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6.75 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        />
      </svg>
    </media-rendition-menu-button>
    <media-rendition-menu
      hidden
      anchor="auto"
      part="bottom rendition menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            opacity: 0;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </media-rendition-menu>
  </template>

  <template partial="MuxBadge">
    <div part="mux-badge">
      <a href="https://www.mux.com/player" target="_blank">
        <span class="mux-badge-text">Powered by</span>
        <div class="mux-badge-logo">
          <svg
            viewBox="0 0 1600 500"
            style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2"
          >
            <g>
              <path
                d="M994.287,93.486c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m0,-93.486c-34.509,-0 -62.484,27.976 -62.484,62.486l0,187.511c0,68.943 -56.09,125.033 -125.032,125.033c-68.942,-0 -125.03,-56.09 -125.03,-125.033l0,-187.511c0,-34.51 -27.976,-62.486 -62.485,-62.486c-34.509,-0 -62.484,27.976 -62.484,62.486l0,187.511c0,137.853 112.149,250.003 249.999,250.003c137.851,-0 250.001,-112.15 250.001,-250.003l0,-187.511c0,-34.51 -27.976,-62.486 -62.485,-62.486"
                style="fill-rule: nonzero"
              ></path>
              <path
                d="M1537.51,468.511c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m-275.883,-218.509l-143.33,143.329c-24.402,24.402 -24.402,63.966 0,88.368c24.402,24.402 63.967,24.402 88.369,-0l143.33,-143.329l143.328,143.329c24.402,24.4 63.967,24.402 88.369,-0c24.403,-24.402 24.403,-63.966 0.001,-88.368l-143.33,-143.329l0.001,-0.004l143.329,-143.329c24.402,-24.402 24.402,-63.965 0,-88.367c-24.402,-24.402 -63.967,-24.402 -88.369,-0l-143.329,143.328l-143.329,-143.328c-24.402,-24.401 -63.967,-24.402 -88.369,-0c-24.402,24.402 -24.402,63.965 0,88.367l143.329,143.329l0,0.004Z"
                style="fill-rule: nonzero"
              ></path>
              <path
                d="M437.511,468.521c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m23.915,-463.762c-23.348,-9.672 -50.226,-4.327 -68.096,13.544l-143.331,143.329l-143.33,-143.329c-17.871,-17.871 -44.747,-23.216 -68.096,-13.544c-23.349,9.671 -38.574,32.455 -38.574,57.729l0,375.026c0,34.51 27.977,62.486 62.487,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-224.173l80.843,80.844c24.404,24.402 63.965,24.402 88.369,-0l80.843,-80.844l0,224.173c0,34.51 27.976,62.486 62.486,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-375.026c0,-25.274 -15.224,-48.058 -38.573,-57.729"
                style="fill-rule: nonzero"
              ></path>
            </g>
          </svg>
        </div>
      </a>
    </div>
  </template>

  <media-controller
    part="controller"
    defaultstreamtype="{{defaultstreamtype ?? 'on-demand'}}"
    breakpoints="sm:470"
    gesturesdisabled="{{disabled}}"
    hotkeys="{{hotkeys}}"
    nohotkeys="{{nohotkeys}}"
    novolumepref="{{novolumepref}}"
    audio="{{audio}}"
    noautoseektolive="{{noautoseektolive}}"
    defaultsubtitles="{{defaultsubtitles}}"
    defaultduration="{{defaultduration ?? false}}"
    keyboardforwardseekoffset="{{forwardseekoffset}}"
    keyboardbackwardseekoffset="{{backwardseekoffset}}"
    exportparts="layer, media-layer, poster-layer, vertical-layer, centered-layer, gesture-layer"
    style="--_pre-playback-place:{{preplaybackplace ?? 'center'}}"
  >
    <slot name="media" slot="media"></slot>
    <slot name="poster" slot="poster"></slot>

    <media-loading-indicator slot="centered-chrome" noautohide></media-loading-indicator>

    <template if="!audio">
      <media-error-dialog slot="dialog" noautohide></media-error-dialog>
      <!-- Pre-playback UI -->
      <!-- same for both on-demand and live -->
      <div slot="centered-chrome" class="center-controls pre-playback">
        <template if="!breakpointsm">{{>PlayButton section="center"}}</template>
        <template if="breakpointsm">{{>PrePlayButton section="center"}}</template>
      </div>

      <!-- Mux Badge -->
      <template if="proudlydisplaymuxbadge"> {{>MuxBadge}} </template>

      <!-- Autoplay centered unmute button -->
      <!--
        todo: figure out how show this with available state variables
        needs to show when:
        - autoplay is enabled
        - playback has been successful
        - audio is muted
        - in place / instead of the pre-plaback play button
        - not to show again after user has interacted with this button
          - OR user has interacted with the mute button in the control bar
      -->
      <!--
        There should be a >MuteButton to the left of the "Unmute" text, but a templating bug
        makes it appear even if commented out in the markup, add it back when code is un-commented
      -->
      <!-- <div slot="centered-chrome" class="autoplay-unmute">
        <div role="button" class="autoplay-unmute-btn">Unmute</div>
      </div> -->

      <template if="streamtype == 'on-demand'">
        <template if="breakpointsm">
          <media-control-bar part="control-bar top" slot="top-chrome">{{>TitleDisplay}} </media-control-bar>
        </template>
        {{>TimeRange}}
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}} {{>SeekBackwardButton}} {{>SeekForwardButton}} {{>TimeDisplay}} {{>MuteButton}}
          {{>VolumeRange}}
          <div class="spacer"></div>
          {{>RenditionMenu}} {{>PlaybackRateMenu}} {{>AudioTrackMenu}} {{>CaptionsMenu}} {{>AirplayButton}}
          {{>CastButton}} {{>PipButton}} {{>FullscreenButton}}
        </media-control-bar>
      </template>

      <template if="streamtype == 'live'">
        <media-control-bar part="control-bar top" slot="top-chrome">
          {{>LiveButton}}
          <template if="breakpointsm"> {{>TitleDisplay}} </template>
        </media-control-bar>
        <template if="targetlivewindow > 0">{{>TimeRange}}</template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}}
          <template if="targetlivewindow > 0">{{>SeekBackwardButton}} {{>SeekForwardButton}}</template>
          {{>MuteButton}} {{>VolumeRange}}
          <div class="spacer"></div>
          {{>RenditionMenu}} {{>AudioTrackMenu}} {{>CaptionsMenu}} {{>AirplayButton}} {{>CastButton}} {{>PipButton}}
          {{>FullscreenButton}}
        </media-control-bar>
      </template>
    </template>

    <template if="audio">
      <template if="streamtype == 'on-demand'">
        <template if="title">
          <media-control-bar part="control-bar top">{{>TitleDisplay}}</media-control-bar>
        </template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}}
          <template if="breakpointsm"> {{>SeekBackwardButton}} {{>SeekForwardButton}} </template>
          {{>MuteButton}}
          <template if="breakpointsm">{{>VolumeRange}}</template>
          {{>TimeDisplay}} {{>TimeRange}}
          <template if="breakpointsm">{{>PlaybackRateMenu}}</template>
          {{>AirplayButton}} {{>CastButton}}
        </media-control-bar>
      </template>

      <template if="streamtype == 'live'">
        <template if="title">
          <media-control-bar part="control-bar top">{{>TitleDisplay}}</media-control-bar>
        </template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}} {{>LiveButton section="bottom"}} {{>MuteButton}}
          <template if="breakpointsm">
            {{>VolumeRange}}
            <template if="targetlivewindow > 0"> {{>SeekBackwardButton}} {{>SeekForwardButton}} </template>
          </template>
          <template if="targetlivewindow > 0"> {{>TimeDisplay}} {{>TimeRange}} </template>
          <template if="!targetlivewindow"><div class="spacer"></div></template>
          {{>AirplayButton}} {{>CastButton}}
        </media-control-bar>
      </template>
    </template>

    <slot></slot>
  </media-controller>
</template>
`,ii=class{addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}};if(typeof DocumentFragment=="undefined"){class e extends ii{}globalThis.DocumentFragment=e}var Ji=class extends ii{},er=class extends ii{},tr={get(e){},define(e,t,i){},getName(e){return null},upgrade(e){},whenDefined(e){return Promise.resolve(Ji)}},_t,ir=class{constructor(e,t={}){Xn(this,_t),Jn(this,_t,t==null?void 0:t.detail)}get detail(){return Qn(this,_t)}initCustomEvent(){}};_t=new WeakMap;function ar(e,t){return new Ji}var Ja={document:{createElement:ar},DocumentFragment,customElements:tr,CustomEvent:ir,EventTarget:ii,HTMLElement:Ji,HTMLVideoElement:er},ja=typeof window=="undefined"||typeof globalThis.customElements=="undefined",wa=ja?Ja:globalThis,nr=ja?Ja.document:globalThis.document,We={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_LOOP_REQUEST:"medialooprequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},J={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},rr={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_LOOP:"mediaLoop",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_LANG:"mediaLang",MEDIA_WIDTH:"mediaWidth"},en=Object.entries(rr),l=en.reduce((e,[t,i])=>(e[t]=i.toLowerCase(),e),{}),or={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},$t=en.reduce((e,[t,i])=>(e[t]=i.toLowerCase(),e),Ke({},or)),To=Object.entries($t).reduce((e,[t,i])=>{let a=l[t];return a&&(e[i]=a),e},{userinactivechange:"userinactive"}),Ao=Object.entries(l).reduce((e,[t,i])=>{let a=$t[t];return a&&(e[i]=a),e},{userinactive:"userinactivechange"}),xa={SUBTITLES:"subtitles",CAPTIONS:"captions",DESCRIPTIONS:"descriptions",CHAPTERS:"chapters",METADATA:"metadata"},tn=class{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}},an=class extends tn{},Ma=class extends an{constructor(){super(...arguments),this.role=null}},sr=class{observe(){}unobserve(){}disconnect(){}},nn={createElement:function(){return new st.HTMLElement},createElementNS:function(){return new st.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(e){return!1}},st={ResizeObserver:sr,document:nn,Node:an,Element:Ma,HTMLElement:class extends Ma{constructor(){super(...arguments),this.innerHTML=""}get content(){return new st.DocumentFragment}},DocumentFragment:class extends tn{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(e){return null},setItem(e,t){},removeItem(e){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return""}},matchMedia(e){return{matches:!1,media:e}},DOMParser:class{parseFromString(t,i){return{body:{textContent:t}}}}},rn="global"in globalThis&&(globalThis==null?void 0:globalThis.global)===globalThis||typeof window=="undefined"||typeof window.customElements=="undefined",on=Object.keys(st).every(e=>e in globalThis),d=rn&&!on?st:globalThis,lt=rn&&!on?nn:globalThis.document,sn=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},u=(e,t,i)=>(sn(e,t,"read from private field"),i?i.call(e):t.get(e)),B=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},V=(e,t,i,a)=>(sn(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),_e,yt,re,Xe,G,K,z,oe,ye,Tt,M,Sa=1,La=0,lr=1,dr={processCallback(e,t,i){if(i){for(let[a,n]of t)if(a in i){let r=i[a];typeof r=="boolean"&&n instanceof ue&&typeof n.element[n.attributeName]=="boolean"?n.booleanValue=r:typeof r=="function"&&n instanceof ue?n.element[n.attributeName]=r:n.value=r}}}},ji=class extends d.DocumentFragment{constructor(e,t,i=dr){var a;super(),B(this,_e,void 0),B(this,yt,void 0),this.append(e.content.cloneNode(!0)),V(this,_e,ln(this)),V(this,yt,i),(a=i.createCallback)==null||a.call(i,this,u(this,_e),t),i.processCallback(this,u(this,_e),t)}update(e){u(this,yt).processCallback(this,u(this,_e),e)}};_e=new WeakMap;yt=new WeakMap;var ln=(e,t=[])=>{let i,a;for(let n of e.attributes||[])if(n.value.includes("{{")){let r=new ur;for([i,a]of Ra(n.value))if(!i)r.append(a);else{let o=new ue(e,n.name,n.namespaceURI);r.append(o),t.push([a,o])}n.value=r.toString()}for(let n of e.childNodes)if(n.nodeType===Sa&&!(n instanceof HTMLTemplateElement))ln(n,t);else{let r=n.data;if(n.nodeType===Sa||r.includes("{{")){let o=[];if(r)for([i,a]of Ra(r))if(!i)o.push(new Text(a));else{let s=new un(e);o.push(s),t.push([a,s])}else if(n instanceof HTMLTemplateElement){let s=new hn(e,n);o.push(s),t.push([s.expression,s])}n.replaceWith(...o.flatMap(s=>s.replacementNodes||[s]))}}return t},Ia={},Ra=e=>{let t="",i=0,a=Ia[e],n=0,r;if(a)return a;for(a=[];r=e[n];n++)r==="{"&&e[n+1]==="{"&&e[n-1]!=="\\"&&e[n+2]&&++i==1?(t&&a.push([La,t]),t="",n++):r==="}"&&e[n+1]==="}"&&e[n-1]!=="\\"&&!--i?(a.push([lr,t.trim()]),t="",n++):t+=r||"";return t&&a.push([La,(i>0?"{{":"")+t]),Ia[e]=a},cr=11,dn=class{get value(){return""}set value(e){}toString(){return this.value}},cn=new WeakMap,ur=class{constructor(){B(this,re,[])}[Symbol.iterator](){return u(this,re).values()}get length(){return u(this,re).length}item(e){return u(this,re)[e]}append(...e){for(let t of e)t instanceof ue&&cn.set(t,this),u(this,re).push(t)}toString(){return u(this,re).join("")}};re=new WeakMap;var ue=class extends dn{constructor(e,t,i){super(),B(this,oe),B(this,Xe,""),B(this,G,void 0),B(this,K,void 0),B(this,z,void 0),V(this,G,e),V(this,K,t),V(this,z,i)}get attributeName(){return u(this,K)}get attributeNamespace(){return u(this,z)}get element(){return u(this,G)}get value(){return u(this,Xe)}set value(e){u(this,Xe)!==e&&(V(this,Xe,e),!u(this,oe,ye)||u(this,oe,ye).length===1?e==null?u(this,G).removeAttributeNS(u(this,z),u(this,K)):u(this,G).setAttributeNS(u(this,z),u(this,K),e):u(this,G).setAttributeNS(u(this,z),u(this,K),u(this,oe,ye).toString()))}get booleanValue(){return u(this,G).hasAttributeNS(u(this,z),u(this,K))}set booleanValue(e){if(!u(this,oe,ye)||u(this,oe,ye).length===1)this.value=e?"":null;else throw new DOMException("Value is not fully templatized")}};Xe=new WeakMap;G=new WeakMap;K=new WeakMap;z=new WeakMap;oe=new WeakSet;ye=function(){return cn.get(this)};var un=class extends dn{constructor(e,t){super(),B(this,Tt,void 0),B(this,M,void 0),V(this,Tt,e),V(this,M,t?[...t]:[new Text])}get replacementNodes(){return u(this,M)}get parentNode(){return u(this,Tt)}get nextSibling(){return u(this,M)[u(this,M).length-1].nextSibling}get previousSibling(){return u(this,M)[0].previousSibling}get value(){return u(this,M).map(e=>e.textContent).join("")}set value(e){this.replace(e)}replace(...e){let t=e.flat().flatMap(i=>i==null?[new Text]:i.forEach?[...i]:i.nodeType===cr?[...i.childNodes]:i.nodeType?[i]:[new Text(i)]);t.length||t.push(new Text),V(this,M,hr(u(this,M)[0].parentNode,u(this,M),t,this.nextSibling))}};Tt=new WeakMap;M=new WeakMap;var hn=class extends un{constructor(e,t){let i=t.getAttribute("directive")||t.getAttribute("type"),a=t.getAttribute("expression")||t.getAttribute(i)||"";a.startsWith("{{")&&(a=a.trim().slice(2,-2).trim()),super(e),this.expression=a,this.template=t,this.directive=i}};function hr(e,t,i,a=null){let n=0,r,o,s,m=i.length,c=t.length;for(;n<m&&n<c&&t[n]==i[n];)n++;for(;n<m&&n<c&&i[m-1]==t[c-1];)a=i[--c,--m];if(n==c)for(;n<m;)e.insertBefore(i[n++],a);if(n==m)for(;n<c;)e.removeChild(t[n++]);else{for(r=t[n];n<m;)s=i[n++],o=r?r.nextSibling:a,r==s?r=o:n<m&&i[n]==o?(e.replaceChild(s,r),r=o):e.insertBefore(s,r);for(;r!=a;)o=r.nextSibling,e.removeChild(r),r=o}return i}function mr(e){return e==null?void 0:e.split(/\s+/).map(pr)}function pr(e){if(e){let[t,i,a]=e.split(":");return{id:t,width:+i,height:+a}}}function vr(e){return e==null?void 0:e.split(/\s+/).map(fr)}function fr(e){if(e){let[t,i,a,n]=e.split(":");return{id:t,kind:i,language:a,label:n}}}function br(e){return e.replace(/[-_]([a-z])/g,(t,i)=>i.toUpperCase())}function mn(e){return typeof e!="string"?!1:!isNaN(e)&&!isNaN(parseFloat(e))}var Da={string:e=>String(e)},pn=class{constructor(e){this.template=e,this.state=void 0}},le=new WeakMap,de=new WeakMap,ki={partial:(e,t)=>{t[e.expression]=new pn(e.template)},if:(e,t)=>{var i;if(vn(e.expression,t))if(le.get(e)!==e.template){le.set(e,e.template);let a=new ji(e.template,t,ea);e.replace(a),de.set(e,a)}else(i=de.get(e))==null||i.update(t);else e.replace(""),le.delete(e),de.delete(e)}},gr=Object.keys(ki),ea={processCallback(e,t,i){var a,n;if(i)for(let[r,o]of t){if(o instanceof hn){if(!o.directive){let m=gr.find(c=>o.template.hasAttribute(c));m&&(o.directive=m,o.expression=o.template.getAttribute(m))}(a=ki[o.directive])==null||a.call(ki,o,i);continue}let s=vn(r,i);if(s instanceof pn){le.get(o)!==s.template?(le.set(o,s.template),s=new ji(s.template,s.state,ea),o.value=s,de.set(o,s)):(n=de.get(o))==null||n.update(s.state);continue}s?(o instanceof ue&&o.attributeName.startsWith("aria-")&&(s=String(s)),o instanceof ue?typeof s=="boolean"?o.booleanValue=s:typeof s=="function"?o.element[o.attributeName]=s:o.value=s:(o.value=s,le.delete(o),de.delete(o))):o instanceof ue?o.value=void 0:(o.value=void 0,le.delete(o),de.delete(o))}}},Ha={"!":e=>!e,"!!":e=>!!e,"==":(e,t)=>e==t,"!=":(e,t)=>e!=t,">":(e,t)=>e>t,">=":(e,t)=>e>=t,"<":(e,t)=>e<t,"<=":(e,t)=>e<=t,"??":(e,t)=>e!=null?e:t,"|":(e,t)=>{var i;return(i=Da[t])==null?void 0:i.call(Da,e)}};function Er(e){return kr(e,{boolean:/true|false/,number:/-?\d+\.?\d*/,string:/(["'])((?:\\.|[^\\])*?)\1/,operator:/[!=><][=!]?|\?\?|\|/,ws:/\s+/,param:/[$a-z_][$\w]*/i}).filter(({type:t})=>t!=="ws")}function vn(e,t={}){var i,a,n,r,o,s,m;let c=Er(e);if(c.length===0||c.some(({type:E})=>!E))return ze(e);if(((i=c[0])==null?void 0:i.token)===">"){let E=t[(a=c[1])==null?void 0:a.token];if(!E)return ze(e);let _=Ke({},t);E.state=_;let T=c.slice(2);for(let S=0;S<T.length;S+=3){let Ge=(n=T[S])==null?void 0:n.token,mt=(r=T[S+1])==null?void 0:r.token,Yn=(o=T[S+2])==null?void 0:o.token;Ge&&mt==="="&&(_[Ge]=Fe(Yn,t))}return E}if(c.length===1)return pt(c[0])?Fe(c[0].token,t):ze(e);if(c.length===2){let E=(s=c[0])==null?void 0:s.token,_=Ha[E];if(!_||!pt(c[1]))return ze(e);let T=Fe(c[1].token,t);return _(T)}if(c.length===3){let E=(m=c[1])==null?void 0:m.token,_=Ha[E];if(!_||!pt(c[0])||!pt(c[2]))return ze(e);let T=Fe(c[0].token,t);if(E==="|")return _(T,c[2].token);let S=Fe(c[2].token,t);return _(T,S)}}function ze(e){return console.warn(`Warning: invalid expression \`${e}\``),!1}function pt({type:e}){return["number","boolean","string","param"].includes(e)}function Fe(e,t){let i=e[0],a=e.slice(-1);return e==="true"||e==="false"?e==="true":i===a&&["'",'"'].includes(i)?e.slice(1,-1):mn(e)?parseFloat(e):t[e]}function kr(e,t){let i,a,n,r=[];for(;e;){n=null,i=e.length;for(let o in t)a=t[o].exec(e),a&&a.index<i&&(n={token:a[0],type:o,matches:a.slice(1)},i=a.index);i&&r.push({token:e.substr(0,i),type:void 0}),n&&r.push(n),e=e.substr(i+(n?n.token.length:0))}return r}var ta=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},F=(e,t,i)=>(ta(e,t,"read from private field"),i?i.call(e):t.get(e)),ae=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},W=(e,t,i,a)=>(ta(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),hi=(e,t,i)=>(ta(e,t,"access private method"),i),Be,At,Oe,Te,_i,fn,Ct,yi,Je,mi={mediatargetlivewindow:"targetlivewindow",mediastreamtype:"streamtype"},bn=lt.createElement("template");bn.innerHTML=`
  <style>
    :host {
      display: inline-block;
      line-height: 0;
    }

    media-controller {
      width: 100%;
      height: 100%;
    }

    media-captions-button:not([mediasubtitleslist]),
    media-captions-menu:not([mediasubtitleslist]),
    media-captions-menu-button:not([mediasubtitleslist]),
    media-audio-track-menu[mediaaudiotrackunavailable],
    media-audio-track-menu-button[mediaaudiotrackunavailable],
    media-rendition-menu[mediarenditionunavailable],
    media-rendition-menu-button[mediarenditionunavailable],
    media-volume-range[mediavolumeunavailable],
    media-airplay-button[mediaairplayunavailable],
    media-fullscreen-button[mediafullscreenunavailable],
    media-cast-button[mediacastunavailable],
    media-pip-button[mediapipunavailable] {
      display: none;
    }
  </style>
`;var ai=class extends d.HTMLElement{constructor(){super(),ae(this,_i),ae(this,Ct),ae(this,Be,void 0),ae(this,At,void 0),ae(this,Oe,void 0),ae(this,Te,void 0),ae(this,Je,void 0),this.shadowRoot?this.renderRoot=this.shadowRoot:(this.renderRoot=this.attachShadow({mode:"open"}),this.createRenderer()),W(this,Te,new MutationObserver(e=>{var t;this.mediaController&&!((t=this.mediaController)!=null&&t.breakpointsComputed)||e.some(i=>{let a=i.target;return a===this?!0:a.localName!=="media-controller"?!1:!!(mi[i.attributeName]||i.attributeName.startsWith("breakpoint"))})&&this.render()})),W(this,Je,this.render.bind(this)),hi(this,_i,fn).call(this,"template")}get mediaController(){return this.renderRoot.querySelector("media-controller")}get template(){var e;return(e=F(this,Be))!=null?e:this.constructor.template}set template(e){if(e===null){this.removeAttribute("template");return}typeof e=="string"?this.setAttribute("template",e):e instanceof HTMLTemplateElement&&(W(this,Be,e),W(this,Oe,null),this.createRenderer())}get props(){var e,t,i;let a=[...Array.from((t=(e=this.mediaController)==null?void 0:e.attributes)!=null?t:[]).filter(({name:r})=>mi[r]||r.startsWith("breakpoint")),...Array.from(this.attributes)],n={};for(let r of a){let o=(i=mi[r.name])!=null?i:br(r.name),{value:s}=r;s!=null?(mn(s)&&(s=parseFloat(s)),n[o]=s===""?!0:s):n[o]=!1}return n}attributeChangedCallback(e,t,i){e==="template"&&t!=i&&hi(this,Ct,yi).call(this)}connectedCallback(){this.addEventListener($t.BREAKPOINTS_COMPUTED,F(this,Je)),F(this,Te).observe(this,{attributes:!0}),F(this,Te).observe(this.renderRoot,{attributes:!0,subtree:!0}),hi(this,Ct,yi).call(this)}disconnectedCallback(){this.removeEventListener($t.BREAKPOINTS_COMPUTED,F(this,Je)),F(this,Te).disconnect()}createRenderer(){this.template instanceof HTMLTemplateElement&&this.template!==F(this,At)&&(W(this,At,this.template),this.renderer=new ji(this.template,this.props,this.constructor.processor),this.renderRoot.textContent="",this.renderRoot.append(bn.content.cloneNode(!0),this.renderer))}render(){var e;(e=this.renderer)==null||e.update(this.props)}};Be=new WeakMap;At=new WeakMap;Oe=new WeakMap;Te=new WeakMap;_i=new WeakSet;fn=function(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}};Ct=new WeakSet;yi=function(){var e;let t=this.getAttribute("template");if(!t||t===F(this,Oe))return;let i=this.getRootNode(),a=(e=i==null?void 0:i.getElementById)==null?void 0:e.call(i,t);if(a){W(this,Oe,t),W(this,Be,a),this.createRenderer();return}_r(t)&&(W(this,Oe,t),yr(t).then(n=>{let r=lt.createElement("template");r.innerHTML=n,W(this,Be,r),this.createRenderer()}).catch(console.error))};Je=new WeakMap;ai.observedAttributes=["template"];ai.processor=ea;function _r(e){if(!/^(\/|\.\/|https?:\/\/)/.test(e))return!1;let t=/^https?:\/\//.test(e)?void 0:location.origin;try{new URL(e,t)}catch(i){return!1}return!0}async function yr(e){let t=await fetch(e);if(t.status!==200)throw new Error(`Failed to load resource: the server responded with a status of ${t.status}`);return t.text()}d.customElements.get("media-theme")||d.customElements.define("media-theme",ai);function Tr({anchor:e,floating:t,placement:i}){let a=Ar({anchor:e,floating:t}),{x:n,y:r}=wr(a,i);return{x:n,y:r}}function Ar({anchor:e,floating:t}){return{anchor:Cr(e,t.offsetParent),floating:{x:0,y:0,width:t.offsetWidth,height:t.offsetHeight}}}function Cr(e,t){var i;let a=e.getBoundingClientRect(),n=(i=t==null?void 0:t.getBoundingClientRect())!=null?i:{x:0,y:0};return{x:a.x-n.x,y:a.y-n.y,width:a.width,height:a.height}}function wr({anchor:e,floating:t},i){let a=xr(i)==="x"?"y":"x",n=a==="y"?"height":"width",r=gn(i),o=e.x+e.width/2-t.width/2,s=e.y+e.height/2-t.height/2,m=e[n]/2-t[n]/2,c;switch(r){case"top":c={x:o,y:e.y-t.height};break;case"bottom":c={x:o,y:e.y+e.height};break;case"right":c={x:e.x+e.width,y:s};break;case"left":c={x:e.x-t.width,y:s};break;default:c={x:e.x,y:e.y}}switch(i.split("-")[1]){case"start":c[a]-=m;break;case"end":c[a]+=m;break}return c}function gn(e){return e.split("-")[0]}function xr(e){return["top","bottom"].includes(gn(e))?"y":"x"}var Ba=new WeakMap,ia=e=>{let t=Ba.get(e);return t||Ba.set(e,t=new Set),t},En=new d.ResizeObserver(e=>{for(let t of e)for(let i of ia(t.target))i(t)});function Zt(e,t){ia(e).add(t),En.observe(e)}function qt(e,t){let i=ia(e);i.delete(t),i.size||En.unobserve(e)}var aa=class extends Event{constructor(a){var n=a,{action:e="auto",relatedTarget:t}=n,i=ui(n,["action","relatedTarget"]);super("invoke",i),this.action=e,this.relatedTarget=t}},Mr=class extends Event{constructor(a){var n=a,{newState:e,oldState:t}=n,i=ui(n,["newState","oldState"]);super("toggle",i),this.newState=e,this.oldState=t}};function ni(e){let t={};for(let i of e)t[i.name]=i.value;return t}function y(e){var t;return(t=Ti(e))!=null?t:oi(e,"media-controller")}function Ti(e){var t;let{MEDIA_CONTROLLER:i}=J,a=e.getAttribute(i);if(a)return(t=si(e))==null?void 0:t.getElementById(a)}var ri=(e,t)=>!e||!t?!1:e!=null&&e.contains(t)?!0:ri(e,t.getRootNode().host),oi=(e,t)=>{if(!e)return null;let i=e.closest(t);return i||oi(e.getRootNode().host,t)};function kn(e=document){var t;let i=e==null?void 0:e.activeElement;return i?(t=kn(i.shadowRoot))!=null?t:i:null}function si(e){var t;let i=(t=e==null?void 0:e.getRootNode)==null?void 0:t.call(e);return i instanceof ShadowRoot||i instanceof Document?i:null}function Sr(e,{depth:t=3,checkOpacity:i=!0,checkVisibilityCSS:a=!0}={}){if(e.checkVisibility)return e.checkVisibility({checkOpacity:i,checkVisibilityCSS:a});let n=e;for(;n&&t>0;){let r=getComputedStyle(n);if(i&&r.opacity==="0"||a&&r.visibility==="hidden"||r.display==="none")return!1;n=n.parentElement,t--}return!0}function Lr(e,t){let i=Ir(e,a=>a===t);return i||_n(e,t)}function Ir(e,t){var i,a;let n;for(n of(i=e.querySelectorAll("style:not([media])"))!=null?i:[]){let r;try{r=(a=n.sheet)==null?void 0:a.cssRules}catch(o){continue}for(let o of r!=null?r:[])if(t(o.selectorText))return o}}function _n(e,t){var i,a;let n=(i=e.querySelectorAll("style:not([media])"))!=null?i:[],r=n==null?void 0:n[n.length-1];if(!(r!=null&&r.sheet))return console.warn("Media Chrome: No style sheet found on style tag of",e),{style:{setProperty:()=>{},removeProperty:()=>"",getPropertyValue:()=>""}};let o=r==null?void 0:r.sheet.insertRule(`${t}{}`,r.sheet.cssRules.length);return(a=r.sheet.cssRules)==null?void 0:a[o]}function pe(e,t,i=Number.NaN){let a=e.getAttribute(t);return a!=null?+a:i}function Ve(e,t,i){let a=+i;if(i==null||Number.isNaN(a)){e.hasAttribute(t)&&e.removeAttribute(t);return}pe(e,t,void 0)!==a&&e.setAttribute(t,`${a}`)}function Ai(e,t){return e.hasAttribute(t)}function Oa(e,t,i){if(i==null){e.hasAttribute(t)&&e.removeAttribute(t);return}Ai(e,t)!=i&&e.toggleAttribute(t,i)}function Z(e,t,i=null){var a;return(a=e.getAttribute(t))!=null?a:i}function te(e,t,i){if(i==null){e.hasAttribute(t)&&e.removeAttribute(t);return}let a=`${i}`;Z(e,t,void 0)!==a&&e.setAttribute(t,a)}var na=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},h=(e,t,i)=>(na(e,t,"read from private field"),i?i.call(e):t.get(e)),p=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},C=(e,t,i,a)=>(na(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),v=(e,t,i)=>(na(e,t,"access private method"),i),I,ee,$,wt,je,he,dt,Ci,yn,Gt,ra,Kt,xt,wi,xi,Tn,Mi,An,Si,Cn,Pe,Ne,Ue,ct,zt,oa,Li,wn,sa,xn,Ii,Mn,la,Sn,Ri,Ln,Di,In,nt,Ft,Hi,Rn,rt,Yt,Mt,Bi;function $e({type:e,text:t,value:i,checked:a}){let n=lt.createElement("media-chrome-menu-item");n.type=e!=null?e:"",n.part.add("menu-item"),e&&n.part.add(e),n.value=i,n.checked=a;let r=lt.createElement("span");return r.textContent=t,n.append(r),n}function me(e,t){let i=e.querySelector(`:scope > [slot="${t}"]`);if((i==null?void 0:i.nodeName)=="SLOT"&&(i=i.assignedElements({flatten:!0})[0]),i)return i=i.cloneNode(!0),i;let a=e.shadowRoot.querySelector(`[name="${t}"] > svg`);return a?a.cloneNode(!0):""}function Rr(e){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-menu-background, var(--media-control-background, var(--media-secondary-color, var(--_menu-bg))));
        border-radius: var(--media-menu-border-radius);
        border: var(--media-menu-border, none);
        display: var(--media-menu-display, inline-flex) !important;

        transition: var(--media-menu-transition-in,
          visibility 0s,
          opacity .2s ease-out,
          transform .15s ease-out,
          left .2s ease-in-out,
          min-width .2s ease-in-out,
          min-height .2s ease-in-out
        ) !important;

        visibility: var(--media-menu-visibility, visible);
        opacity: var(--media-menu-opacity, 1);
        max-height: var(--media-menu-max-height, var(--_menu-max-height, 300px));
        transform: var(--media-menu-transform-in, translateY(0) scale(1));
        flex-direction: column;

        min-height: 0;
        position: relative;
        bottom: var(--_menu-bottom);
        box-sizing: border-box;
      }

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([hidden]) {
        transition: var(--media-menu-transition-out,
          visibility .15s ease-in,
          opacity .15s ease-in,
          transform .15s ease-in
        ) !important;
        visibility: var(--media-menu-hidden-visibility, hidden);
        opacity: var(--media-menu-hidden-opacity, 0);
        max-height: var(--media-menu-hidden-max-height,
          var(--media-menu-max-height, var(--_menu-max-height, 300px)));
        transform: var(--media-menu-transform-out, translateY(2px) scale(.99));
        pointer-events: none;
      }

      :host([slot="submenu"]) {
        background: none;
        width: 100%;
        min-height: 100%;
        position: absolute;
        bottom: 0;
        right: -100%;
      }

      #container {
        display: flex;
        flex-direction: column;
        min-height: 0;
        transition: transform .2s ease-out;
        transform: translate(0, 0);
      }

      #container.has-expanded {
        transition: transform .2s ease-in;
        transform: translate(-100%, 0);
      }

      button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        outline: inherit;
        display: inline-flex;
        align-items: center;
      }

      slot[name="header"][hidden] {
        display: none;
      }

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .7em;
        border-bottom: 1px solid rgb(255 255 255 / .25);
        cursor: var(--media-cursor, default);
      }

      slot[name="header"] > button[part~="back"],
      slot[name="header"]::slotted(button[part~="back"]) {
        cursor: var(--media-cursor, pointer);
      }

      svg[part~="back"] {
        height: var(--media-menu-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
        margin-right: .5ch;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap);
        flex-direction: var(--media-menu-flex-direction, column);
        overflow: var(--media-menu-overflow, hidden auto);
        display: flex;
        min-height: 0;
      }

      :host([role="menu"]) slot:not([name]) {
        padding-block: .4em;
      }

      slot:not([name])::slotted([role="menu"]) {
        background: none;
      }

      media-chrome-menu-item > span {
        margin-right: .5ch;
        max-width: var(--media-menu-item-max-width);
        text-overflow: ellipsis;
        overflow: hidden;
      }
    </style>
    <style id="layout-row" media="width:0">

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .5em;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap, .25em);
        flex-direction: var(--media-menu-flex-direction, row);
        padding-inline: .5em;
      }

      media-chrome-menu-item {
        padding: .3em .5em;
      }

      media-chrome-menu-item[aria-checked="true"] {
        background: var(--media-menu-item-checked-background, rgb(255 255 255 / .2));
      }


      media-chrome-menu-item::part(checked-indicator) {
        display: var(--media-menu-item-checked-indicator-display, none);
      }
    </style>
    <div id="container" part="container">
      <slot name="header" hidden>
        <button part="back button" aria-label="Back to previous menu">
          <slot name="back-icon">
            <svg aria-hidden="true" viewBox="0 0 20 24" part="back indicator">
              <path d="m11.88 17.585.742-.669-4.2-4.665 4.2-4.666-.743-.669-4.803 5.335 4.803 5.334Z"/>
            </svg>
          </slot>
          <slot name="title"></slot>
        </button>
      </slot>
      <slot></slot>
    </div>
    <slot name="checked-indicator" hidden></slot>
  `}var ne={STYLE:"style",HIDDEN:"hidden",DISABLED:"disabled",ANCHOR:"anchor"},x=class extends d.HTMLElement{constructor(){if(super(),p(this,Ci),p(this,Gt),p(this,xt),p(this,xi),p(this,Mi),p(this,Si),p(this,Ue),p(this,zt),p(this,Li),p(this,sa),p(this,Ii),p(this,la),p(this,Ri),p(this,Di),p(this,nt),p(this,Hi),p(this,rt),p(this,Mt),p(this,I,null),p(this,ee,null),p(this,$,null),p(this,wt,new Set),p(this,je,void 0),p(this,he,!1),p(this,dt,null),p(this,Kt,()=>{let e=h(this,wt),t=new Set(this.items);for(let i of e)t.has(i)||this.dispatchEvent(new CustomEvent("removemenuitem",{detail:i}));for(let i of t)e.has(i)||this.dispatchEvent(new CustomEvent("addmenuitem",{detail:i}));C(this,wt,t)}),p(this,Pe,()=>{v(this,Ue,ct).call(this),v(this,zt,oa).call(this,!1)}),p(this,Ne,()=>{v(this,Ue,ct).call(this)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=ni(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.container=this.shadowRoot.querySelector("#container"),this.defaultSlot=this.shadowRoot.querySelector("slot:not([name])"),C(this,je,new MutationObserver(h(this,Kt)))}static get observedAttributes(){return[ne.DISABLED,ne.HIDDEN,ne.STYLE,ne.ANCHOR,J.MEDIA_CONTROLLER]}static formatMenuItemText(e,t){return e}enable(){this.addEventListener("click",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this),this.addEventListener("invoke",this),this.addEventListener("toggle",this)}disable(){this.removeEventListener("click",this),this.removeEventListener("focusout",this),this.removeEventListener("keyup",this),this.removeEventListener("invoke",this),this.removeEventListener("toggle",this)}handleEvent(e){switch(e.type){case"slotchange":v(this,Ci,yn).call(this,e);break;case"invoke":v(this,xi,Tn).call(this,e);break;case"click":v(this,Li,wn).call(this,e);break;case"toggle":v(this,Ii,Mn).call(this,e);break;case"focusout":v(this,Ri,Ln).call(this,e);break;case"keydown":v(this,Di,In).call(this,e);break}}connectedCallback(){var e,t;h(this,je).observe(this.defaultSlot,{childList:!0}),C(this,dt,_n(this.shadowRoot,":host")),v(this,xt,wi).call(this),this.hasAttribute("disabled")||this.enable(),this.role||(this.role="menu"),C(this,I,Ti(this)),(t=(e=h(this,I))==null?void 0:e.associateElement)==null||t.call(e,this),this.hidden||(Zt(ut(this),h(this,Pe)),Zt(this,h(this,Ne))),v(this,Gt,ra).call(this),this.shadowRoot.addEventListener("slotchange",this)}disconnectedCallback(){var e,t;h(this,je).disconnect(),qt(ut(this),h(this,Pe)),qt(this,h(this,Ne)),this.disable(),(t=(e=h(this,I))==null?void 0:e.unassociateElement)==null||t.call(e,this),C(this,I,null),C(this,ee,null),C(this,$,null),this.shadowRoot.removeEventListener("slotchange",this)}attributeChangedCallback(e,t,i){var a,n,r,o;e===ne.HIDDEN&&i!==t?(h(this,he)||C(this,he,!0),this.hidden?v(this,Si,Cn).call(this):v(this,Mi,An).call(this),this.dispatchEvent(new Mr({oldState:this.hidden?"open":"closed",newState:this.hidden?"closed":"open",bubbles:!0}))):e===J.MEDIA_CONTROLLER?(t&&((n=(a=h(this,I))==null?void 0:a.unassociateElement)==null||n.call(a,this),C(this,I,null)),i&&this.isConnected&&(C(this,I,Ti(this)),(o=(r=h(this,I))==null?void 0:r.associateElement)==null||o.call(r,this))):e===ne.DISABLED&&i!==t?i==null?this.enable():this.disable():e===ne.STYLE&&i!==t&&v(this,xt,wi).call(this)}formatMenuItemText(e,t){return this.constructor.formatMenuItemText(e,t)}get anchor(){return this.getAttribute("anchor")}set anchor(e){this.setAttribute("anchor",`${e}`)}get anchorElement(){var e;return this.anchor?(e=si(this))==null?void 0:e.querySelector(`#${this.anchor}`):null}get items(){return this.defaultSlot.assignedElements({flatten:!0}).filter(Dr)}get radioGroupItems(){return this.items.filter(e=>e.role==="menuitemradio")}get checkedItems(){return this.items.filter(e=>e.checked)}get value(){var e,t;return(t=(e=this.checkedItems[0])==null?void 0:e.value)!=null?t:""}set value(e){let t=this.items.find(i=>i.value===e);t&&v(this,Mt,Bi).call(this,t)}focus(){if(C(this,ee,kn()),this.items.length){v(this,rt,Yt).call(this,this.items[0]),this.items[0].focus();return}let e=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');e==null||e.focus()}handleSelect(e){var t;let i=v(this,nt,Ft).call(this,e);i&&(v(this,Mt,Bi).call(this,i,i.type==="checkbox"),h(this,$)&&!this.hidden&&((t=h(this,ee))==null||t.focus(),this.hidden=!0))}get keysUsed(){return["Enter","Escape","Tab"," ","ArrowDown","ArrowUp","Home","End"]}handleMove(e){var t,i;let{key:a}=e,n=this.items,r=(i=(t=v(this,nt,Ft).call(this,e))!=null?t:v(this,Hi,Rn).call(this))!=null?i:n[0],o=n.indexOf(r),s=Math.max(0,o);a==="ArrowDown"?s++:a==="ArrowUp"?s--:e.key==="Home"?s=0:e.key==="End"&&(s=n.length-1),s<0&&(s=n.length-1),s>n.length-1&&(s=0),v(this,rt,Yt).call(this,n[s]),n[s].focus()}};I=new WeakMap;ee=new WeakMap;$=new WeakMap;wt=new WeakMap;je=new WeakMap;he=new WeakMap;dt=new WeakMap;Ci=new WeakSet;yn=function(e){let t=e.target;for(let i of t.assignedNodes({flatten:!0}))i.nodeType===3&&i.textContent.trim()===""&&i.remove();["header","title"].includes(t.name)&&v(this,Gt,ra).call(this),t.name||h(this,Kt).call(this)};Gt=new WeakSet;ra=function(){let e=this.shadowRoot.querySelector('slot[name="header"]'),t=this.shadowRoot.querySelector('slot[name="title"]');e.hidden=t.assignedNodes().length===0&&e.assignedNodes().length===0};Kt=new WeakMap;xt=new WeakSet;wi=function(){var e;let t=this.shadowRoot.querySelector("#layout-row"),i=(e=getComputedStyle(this).getPropertyValue("--media-menu-layout"))==null?void 0:e.trim();t.setAttribute("media",i==="row"?"":"width:0")};xi=new WeakSet;Tn=function(e){C(this,$,e.relatedTarget),ri(this,e.relatedTarget)||(this.hidden=!this.hidden)};Mi=new WeakSet;An=function(){var e;(e=h(this,$))==null||e.setAttribute("aria-expanded","true"),this.addEventListener("transitionend",()=>this.focus(),{once:!0}),Zt(ut(this),h(this,Pe)),Zt(this,h(this,Ne))};Si=new WeakSet;Cn=function(){var e;(e=h(this,$))==null||e.setAttribute("aria-expanded","false"),qt(ut(this),h(this,Pe)),qt(this,h(this,Ne))};Pe=new WeakMap;Ne=new WeakMap;Ue=new WeakSet;ct=function(e){if(this.hasAttribute("mediacontroller")&&!this.anchor||this.hidden||!this.anchorElement)return;let{x:t,y:i}=Tr({anchor:this.anchorElement,floating:this,placement:"top-start"});e!=null||(e=this.offsetWidth);let n=ut(this).getBoundingClientRect(),r=n.width-t-e,o=n.height-i-this.offsetHeight,{style:s}=h(this,dt);s.setProperty("position","absolute"),s.setProperty("right",`${Math.max(0,r)}px`),s.setProperty("--_menu-bottom",`${o}px`);let m=getComputedStyle(this),E=s.getPropertyValue("--_menu-bottom")===m.bottom?o:parseFloat(m.bottom),_=n.height-E-parseFloat(m.marginBottom);this.style.setProperty("--_menu-max-height",`${_}px`)};zt=new WeakSet;oa=function(e){let t=this.querySelector('[role="menuitem"][aria-haspopup][aria-expanded="true"]'),i=t==null?void 0:t.querySelector('[role="menu"]'),{style:a}=h(this,dt);if(e||a.setProperty("--media-menu-transition-in","none"),i){let n=i.offsetHeight,r=Math.max(i.offsetWidth,t.offsetWidth);this.style.setProperty("min-width",`${r}px`),this.style.setProperty("min-height",`${n}px`),v(this,Ue,ct).call(this,r)}else this.style.removeProperty("min-width"),this.style.removeProperty("min-height"),v(this,Ue,ct).call(this);a.removeProperty("--media-menu-transition-in")};Li=new WeakSet;wn=function(e){var t;if(e.stopPropagation(),e.composedPath().includes(h(this,sa,xn))){(t=h(this,ee))==null||t.focus(),this.hidden=!0;return}let i=v(this,nt,Ft).call(this,e);!i||i.hasAttribute("disabled")||(v(this,rt,Yt).call(this,i),this.handleSelect(e))};sa=new WeakSet;xn=function(){var e;return(e=this.shadowRoot.querySelector('slot[name="header"]').assignedElements({flatten:!0}))==null?void 0:e.find(i=>i.matches('button[part~="back"]'))};Ii=new WeakSet;Mn=function(e){if(e.target===this)return;v(this,la,Sn).call(this);let t=Array.from(this.querySelectorAll('[role="menuitem"][aria-haspopup]'));for(let i of t)i.invokeTargetElement!=e.target&&e.newState=="open"&&i.getAttribute("aria-expanded")=="true"&&!i.invokeTargetElement.hidden&&i.invokeTargetElement.dispatchEvent(new aa({relatedTarget:i}));for(let i of t)i.setAttribute("aria-expanded",`${!i.submenuElement.hidden}`);v(this,zt,oa).call(this,!0)};la=new WeakSet;Sn=function(){let t=this.querySelector('[role="menuitem"] > [role="menu"]:not([hidden])');this.container.classList.toggle("has-expanded",!!t)};Ri=new WeakSet;Ln=function(e){var t;ri(this,e.relatedTarget)||(h(this,he)&&((t=h(this,ee))==null||t.focus()),h(this,$)&&h(this,$)!==e.relatedTarget&&!this.hidden&&(this.hidden=!0))};Di=new WeakSet;In=function(e){var t,i,a,n,r;let{key:o,ctrlKey:s,altKey:m,metaKey:c}=e;if(!(s||m||c)&&this.keysUsed.includes(o))if(e.preventDefault(),e.stopPropagation(),o==="Tab"){if(h(this,he)){this.hidden=!0;return}e.shiftKey?(i=(t=this.previousElementSibling)==null?void 0:t.focus)==null||i.call(t):(n=(a=this.nextElementSibling)==null?void 0:a.focus)==null||n.call(a),this.blur()}else o==="Escape"?((r=h(this,ee))==null||r.focus(),h(this,he)&&(this.hidden=!0)):o==="Enter"||o===" "?this.handleSelect(e):this.handleMove(e)};nt=new WeakSet;Ft=function(e){return e.composedPath().find(t=>["menuitemradio","menuitemcheckbox"].includes(t.role))};Hi=new WeakSet;Rn=function(){return this.items.find(e=>e.tabIndex===0)};rt=new WeakSet;Yt=function(e){for(let t of this.items)t.tabIndex=t===e?0:-1};Mt=new WeakSet;Bi=function(e,t){let i=[...this.checkedItems];e.type==="radio"&&this.radioGroupItems.forEach(a=>a.checked=!1),t?e.checked=!e.checked:e.checked=!0,this.checkedItems.some((a,n)=>a!=i[n])&&this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))};x.shadowRootOptions={mode:"open"};x.getTemplateHTML=Rr;function Dr(e){return["menuitem","menuitemradio","menuitemcheckbox"].includes(e==null?void 0:e.role)}function ut(e){var t;return(t=e.getAttribute("bounds")?oi(e,`#${e.getAttribute("bounds")}`):y(e)||e.parentElement)!=null?t:e}d.customElements.get("media-chrome-menu")||d.customElements.define("media-chrome-menu",x);var da=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},k=(e,t,i)=>(da(e,t,"read from private field"),i?i.call(e):t.get(e)),P=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},pi=(e,t,i,a)=>(da(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),Ie=(e,t,i)=>(da(e,t,"access private method"),i),St,ot,Oi,Dn,Qt,ca,ua,Hn,O,Ae,Pi,Lt,Ni;function Hr(e){return`
    <style>
      :host {
        transition: var(--media-menu-item-transition,
          background .15s linear,
          opacity .2s ease-in-out
        );
        outline: var(--media-menu-item-outline, 0);
        outline-offset: var(--media-menu-item-outline-offset, -1px);
        cursor: var(--media-cursor, pointer);
        display: flex;
        align-items: center;
        align-self: stretch;
        justify-self: stretch;
        white-space: nowrap;
        white-space-collapse: collapse;
        text-wrap: nowrap;
        padding: .4em .8em .4em 1em;
      }

      :host(:focus-visible) {
        box-shadow: var(--media-menu-item-focus-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: var(--media-menu-item-hover-outline, 0);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host(:hover) {
        cursor: var(--media-cursor, pointer);
        background: var(--media-menu-item-hover-background, rgb(92 92 102 / .5));
        outline: var(--media-menu-item-hover-outline);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host([aria-checked="true"]) {
        background: var(--media-menu-item-checked-background);
      }

      :host([hidden]) {
        display: none;
      }

      :host([disabled]) {
        pointer-events: none;
        color: rgba(255, 255, 255, .3);
      }

      slot:not([name]) {
        width: 100%;
      }

      slot:not([name="submenu"]) {
        display: inline-flex;
        align-items: center;
        transition: inherit;
        opacity: var(--media-menu-item-opacity, 1);
      }

      slot[name="description"] {
        justify-content: end;
      }

      slot[name="description"] > span {
        display: inline-block;
        margin-inline: 1em .2em;
        max-width: var(--media-menu-item-description-max-width, 100px);
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: .8em;
        font-weight: 400;
        text-align: right;
        position: relative;
        top: .04em;
      }

      slot[name="checked-indicator"] {
        display: none;
      }

      :host(:is([role="menuitemradio"],[role="menuitemcheckbox"])) slot[name="checked-indicator"] {
        display: var(--media-menu-item-checked-indicator-display, inline-block);
      }


      svg, img, ::slotted(svg), ::slotted(img) {
        height: var(--media-menu-item-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
      }


      [part~="indicator"],
      ::slotted([part~="indicator"]) {
        fill: var(--media-menu-item-indicator-fill,
          var(--media-icon-color, var(--media-primary-color, rgb(238 238 238))));
        height: var(--media-menu-item-indicator-height, 1.25em);
        margin-right: .5ch;
      }

      [part~="checked-indicator"] {
        visibility: hidden;
      }

      :host([aria-checked="true"]) [part~="checked-indicator"] {
        visibility: visible;
      }
    </style>
    <slot name="checked-indicator">
      <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
        <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
      </svg>
    </slot>
    <slot name="prefix"></slot>
    <slot></slot>
    <slot name="description"></slot>
    <slot name="suffix">
      ${this.getSuffixSlotInnerHTML(e)}
    </slot>
    <slot name="submenu"></slot>
  `}function Br(e){return""}var A={TYPE:"type",VALUE:"value",CHECKED:"checked",DISABLED:"disabled"},ie=class extends d.HTMLElement{constructor(){if(super(),P(this,Oi),P(this,Qt),P(this,ua),P(this,Lt),P(this,St,!1),P(this,ot,void 0),P(this,O,()=>{var e,t;this.submenuElement.items&&this.setAttribute("submenusize",`${this.submenuElement.items.length}`);let i=this.shadowRoot.querySelector('slot[name="description"]'),a=(e=this.submenuElement.checkedItems)==null?void 0:e[0],n=(t=a==null?void 0:a.dataset.description)!=null?t:a==null?void 0:a.text,r=lt.createElement("span");r.textContent=n!=null?n:"",i.replaceChildren(r)}),P(this,Ae,e=>{let{key:t}=e;if(!this.keysUsed.includes(t)){this.removeEventListener("keyup",k(this,Ae));return}this.handleClick(e)}),P(this,Pi,e=>{let{metaKey:t,altKey:i,key:a}=e;if(t||i||!this.keysUsed.includes(a)){this.removeEventListener("keyup",k(this,Ae));return}this.addEventListener("keyup",k(this,Ae),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=ni(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[A.TYPE,A.DISABLED,A.CHECKED,A.VALUE]}enable(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),Ye(this)&&!this.hasAttribute("aria-checked")&&this.setAttribute("aria-checked","false"),this.addEventListener("click",this),this.addEventListener("keydown",this)}disable(){this.removeAttribute("tabindex"),this.removeEventListener("click",this),this.removeEventListener("keydown",this),this.removeEventListener("keyup",this)}handleEvent(e){switch(e.type){case"slotchange":Ie(this,Oi,Dn).call(this,e);break;case"click":this.handleClick(e);break;case"keydown":k(this,Pi).call(this,e);break;case"keyup":k(this,Ae).call(this,e);break}}attributeChangedCallback(e,t,i){e===A.CHECKED&&Ye(this)&&!k(this,St)?this.setAttribute("aria-checked",i!=null?"true":"false"):e===A.TYPE&&i!==t?this.role="menuitem"+i:e===A.DISABLED&&i!==t&&(i==null?this.enable():this.disable())}connectedCallback(){this.hasAttribute(A.DISABLED)||this.enable(),this.role="menuitem"+this.type,pi(this,ot,Ui(this,this.parentNode)),Ie(this,Lt,Ni).call(this),this.submenuElement&&Ie(this,Qt,ca).call(this),this.shadowRoot.addEventListener("slotchange",this)}disconnectedCallback(){this.disable(),Ie(this,Lt,Ni).call(this),pi(this,ot,null),this.shadowRoot.removeEventListener("slotchange",this)}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=si(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):this.submenuElement}get submenuElement(){return this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements({flatten:!0})[0]}get type(){var e;return(e=this.getAttribute(A.TYPE))!=null?e:""}set type(e){this.setAttribute(A.TYPE,`${e}`)}get value(){var e;return(e=this.getAttribute(A.VALUE))!=null?e:this.text}set value(e){this.setAttribute(A.VALUE,e)}get text(){var e;return((e=this.textContent)!=null?e:"").trim()}get checked(){if(Ye(this))return this.getAttribute("aria-checked")==="true"}set checked(e){Ye(this)&&(pi(this,St,!0),this.setAttribute("aria-checked",e?"true":"false"),e?this.part.add("checked"):this.part.remove("checked"))}handleClick(e){Ye(this)||this.invokeTargetElement&&ri(this,e.target)&&this.invokeTargetElement.dispatchEvent(new aa({relatedTarget:this}))}get keysUsed(){return["Enter"," "]}};St=new WeakMap;ot=new WeakMap;Oi=new WeakSet;Dn=function(e){let t=e.target;if(!(t!=null&&t.name))for(let a of t.assignedNodes({flatten:!0}))a instanceof Text&&a.textContent.trim()===""&&a.remove();t.name==="submenu"&&(this.submenuElement?Ie(this,Qt,ca).call(this):Ie(this,ua,Hn).call(this))};Qt=new WeakSet;ca=async function(){this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",`${!this.submenuElement.hidden}`),this.submenuElement.addEventListener("change",k(this,O)),this.submenuElement.addEventListener("addmenuitem",k(this,O)),this.submenuElement.addEventListener("removemenuitem",k(this,O)),k(this,O).call(this)};ua=new WeakSet;Hn=function(){this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"),this.submenuElement.removeEventListener("change",k(this,O)),this.submenuElement.removeEventListener("addmenuitem",k(this,O)),this.submenuElement.removeEventListener("removemenuitem",k(this,O)),k(this,O).call(this)};O=new WeakMap;Ae=new WeakMap;Pi=new WeakMap;Lt=new WeakSet;Ni=function(){var e;let t=(e=k(this,ot))==null?void 0:e.radioGroupItems;if(!t)return;let i=t.filter(a=>a.getAttribute("aria-checked")==="true").pop();i||(i=t[0]);for(let a of t)a.setAttribute("aria-checked","false");i==null||i.setAttribute("aria-checked","true")};ie.shadowRootOptions={mode:"open"};ie.getTemplateHTML=Hr;ie.getSuffixSlotInnerHTML=Br;function Ye(e){return e.type==="radio"||e.type==="checkbox"}function Ui(e,t){if(!e)return null;let{host:i}=e.getRootNode();return!t&&i?Ui(e,i):t!=null&&t.items?t:Ui(t,t==null?void 0:t.parentNode)}d.customElements.get("media-chrome-menu-item")||d.customElements.define("media-chrome-menu-item",ie);function Or(e){return`
    ${x.getTemplateHTML(e)}
    <style>
      :host {
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-settings-menu-background,
            var(--media-menu-background,
              var(--media-control-background,
                var(--media-secondary-color, var(--_menu-bg)))));
        min-width: var(--media-settings-menu-min-width, 170px);
        border-radius: 2px 2px 0 0;
        overflow: hidden;
      }

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([role="menu"]) {

        justify-content: end;
      }

      slot:not([name]) {
        justify-content: var(--media-settings-menu-justify-content);
        flex-direction: var(--media-settings-menu-flex-direction, column);
        overflow: visible;
      }

      #container.has-expanded {
        --media-settings-menu-item-opacity: 0;
      }
    </style>
  `}var Bn=class extends x{get anchorElement(){return this.anchor!=="auto"?super.anchorElement:y(this).querySelector("media-settings-menu-button")}};Bn.getTemplateHTML=Or;d.customElements.get("media-settings-menu")||d.customElements.define("media-settings-menu",Bn);function Pr(e){return`
    ${ie.getTemplateHTML.call(this,e)}
    <style>
      slot:not([name="submenu"]) {
        opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
      }

      :host([aria-expanded="true"]:hover) {
        background: transparent;
      }
    </style>
  `}function Nr(e){return`
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `}var li=class extends ie{};li.shadowRootOptions={mode:"open"};li.getTemplateHTML=Pr;li.getSuffixSlotInnerHTML=Nr;d.customElements.get("media-settings-menu-item")||d.customElements.define("media-settings-menu-item",li);var fe={PLACEMENT:"placement",BOUNDS:"bounds"};function Ur(e){return`
    <style>
      :host {
        --_tooltip-background-color: var(--media-tooltip-background-color, var(--media-secondary-color, rgba(20, 20, 30, .7)));
        --_tooltip-background: var(--media-tooltip-background, var(--_tooltip-background-color));
        --_tooltip-arrow-half-width: calc(var(--media-tooltip-arrow-width, 12px) / 2);
        --_tooltip-arrow-height: var(--media-tooltip-arrow-height, 5px);
        --_tooltip-arrow-background: var(--media-tooltip-arrow-color, var(--_tooltip-background-color));
        position: relative;
        pointer-events: none;
        display: var(--media-tooltip-display, inline-flex);
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        z-index: var(--media-tooltip-z-index, 1);
        background: var(--_tooltip-background);
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        font: var(--media-font,
          var(--media-font-weight, 400)
          var(--media-font-size, 13px) /
          var(--media-text-content-height, var(--media-control-height, 18px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        padding: var(--media-tooltip-padding, .35em .7em);
        border: var(--media-tooltip-border, none);
        border-radius: var(--media-tooltip-border-radius, 5px);
        filter: var(--media-tooltip-filter, drop-shadow(0 0 4px rgba(0, 0, 0, .2)));
        white-space: var(--media-tooltip-white-space, nowrap);
      }

      :host([hidden]) {
        display: none;
      }

      img, svg {
        display: inline-block;
      }

      #arrow {
        position: absolute;
        width: 0px;
        height: 0px;
        border-style: solid;
        display: var(--media-tooltip-arrow-display, block);
      }

      :host(:not([placement])),
      :host([placement="top"]) {
        position: absolute;
        bottom: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host(:not([placement])) #arrow,
      :host([placement="top"]) #arrow {
        top: 100%;
        left: 50%;
        border-width: var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width);
        border-color: var(--_tooltip-arrow-background) transparent transparent transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="right"]) {
        position: absolute;
        left: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="right"]) #arrow {
        top: 50%;
        right: 100%;
        border-width: var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0;
        border-color: transparent var(--_tooltip-arrow-background) transparent transparent;
        transform: translate(0, -50%);
      }

      :host([placement="bottom"]) {
        position: absolute;
        top: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host([placement="bottom"]) #arrow {
        bottom: 100%;
        left: 50%;
        border-width: 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width);
        border-color: transparent transparent var(--_tooltip-arrow-background) transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="left"]) {
        position: absolute;
        right: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="left"]) #arrow {
        top: 50%;
        left: 100%;
        border-width: var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height);
        border-color: transparent transparent transparent var(--_tooltip-arrow-background);
        transform: translate(0, -50%);
      }

      :host([placement="none"]) #arrow {
        display: none;
      }
    </style>
    <slot></slot>
    <div id="arrow"></div>
  `}var di=class extends d.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var e;if(!Sr(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;let t=this.placement;if(t==="left"||t==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}let i=getComputedStyle(this),a=(e=oi(this,"#"+this.bounds))!=null?e:y(this);if(!a)return;let{x:n,width:r}=a.getBoundingClientRect(),{x:o,width:s}=this.getBoundingClientRect(),m=o+s,c=n+r,E=i.getPropertyValue("--media-tooltip-offset-x"),_=E?parseFloat(E.replace("px","")):0,T=i.getPropertyValue("--media-tooltip-container-margin"),S=T?parseFloat(T.replace("px","")):0,Ge=o-n+_-S,mt=m-c+_+S;if(Ge<0){this.style.setProperty("--media-tooltip-offset-x",`${Ge}px`);return}if(mt>0){this.style.setProperty("--media-tooltip-offset-x",`${mt}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=ni(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){let e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[fe.PLACEMENT,fe.BOUNDS]}get placement(){return Z(this,fe.PLACEMENT)}set placement(e){te(this,fe.PLACEMENT,e)}get bounds(){return Z(this,fe.BOUNDS)}set bounds(e){te(this,fe.BOUNDS,e)}};di.shadowRootOptions={mode:"open"};di.getTemplateHTML=Ur;d.customElements.get("media-tooltip")||d.customElements.define("media-tooltip",di);var Pa=di,ha=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},f=(e,t,i)=>(ha(e,t,"read from private field"),i?i.call(e):t.get(e)),be=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},vt=(e,t,i,a)=>(ha(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),Wr=(e,t,i)=>(ha(e,t,"access private method"),i),R,Re,j,Ce,It,Wi,On,q={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"};function Vr(e,t={}){return`
    <style>
      :host {
        position: relative;
        font: var(--media-font,
          var(--media-font-weight, bold)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        padding: var(--media-button-padding, var(--media-control-padding, 10px));
        justify-content: var(--media-button-justify-content, center);
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        transition: background .15s linear;
        pointer-events: auto;
        cursor: var(--media-cursor, pointer);
        -webkit-tap-highlight-color: transparent;
      }


      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }

      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgba(50 50 70 / .7));
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-button-icon-width);
        height: var(--media-button-icon-height, var(--media-control-height, 24px));
        transform: var(--media-button-icon-transform);
        transition: var(--media-button-icon-transition);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
      }

      media-tooltip {

        max-width: 0;
        overflow-x: clip;
        opacity: 0;
        transition: opacity .3s, max-width 0s 9s;
      }

      :host(:hover) media-tooltip,
      :host(:focus-visible) media-tooltip {
        max-width: 100vw;
        opacity: 1;
        transition: opacity .3s;
      }

      :host([notooltip]) slot[name="tooltip"] {
        display: none;
      }
    </style>

    ${this.getSlotTemplateHTML(e,t)}

    <slot name="tooltip">
      <media-tooltip part="tooltip" aria-hidden="true">
        <template shadowrootmode="${Pa.shadowRootOptions.mode}">
          ${Pa.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(e)}
        </slot>
      </media-tooltip>
    </slot>
  `}function $r(e,t){return`
    <slot></slot>
  `}function Zr(){return""}var ve=class extends d.HTMLElement{constructor(){if(super(),be(this,Wi),be(this,R,void 0),this.preventClick=!1,this.tooltipEl=null,be(this,Re,e=>{this.preventClick||this.handleClick(e),setTimeout(f(this,j),0)}),be(this,j,()=>{var e,t;(t=(e=this.tooltipEl)==null?void 0:e.updateXOffset)==null||t.call(e)}),be(this,Ce,e=>{let{key:t}=e;if(!this.keysUsed.includes(t)){this.removeEventListener("keyup",f(this,Ce));return}this.preventClick||this.handleClick(e)}),be(this,It,e=>{let{metaKey:t,altKey:i,key:a}=e;if(t||i||!this.keysUsed.includes(a)){this.removeEventListener("keyup",f(this,Ce));return}this.addEventListener("keyup",f(this,Ce),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=ni(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",q.TOOLTIP_PLACEMENT,J.MEDIA_CONTROLLER,l.MEDIA_LANG]}enable(){this.addEventListener("click",f(this,Re)),this.addEventListener("keydown",f(this,It)),this.tabIndex=0}disable(){this.removeEventListener("click",f(this,Re)),this.removeEventListener("keydown",f(this,It)),this.removeEventListener("keyup",f(this,Ce)),this.tabIndex=-1}attributeChangedCallback(e,t,i){var a,n,r,o,s;e===J.MEDIA_CONTROLLER?(t&&((n=(a=f(this,R))==null?void 0:a.unassociateElement)==null||n.call(a,this),vt(this,R,null)),i&&this.isConnected&&(vt(this,R,(r=this.getRootNode())==null?void 0:r.getElementById(i)),(s=(o=f(this,R))==null?void 0:o.associateElement)==null||s.call(o,this))):e==="disabled"&&i!==t?i==null?this.enable():this.disable():e===q.TOOLTIP_PLACEMENT&&this.tooltipEl&&i!==t?this.tooltipEl.placement=i:e===l.MEDIA_LANG&&(this.shadowRoot.querySelector('slot[name="tooltip-content"]').innerHTML=this.constructor.getTooltipContentHTML()),f(this,j).call(this)}connectedCallback(){var e,t,i;let{style:a}=Lr(this.shadowRoot,":host");a.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");let n=this.getAttribute(J.MEDIA_CONTROLLER);n&&(vt(this,R,(e=this.getRootNode())==null?void 0:e.getElementById(n)),(i=(t=f(this,R))==null?void 0:t.associateElement)==null||i.call(t,this)),d.customElements.whenDefined("media-tooltip").then(()=>Wr(this,Wi,On).call(this))}disconnectedCallback(){var e,t;this.disable(),(t=(e=f(this,R))==null?void 0:e.unassociateElement)==null||t.call(e,this),vt(this,R,null),this.removeEventListener("mouseenter",f(this,j)),this.removeEventListener("focus",f(this,j)),this.removeEventListener("click",f(this,Re))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return Z(this,q.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){te(this,q.TOOLTIP_PLACEMENT,e)}get mediaController(){return Z(this,J.MEDIA_CONTROLLER)}set mediaController(e){te(this,J.MEDIA_CONTROLLER,e)}get disabled(){return Ai(this,q.DISABLED)}set disabled(e){Oa(this,q.DISABLED,e)}get noTooltip(){return Ai(this,q.NO_TOOLTIP)}set noTooltip(e){Oa(this,q.NO_TOOLTIP,e)}handleClick(e){}};R=new WeakMap;Re=new WeakMap;j=new WeakMap;Ce=new WeakMap;It=new WeakMap;Wi=new WeakSet;On=function(){this.addEventListener("mouseenter",f(this,j)),this.addEventListener("focus",f(this,j)),this.addEventListener("click",f(this,Re));let e=this.tooltipPlacement;e&&this.tooltipEl&&(this.tooltipEl.placement=e)};ve.shadowRootOptions={mode:"open"};ve.getTemplateHTML=Vr;ve.getSlotTemplateHTML=$r;ve.getTooltipContentHTML=Zr;d.customElements.get("media-chrome-button")||d.customElements.define("media-chrome-button",ve);var qe=class extends ve{connectedCallback(){super.connectedCallback(),this.invokeTargetElement&&this.setAttribute("aria-haspopup","menu")}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=si(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):null}handleClick(){var e;(e=this.invokeTargetElement)==null||e.dispatchEvent(new aa({relatedTarget:this}))}};d.customElements.get("media-chrome-menu-button")||d.customElements.define("media-chrome-menu-button",qe);var qr={"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute",Loop:"Loop","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings",Auto:"Auto","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute","chapter: {chapterName}":"chapter: {chapterName}",live:"live",Off:"Off","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it.",hour:"hour",hours:"hours",minute:"minute",minutes:"minutes",second:"second",seconds:"seconds","{time} remaining":"{time} remaining","{currentTime} of {totalTime}":"{currentTime} of {totalTime}","video not loaded, unknown time.":"video not loaded, unknown time."},Na,vi={en:qr},Ua=((Na=globalThis.navigator)==null?void 0:Na.language)||"en",Gr=e=>{var t,i,a;let[n]=Ua.split("-");return((t=vi[Ua])==null?void 0:t[e])||((i=vi[n])==null?void 0:i[e])||((a=vi.en)==null?void 0:a[e])||e},g=(e,t={})=>Gr(e).replace(/\{(\w+)\}/g,(i,a)=>a in t?String(t[a]):`{${a}}`);function Kr(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
      </svg>
    </slot>
  `}function zr(){return g("Settings")}var ma=class extends qe{static get observedAttributes(){return[...super.observedAttributes,"target"]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",g("settings"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:y(this).querySelector("media-settings-menu")}};ma.getSlotTemplateHTML=Kr;ma.getTooltipContentHTML=zr;d.customElements.get("media-settings-menu-button")||d.customElements.define("media-settings-menu-button",ma);var pa=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},Pn=(e,t,i)=>(pa(e,t,"read from private field"),i?i.call(e):t.get(e)),ft=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},Vi=(e,t,i,a)=>(pa(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),bt=(e,t,i)=>(pa(e,t,"access private method"),i),et,Xt,Rt,$i,Dt,Zi,Fr=class extends x{constructor(){super(...arguments),ft(this,Rt),ft(this,Dt),ft(this,et,[]),ft(this,Xt,void 0)}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_AUDIO_TRACK_LIST,l.MEDIA_AUDIO_TRACK_ENABLED,l.MEDIA_AUDIO_TRACK_UNAVAILABLE]}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===l.MEDIA_AUDIO_TRACK_ENABLED&&t!==i?this.value=i:e===l.MEDIA_AUDIO_TRACK_LIST&&t!==i&&(Vi(this,et,vr(i!=null?i:"")),bt(this,Rt,$i).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",bt(this,Dt,Zi))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",bt(this,Dt,Zi))}get anchorElement(){var e;return this.anchor!=="auto"?super.anchorElement:(e=y(this))==null?void 0:e.querySelector("media-audio-track-menu-button")}get mediaAudioTrackList(){return Pn(this,et)}set mediaAudioTrackList(e){Vi(this,et,e),bt(this,Rt,$i).call(this)}get mediaAudioTrackEnabled(){var e;return(e=Z(this,l.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){te(this,l.MEDIA_AUDIO_TRACK_ENABLED,e)}};et=new WeakMap;Xt=new WeakMap;Rt=new WeakSet;$i=function(){if(Pn(this,Xt)===JSON.stringify(this.mediaAudioTrackList))return;Vi(this,Xt,JSON.stringify(this.mediaAudioTrackList));let e=this.mediaAudioTrackList;this.defaultSlot.textContent="",e.sort((t,i)=>t.id.localeCompare(i.id,void 0,{numeric:!0}));for(let t of e){let i=this.formatMenuItemText(t.label,t),a=$e({type:"radio",text:i,value:`${t.id}`,checked:t.enabled});a.prepend(me(this,"checked-indicator")),this.defaultSlot.append(a)}};Dt=new WeakSet;Zi=function(){if(this.value==null)return;let e=new d.CustomEvent(We.MEDIA_AUDIO_TRACK_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(e)};d.customElements.get("media-audio-track-menu")||d.customElements.define("media-audio-track-menu",Fr);var Yr=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`;function Qr(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${Yr}</slot>
  `}function Xr(){return g("Audio")}var Wa=e=>{let t=g("Audio");e.setAttribute("aria-label",t)},va=class extends qe{static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_AUDIO_TRACK_ENABLED,l.MEDIA_AUDIO_TRACK_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Wa(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===l.MEDIA_LANG&&Wa(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=y(this))==null?void 0:e.querySelector("media-audio-track-menu")}get mediaAudioTrackEnabled(){var e;return(e=Z(this,l.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){te(this,l.MEDIA_AUDIO_TRACK_ENABLED,e)}};va.getSlotTemplateHTML=Qr;va.getTooltipContentHTML=Xr;d.customElements.get("media-audio-track-menu-button")||d.customElements.define("media-audio-track-menu-button",va);var Jr=(e="")=>e.split(/\s+/),jr=(e="")=>{let[t,i,a]=e.split(":"),n=a?decodeURIComponent(a):void 0;return{kind:t==="cc"?xa.CAPTIONS:xa.SUBTITLES,language:i,label:n}},Nn=(e="",t={})=>Jr(e).map(i=>{let a=jr(i);return Ke(Ke({},t),a)}),qi=({kind:e,label:t,language:i}={kind:"subtitles"})=>t?`${e==="captions"?"cc":"sb"}:${i}:${encodeURIComponent(t)}`:i,Un=(e=[])=>Array.prototype.map.call(e,qi).join(" "),eo=e=>{var t;return!!((t=e.mediaSubtitlesShowing)!=null&&t.length)||e.hasAttribute(l.MEDIA_SUBTITLES_SHOWING)},fa=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},to=(e,t,i)=>(fa(e,t,"read from private field"),i?i.call(e):t.get(e)),fi=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},io=(e,t,i,a)=>(fa(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),gt=(e,t,i)=>(fa(e,t,"access private method"),i),Jt,Ht,Gi,Bt,Ki,ao=`
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`;function no(e){return`
    ${x.getTemplateHTML(e)}
    <slot name="captions-indicator" hidden>${ao}</slot>
  `}var Wn=class extends x{constructor(){super(...arguments),fi(this,Ht),fi(this,Bt),fi(this,Jt,void 0)}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_SUBTITLES_LIST,l.MEDIA_SUBTITLES_SHOWING]}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===l.MEDIA_SUBTITLES_LIST&&t!==i?gt(this,Ht,Gi).call(this):e===l.MEDIA_SUBTITLES_SHOWING&&t!==i&&(this.value=i||"",gt(this,Ht,Gi).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",gt(this,Bt,Ki))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",gt(this,Bt,Ki))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:y(this).querySelector("media-captions-menu-button")}get mediaSubtitlesList(){return Va(this,l.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){$a(this,l.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Va(this,l.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){$a(this,l.MEDIA_SUBTITLES_SHOWING,e)}};Jt=new WeakMap;Ht=new WeakSet;Gi=function(){var e;let t=to(this,Jt)!==JSON.stringify(this.mediaSubtitlesList),i=this.value!==this.getAttribute(l.MEDIA_SUBTITLES_SHOWING);if(!t&&!i)return;io(this,Jt,JSON.stringify(this.mediaSubtitlesList)),this.defaultSlot.textContent="";let a=!this.value,n=$e({type:"radio",text:this.formatMenuItemText(g("Off")),value:"off",checked:a});n.prepend(me(this,"checked-indicator")),this.defaultSlot.append(n);let r=this.mediaSubtitlesList;for(let o of r){let s=$e({type:"radio",text:this.formatMenuItemText(o.label,o),value:qi(o),checked:this.value==qi(o)});s.prepend(me(this,"checked-indicator")),((e=o.kind)!=null?e:"subs")==="captions"&&s.append(me(this,"captions-indicator")),this.defaultSlot.append(s)}};Bt=new WeakSet;Ki=function(){let e=this.mediaSubtitlesShowing,t=this.getAttribute(l.MEDIA_SUBTITLES_SHOWING),i=this.value!==t;if(e!=null&&e.length&&i&&this.dispatchEvent(new d.CustomEvent(We.MEDIA_DISABLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:e})),!this.value||!i)return;let a=new d.CustomEvent(We.MEDIA_SHOW_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(a)};Wn.getTemplateHTML=no;var Va=(e,t)=>{let i=e.getAttribute(t);return i?Nn(i):[]},$a=(e,t,i)=>{if(!(i!=null&&i.length)){e.removeAttribute(t);return}let a=Un(i);e.getAttribute(t)!==a&&e.setAttribute(t,a)};d.customElements.get("media-captions-menu")||d.customElements.define("media-captions-menu",Wn);var ro=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,oo=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function so(){return`
    <style>
      :host([data-captions-enabled="true"]) slot[name=off] {
        display: none !important;
      }


      :host(:not([data-captions-enabled="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${ro}</slot>
      <slot name="off">${oo}</slot>
    </slot>
  `}function lo(){return g("Captions")}var Za=e=>{e.setAttribute("data-captions-enabled",eo(e).toString())},qa=e=>{e.setAttribute("aria-label",g("closed captions"))},ba=class extends qe{static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_SUBTITLES_LIST,l.MEDIA_SUBTITLES_SHOWING,l.MEDIA_LANG]}connectedCallback(){super.connectedCallback(),qa(this),Za(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===l.MEDIA_SUBTITLES_SHOWING?Za(this):e===l.MEDIA_LANG&&qa(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=y(this))==null?void 0:e.querySelector("media-captions-menu")}get mediaSubtitlesList(){return Ga(this,l.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Ka(this,l.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Ga(this,l.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Ka(this,l.MEDIA_SUBTITLES_SHOWING,e)}};ba.getSlotTemplateHTML=so;ba.getTooltipContentHTML=lo;var Ga=(e,t)=>{let i=e.getAttribute(t);return i?Nn(i):[]},Ka=(e,t,i)=>{if(!(i!=null&&i.length)){e.removeAttribute(t);return}let a=Un(i);e.getAttribute(t)!==a&&e.setAttribute(t,a)};d.customElements.get("media-captions-menu-button")||d.customElements.define("media-captions-menu-button",ba);var Vn=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},b=(e,t,i)=>(Vn(e,t,"read from private field"),i?i.call(e):t.get(e)),Qe=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},Et=(e,t,i,a)=>(Vn(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),we,xe,jt,ce,N,Y,$n=class{constructor(e,t,{defaultValue:i}={defaultValue:void 0}){Qe(this,N),Qe(this,we,void 0),Qe(this,xe,void 0),Qe(this,jt,void 0),Qe(this,ce,new Set),Et(this,we,e),Et(this,xe,t),Et(this,jt,new Set(i))}[Symbol.iterator](){return b(this,N,Y).values()}get length(){return b(this,N,Y).size}get value(){var e;return(e=[...b(this,N,Y)].join(" "))!=null?e:""}set value(e){var t;e!==this.value&&(Et(this,ce,new Set),this.add(...(t=e==null?void 0:e.split(" "))!=null?t:[]))}toString(){return this.value}item(e){return[...b(this,N,Y)][e]}values(){return b(this,N,Y).values()}forEach(e,t){b(this,N,Y).forEach(e,t)}add(...e){var t,i;e.forEach(a=>b(this,ce).add(a)),!(this.value===""&&!((t=b(this,we))!=null&&t.hasAttribute(`${b(this,xe)}`)))&&((i=b(this,we))==null||i.setAttribute(`${b(this,xe)}`,`${this.value}`))}remove(...e){var t;e.forEach(i=>b(this,ce).delete(i)),(t=b(this,we))==null||t.setAttribute(`${b(this,xe)}`,`${this.value}`)}contains(e){return b(this,N,Y).has(e)}toggle(e,t){return typeof t!="undefined"?t?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,t){return this.remove(e),this.add(t),e===t}};we=new WeakMap;xe=new WeakMap;jt=new WeakMap;ce=new WeakMap;N=new WeakSet;Y=function(){return b(this,ce).size?b(this,ce):b(this,jt)};var co=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},ge=(e,t,i)=>(co(e,t,"read from private field"),i?i.call(e):t.get(e)),uo=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},Q,bi={RATES:"rates"},Zn=[1,1.2,1.5,1.7,2],De=1;function ho(e){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${e.mediaplaybackrate||De}x</slot>
  `}function mo(){return g("Playback rate")}var ga=class extends ve{constructor(){var e;super(),uo(this,Q,new $n(this,bi.RATES,{defaultValue:Zn})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:De}x`}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_PLAYBACK_RATE,bi.RATES]}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),e===bi.RATES&&(ge(this,Q).value=i),e===l.MEDIA_PLAYBACK_RATE){let a=i?+i:Number.NaN,n=Number.isNaN(a)?De:a;this.container.innerHTML=`${n}x`,this.setAttribute("aria-label",g("Playback rate {playbackRate}",{playbackRate:n}))}}get rates(){return ge(this,Q)}set rates(e){e?Array.isArray(e)?ge(this,Q).value=e.join(" "):typeof e=="string"&&(ge(this,Q).value=e):ge(this,Q).value=""}get mediaPlaybackRate(){return pe(this,l.MEDIA_PLAYBACK_RATE,De)}set mediaPlaybackRate(e){Ve(this,l.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,t;let i=Array.from(ge(this,Q).values(),r=>+r).sort((r,o)=>r-o),a=(t=(e=i.find(r=>r>this.mediaPlaybackRate))!=null?e:i[0])!=null?t:De,n=new d.CustomEvent(We.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:a});this.dispatchEvent(n)}};Q=new WeakMap;ga.getSlotTemplateHTML=ho;ga.getTooltipContentHTML=mo;d.customElements.get("media-playback-rate-button")||d.customElements.define("media-playback-rate-button",ga);var qn=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},Me=(e,t,i)=>(qn(e,t,"read from private field"),i?i.call(e):t.get(e)),gi=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},Ee=(e,t,i)=>(qn(e,t,"access private method"),i),X,Se,tt,Ot,zi,Ei={RATES:"rates"},po=class extends x{constructor(){super(),gi(this,Se),gi(this,Ot),gi(this,X,new $n(this,Ei.RATES,{defaultValue:Zn})),Ee(this,Se,tt).call(this)}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_PLAYBACK_RATE,Ei.RATES]}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===l.MEDIA_PLAYBACK_RATE&&t!=i?(this.value=i,Ee(this,Se,tt).call(this)):e===Ei.RATES&&t!=i&&(Me(this,X).value=i,Ee(this,Se,tt).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Ee(this,Ot,zi))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Ee(this,Ot,zi))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:y(this).querySelector("media-playback-rate-menu-button")}get rates(){return Me(this,X)}set rates(e){e?Array.isArray(e)?Me(this,X).value=e.join(" "):typeof e=="string"&&(Me(this,X).value=e):Me(this,X).value="",Ee(this,Se,tt).call(this)}get mediaPlaybackRate(){return pe(this,l.MEDIA_PLAYBACK_RATE,De)}set mediaPlaybackRate(e){Ve(this,l.MEDIA_PLAYBACK_RATE,e)}};X=new WeakMap;Se=new WeakSet;tt=function(){this.defaultSlot.textContent="";let e=this.mediaPlaybackRate,t=new Set(Array.from(Me(this,X)).map(a=>Number(a)));e>0&&!t.has(e)&&t.add(e);let i=Array.from(t).sort((a,n)=>a-n);for(let a of i){let n=$e({type:"radio",text:this.formatMenuItemText(`${a}x`,a),value:a.toString(),checked:e===a});n.prepend(me(this,"checked-indicator")),this.defaultSlot.append(n)}};Ot=new WeakSet;zi=function(){if(!this.value)return;let e=new d.CustomEvent(We.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(e)};d.customElements.get("media-playback-rate-menu")||d.customElements.define("media-playback-rate-menu",po);var Pt=1;function vo(e){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }

      :host([aria-expanded="true"]) slot {
        display: block;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${e.mediaplaybackrate||Pt}x</slot>
  `}function fo(){return g("Playback rate")}var Ea=class extends qe{static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_PLAYBACK_RATE]}constructor(){var e;super(),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:Pt}x`}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),e===l.MEDIA_PLAYBACK_RATE){let a=i?+i:Number.NaN,n=Number.isNaN(a)?Pt:a;this.container.innerHTML=`${n}x`,this.setAttribute("aria-label",g("Playback rate {playbackRate}",{playbackRate:n}))}}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:y(this).querySelector("media-playback-rate-menu")}get mediaPlaybackRate(){return pe(this,l.MEDIA_PLAYBACK_RATE,Pt)}set mediaPlaybackRate(e){Ve(this,l.MEDIA_PLAYBACK_RATE,e)}};Ea.getSlotTemplateHTML=vo;Ea.getTooltipContentHTML=fo;d.customElements.get("media-playback-rate-menu-button")||d.customElements.define("media-playback-rate-menu-button",Ea);var ka=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},U=(e,t,i)=>(ka(e,t,"read from private field"),i?i.call(e):t.get(e)),kt=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},za=(e,t,i,a)=>(ka(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),ke=(e,t,i)=>(ka(e,t,"access private method"),i),it,D,Le,at,Nt,Fi,bo=class extends x{constructor(){super(...arguments),kt(this,Le),kt(this,Nt),kt(this,it,[]),kt(this,D,{})}static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_RENDITION_LIST,l.MEDIA_RENDITION_SELECTED,l.MEDIA_RENDITION_UNAVAILABLE,l.MEDIA_HEIGHT,l.MEDIA_WIDTH]}static formatMenuItemText(e,t){return super.formatMenuItemText(e,t)}static formatRendition(e,{showBitrate:t=!1}={}){let i=`${Math.min(e.width,e.height)}p`;if(t&&e.bitrate){let a=e.bitrate/1e6,n=`${a.toFixed(a<1?1:0)} Mbps`;return`${i} (${n})`}return this.formatMenuItemText(i,e)}static compareRendition(e,t){var i,a;return t.height===e.height?((i=t.bitrate)!=null?i:0)-((a=e.bitrate)!=null?a:0):t.height-e.height}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),t!==i)switch(e){case l.MEDIA_RENDITION_SELECTED:this.value=i!=null?i:"auto",ke(this,Le,at).call(this);break;case l.MEDIA_RENDITION_LIST:za(this,it,mr(i)),ke(this,Le,at).call(this);break;case l.MEDIA_HEIGHT:case l.MEDIA_WIDTH:ke(this,Le,at).call(this);break}}connectedCallback(){super.connectedCallback(),this.addEventListener("change",ke(this,Nt,Fi))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",ke(this,Nt,Fi))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:y(this).querySelector("media-rendition-menu-button")}get mediaRenditionList(){return U(this,it)}set mediaRenditionList(e){za(this,it,e),ke(this,Le,at).call(this)}get mediaRenditionSelected(){return Z(this,l.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){te(this,l.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return pe(this,l.MEDIA_HEIGHT)}set mediaHeight(e){Ve(this,l.MEDIA_HEIGHT,e)}get mediaWidth(){return pe(this,l.MEDIA_WIDTH)}set mediaWidth(e){Ve(this,l.MEDIA_WIDTH,e)}compareRendition(e,t){return this.constructor.compareRendition(e,t)}formatMenuItemText(e,t){return this.constructor.formatMenuItemText(e,t)}formatRendition(e,t){return this.constructor.formatRendition(e,t)}showRenditionBitrate(e){return this.mediaRenditionList.some(t=>t!==e&&t.height===e.height&&t.bitrate!==e.bitrate)}};it=new WeakMap;D=new WeakMap;Le=new WeakSet;at=function(){let e=!this.mediaRenditionSelected;if(U(this,D).mediaRenditionList===JSON.stringify(this.mediaRenditionList)&&U(this,D).mediaHeight===this.mediaHeight&&U(this,D).mediaWidth===this.mediaWidth&&U(this,D).isAuto===e)return;U(this,D).mediaRenditionList=JSON.stringify(this.mediaRenditionList),U(this,D).mediaHeight=this.mediaHeight,U(this,D).mediaWidth=this.mediaWidth,U(this,D).isAuto=e;let t=this.mediaRenditionList.sort(this.compareRendition.bind(this)),i=t.find(o=>o.id===this.mediaRenditionSelected);for(let o of t)o.selected=o===i;this.defaultSlot.textContent="";for(let o of t){let s=this.formatRendition(o,{showBitrate:this.showRenditionBitrate(o)}),m=$e({type:"radio",text:s,value:`${o.id}`,checked:o.selected&&!e});m.prepend(me(this,"checked-indicator")),this.defaultSlot.append(m)}let a=i&&this.showRenditionBitrate(i),n;e&&(i?n=this.formatMenuItemText(`${g("Auto")} \u2022 ${this.formatRendition(i,{showBitrate:a})}`,i):this.mediaHeight>0&&this.mediaWidth>0&&(n=this.formatMenuItemText(`${g("Auto")} (${Math.min(this.mediaWidth,this.mediaHeight)}p)`))),n||(n=this.formatMenuItemText(g("Auto")));let r=$e({type:"radio",text:n,value:"auto",checked:e});r.dataset.description=n,r.prepend(me(this,"checked-indicator")),this.defaultSlot.append(r)};Nt=new WeakSet;Fi=function(){if(this.value==null)return;let e=new d.CustomEvent(We.MEDIA_RENDITION_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(e)};d.customElements.get("media-rendition-menu")||d.customElements.define("media-rendition-menu",bo);var go=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`;function Eo(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${go}</slot>
  `}function ko(){return g("Quality")}var _a=class extends qe{static get observedAttributes(){return[...super.observedAttributes,l.MEDIA_RENDITION_SELECTED,l.MEDIA_RENDITION_UNAVAILABLE,l.MEDIA_HEIGHT]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",g("quality"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:y(this).querySelector("media-rendition-menu")}get mediaRenditionSelected(){return Z(this,l.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){te(this,l.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return pe(this,l.MEDIA_HEIGHT)}set mediaHeight(e){Ve(this,l.MEDIA_HEIGHT,e)}};_a.getSlotTemplateHTML=Eo;_a.getTooltipContentHTML=ko;d.customElements.get("media-rendition-menu-button")||d.customElements.define("media-rendition-menu-button",_a);var ya=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},H=(e,t,i)=>(ya(e,t,"read from private field"),i?i.call(e):t.get(e)),L=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},Gn=(e,t,i,a)=>(ya(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),w=(e,t,i)=>(ya(e,t,"access private method"),i),Ze,ht,ci,se,He,Ta,Kn,Ut,Yi,Wt,Qi,zn,ei,ti,Vt;function _o(e){return`
      ${x.getTemplateHTML(e)}
      <style>
        :host {
          --_menu-bg: rgb(20 20 30 / .8);
          background: var(--media-settings-menu-background,
            var(--media-menu-background,
              var(--media-control-background,
                var(--media-secondary-color, var(--_menu-bg)))));
          min-width: var(--media-settings-menu-min-width, 170px);
          border-radius: 2px;
          overflow: hidden;
        }
      </style>
    `}var Fn=class extends x{constructor(){super(),L(this,ht),L(this,se),L(this,Ta),L(this,Ut),L(this,Qi),L(this,Ze,!1),L(this,Wt,e=>{let t=e.target,i=(t==null?void 0:t.nodeName)==="VIDEO",a=w(this,Ut,Yi).call(this,t);(i||a)&&(H(this,Ze)?w(this,se,He).call(this):w(this,Qi,zn).call(this,e))}),L(this,ei,e=>{let t=e.target,i=this.contains(t),a=e.button===2,n=(t==null?void 0:t.nodeName)==="VIDEO",r=w(this,Ut,Yi).call(this,t);i||a&&(n||r)||w(this,se,He).call(this)}),L(this,ti,e=>{e.key==="Escape"&&w(this,se,He).call(this)}),L(this,Vt,e=>{var t,i;let a=e.target;if((t=a.matches)!=null&&t.call(a,'button[invoke="copy"]')){let n=(i=a.closest("media-context-menu-item"))==null?void 0:i.querySelector('input[slot="copy"]');n&&navigator.clipboard.writeText(n.value)}w(this,se,He).call(this)}),this.setAttribute("noautohide",""),w(this,ht,ci).call(this)}connectedCallback(){super.connectedCallback(),y(this).addEventListener("contextmenu",H(this,Wt)),this.addEventListener("click",H(this,Vt))}disconnectedCallback(){super.disconnectedCallback(),y(this).removeEventListener("contextmenu",H(this,Wt)),this.removeEventListener("click",H(this,Vt)),document.removeEventListener("mousedown",H(this,ei)),document.removeEventListener("keydown",H(this,ti))}};Ze=new WeakMap;ht=new WeakSet;ci=function(){this.hidden=!H(this,Ze)};se=new WeakSet;He=function(){Gn(this,Ze,!1),w(this,ht,ci).call(this)};Ta=new WeakSet;Kn=function(){document.querySelectorAll("media-context-menu").forEach(t=>{var i;t!==this&&w(i=t,se,He).call(i)})};Ut=new WeakSet;Yi=function(e){return e?e.hasAttribute("slot")&&e.getAttribute("slot")==="media"?!0:e.nodeName.includes("-")&&e.tagName.includes("-")?e.hasAttribute("src")||e.hasAttribute("poster")||e.hasAttribute("preload")||e.hasAttribute("playsinline"):!1:!1};Wt=new WeakMap;Qi=new WeakSet;zn=function(e){e.preventDefault(),w(this,Ta,Kn).call(this),Gn(this,Ze,!0),this.style.position="fixed",this.style.left=`${e.clientX}px`,this.style.top=`${e.clientY}px`,w(this,ht,ci).call(this),document.addEventListener("mousedown",H(this,ei),{once:!0}),document.addEventListener("keydown",H(this,ti),{once:!0})};ei=new WeakMap;ti=new WeakMap;Vt=new WeakMap;Fn.getTemplateHTML=_o;d.customElements.get("media-context-menu")||d.customElements.define("media-context-menu",Fn);function yo(e){return`
    ${ie.getTemplateHTML.call(this,e)}
    <style>
        ::slotted(*) {
            color: var(--media-text-color, white);
            text-decoration: none;
            border: none;
            background: none;
            cursor: pointer;
            padding: 0;
            min-height: var(--media-control-height, 24px);
        }
    </style>
  `}var Aa=class extends ie{};Aa.shadowRootOptions={mode:"open"};Aa.getTemplateHTML=yo;d.customElements.get("media-context-menu-item")||d.customElements.define("media-context-menu-item",Aa);var Xi=nr.createElement("template");"innerHTML"in Xi&&(Xi.innerHTML=jn);var Fa,Ya,Ca=class extends ai{};Ca.template=(Ya=(Fa=Xi.content)==null?void 0:Fa.children)==null?void 0:Ya[0];wa.customElements.get("media-theme-gerwig")||wa.customElements.define("media-theme-gerwig",Ca);var Mo=Ca;export{Mo as default};
