import{GluonElement as e,html as a}from"../gluonjs/gluon.js";import"../overwebs-player-widget/overwebs-player-widget.js";import"../overwebs-player-data/overwebs-player-data.js";import"../overwebs-main-menu/overwebs-main-menu.js";import"../overwebs-fonts/overwebs-fonts.js";export class OverwebsMainPage extends e{get template(){return a`
    <style>
      :host {
        display: block;
        position: relative;
        width: 100%;
        min-height: 100%;
        box-sizing: border-box;
        padding-top: calc(270 / 2560 * var(--overwebs-window-size, 1920px));
      }

      overwebs-player-widget {
        position: absolute;
        top: calc(40 / 2560 * var(--overwebs-window-size, 1920px));
        right: calc(68 / 2560 * var(--overwebs-window-size, 1920px));
      }

      .searching-spinner {
        margin-left: calc(40 / 2560 * var(--overwebs-window-size, 1920px));
        height: calc(80 / 2560 * var(--overwebs-window-size, 1920px));
        width: calc(80 / 2560 * var(--overwebs-window-size, 1920px));
      }

      .hero {
        opacity: .9;
        position: absolute;
        right: calc(5 / 2560 * var(--overwebs-window-size, 1920px));
        top: calc(760 / 2560 * var(--overwebs-window-size, 1920px));
        text-align: right;
        z-index: 3;
      }

      @media (max-width: 660px) {
        .hero {
          top: calc(960 / 2560 * var(--overwebs-window-size, 1920px));
        }
      }

      .hero .name,
      .hero .nameShadow,
      .hero .nameShadow2 {
        padding-right: calc(76 / 2560 * var(--overwebs-window-size, 1920px));
        font-family: overwebs-big-noodle;
        line-height: 1;
        font-size: calc(114 / 2560 * var(--overwebs-window-size, 1920px));
        color: transparent;
      }

      .hero .nameShadow,
      .hero .nameShadow2 {
        color: #fff;
        position: absolute;
        right: 0;
        top: 0;
      }

      .hero .name {
        background: linear-gradient(#fff 0, #fff 50%, #fff 50%, #BDBFC0);
        -webkit-background-clip: text;
      }

      .hero .nameShadow {
        z-index: -1;
        -webkit-text-stroke: calc(3 / 2560 * var(--overwebs-window-size, 1920px)) rgba(0, 0, 0, .15);
      }

      .hero .nameShadow2 {
        z-index: -2;
        background: linear-gradient(transparent, transparent 10%, rgba(219, 155, 143, .85) 16%, rgba(0, 0, 0, .15));
        -webkit-background-clip: text;
        -webkit-text-stroke: calc(4 / 2560 * var(--overwebs-window-size, 1920px)) transparent;
      }

      .hero .unlocks,
      .hero .unlocksShadow {
        font-family: overwebs-futura;
        font-size: calc(36 / 2560 * var(--overwebs-window-size, 1920px));
        text-transform: uppercase;
        padding-right: calc(70 / 2560 * var(--overwebs-window-size, 1920px));
      }

      .hero .unlocks {
        color: rgba(255, 255, 255, .8);
        margin-top: calc(2 / 2560 * var(--overwebs-window-size, 1920px));
      }

      .hero .unlocks .unlocked {
        color: #fff;
      }

      .hero .unlocksShadow {
        color: transparent;
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: -1;
        -webkit-text-stroke: calc(4.5 / 2560 * var(--overwebs-window-size, 1920px)) rgba(0, 0, 0, .15);
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
      <div class="name">${this._hero}</div>
      <div class="nameShadow">${this._hero}</div>
      <div class="nameShadow2">${this._hero}</div>
      <div class="unlocks"><span class="unlocked">${this._unlocked}</span>/${this._unlockable} unlocks</div>
      <div class="unlocksShadow">${this._unlocked}/${this._unlockable} unlocks</div>
    </div>
    `}constructor(){super(),this._hero="",this._unlocked=0,this._unlockable=0}connectedCallback(){super.connectedCallback(),this.$.heroData.addEventListener("data-changed",()=>{this.heroData=this.$.heroData.data,this._heroChanged()}),this.$.playerData.addEventListener("player-changed",()=>{this.$.playerWidget.player=this.$.playerData.player,this.playerData=this.$.playerData.player,this._heroChanged()})}set backgroundSelection(e){this._backgroundSelection=e,this._heroChanged()}get backgroundSelection(){return this._backgroundSelection}_heroChanged(){if(void 0===this.heroData||void 0===this.playerData||void 0===this.backgroundSelection)return;let e=this.backgroundSelection.split("/").slice(0,-1).pop();this._hero=this.heroData[e]&&this.heroData[e].name||"",this.playerData.unlocks&&this.heroData[e]?this._unlocked=Math.min(this.playerData.unlocks[e],this.heroData[e].unlockable):this._unlocked=0,this._unlockable=this.heroData[e]&&this.heroData[e].unlockable||0,this.render()}};customElements.define(OverwebsMainPage.is,OverwebsMainPage);
//# sourceMappingURL=overwebs-main-page.js.map
