import { GluonElement, html } from '../gluonjs/gluon.js';
import '../overwebs-player-widget/overwebs-player-widget.js';
import '../overwebs-player-data/overwebs-player-data.js';
import '../overwebs-main-menu/overwebs-main-menu.js';
import '../overwebs-fonts/overwebs-fonts.js';

class OverwebsMainPage extends GluonElement {
  get template() {
    // TODO: Migrate to --overwebs-window-size
    return html`
    <style>
      :host {
        display: block;
        position: relative;
        overflow: auto;
        width: 100%;
        min-height: 100vh;
        padding-top: 12vw;
      }

      .searching-spinner {
        margin-left: calc(40 / 25.6 * 1vw);
        height: calc(80 / 25.6 * 1vw);
        width: calc(80 / 25.6 * 1vw)
      }

      .hero {
        opacity: .9;
        position: absolute;
        right: 2vw;
        top: calc(905 / 25.6 * 1vw);
        text-align: right;
        z-index: 0
      }

      .hero .name,
      .hero .nameShadow,
      .hero .nameShadow2 {
        padding-right: 3vw;
        font-family: overwebs-big-noodle;
        line-height: 1;
        font-size: calc(114 / 25.6 * 1vw);
        color: transparent
      }

      .hero .nameShadow,
      .hero .nameShadow2 {
        color: #fff;
        position: absolute;
        right: 0
      }

      .hero .name {
        background: linear-gradient(#fff 0, #fff 50%, #fff 50%, #BDBFC0);
        -webkit-background-clip: text
      }

      .hero .nameShadow {
        z-index: -1;
        -webkit-text-stroke: .1275vw rgba(0, 0, 0, .15)
      }

      .hero .nameShadow2 {
        z-index: -2;
        background: linear-gradient(transparent, transparent 10%, rgba(219, 155, 143, .85) 16%, rgba(0, 0, 0, .15));
        -webkit-background-clip: text;
        -webkit-text-stroke: .15vw transparent
      }

      .hero .unlocks,
      .hero .unlocksShadow {
        font-family: overwebs-futura;
        font-size: calc(36 / 25.6 * 1vw);
        text-transform: uppercase;
        padding-right: calc(70 / 25.6 * 1vw)
      }

      .hero .unlocks {
        color: rgba(255, 255, 255, .8);
        margin-top: calc(2 / 25.6 * 1vw)
      }

      .hero .unlocks .unlocked {
        color: #fff
      }

      .hero .unlocksShadow {
        color: transparent;
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: -1;
        -webkit-text-stroke: .1775vw rgba(0, 0, 0, .15)
      }
    </style>
    <overwebs-hero-data id="heroData"></overwebs-hero-data>
    <overwebs-player-data id="playerData"></overwebs-player-data>
    <overwebs-player-widget id="playerWidget"></overwebs-player-widget>
    <overwebs-main-menu>
      <a href="/play">Play</a>
      <a href="/training">Training</a>
      <a href="/hero-gallery">Hero Gallery</a>
      <a href="/loot">Loot Box</a>
    </overwebs-main-menu>
    <overwebs-main-menu submenu>
      <a href="/social">Social</a>
      <a href="/career">Career Profile</a>
      <a href="/options">Options</a>
      <a href="/exit">Exit Game</a>
    </overwebs-main-menu>
    <div class="hero">
      <div class="nameShadow">${this._hero}</div>
      <div class="nameShadow2">${this._hero}</div>
      <div class="name">${this._hero}</div>
      <div class="unlocks"><span class="unlocked">${this._unlocked}</span>/${this._unlockable} unlocks</div>
      <div class="unlocksShadow">${this._unlocked}/${this._unlockable} unlocks</div>
    </div>
    `;
  }

  constructor() {
    super();
    this._hero = '';
    this._unlocked = 0;
    this._unlockable = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.heroData.addEventListener('data-changed', () => {
      this.heroData = this.$.heroData.data;
      _heroChanged();
    });
    this.$.playerData.addEventListener('player-changed', () => {
      this.$.playerWidget.player = this.$.playerData.player;
    });
  }

  static get observers() {
    return ['_heroChanged(heroData, playerData, backgroundSelection)'];
  }

  _heroChanged() {
    if (this.heroData === undefined || this.playerData === undefined || this.backgroundSelection === undefined) {
      return;
    }
    let hero = this.backgroundSelection
      .split('/')
      .slice(0, -1)
      .pop();
    this._hero = (this.heroData[hero] && this.heroData[hero].name) || '';

    if (this.playerData.unlocks && this.heroData[hero]) {
      this._unlocked = Math.min(this.playerData.unlocks[hero], this.heroData[hero].unlockable);
    } else {
      this._unlocked = 0;
    }

    this._unlockable = (this.heroData[hero] && this.heroData[hero].unlockable) || 0;
    this.render();
  }
}

customElements.define(OverwebsMainPage.is, OverwebsMainPage);
