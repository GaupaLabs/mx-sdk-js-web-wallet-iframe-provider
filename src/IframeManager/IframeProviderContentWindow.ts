import {
  IframeLoginTypes,
  iframeWindowReadyEvent,
  safeDocument
} from '../constants';
import {
  bodyStyle,
  containerStyle,
  headerStyle,
  headingElementStyle,
  iframeStyle,
  titleElementStyle,
  toggleIconElementStyle
} from './IframeManager.styles';
import { IframeProviderContentWindowModel } from './IframeProviderContentWindow.model';

const LoginBranding = {
  [IframeLoginTypes.metamask]: {
    icon: '<img src="https://vibe.gaupa.xyz/static/GaupaVibeTransparent.png" class="gaupa center" width="60" alt="" data-hires-status="pending">',
    title: 'Gaupa Login'
  },
  [IframeLoginTypes.passkey]: {
    icon: '<img src="https://developer.apple.com/assets/elements/icons/passkeys/passkeys-96x96_2x.png" class="icon-passkeys center" width="50" alt="" data-hires-status="pending">',
    title: 'Passkey Login'
  },
  [IframeLoginTypes.tiktok]: {
    icon: '<img src="https://vibe.gaupa.xyz/static/GaupaVibeTransparent.png" class="gaupa center" width="60" alt="" data-hires-status="pending">',
    title: 'Gaupa Login'
  },
  [IframeLoginTypes.twitter]: {
    icon: '<img src="https://vibe.gaupa.xyz/static/GaupaVibeTransparent.png" class="gaupa center" width="60" alt="" data-hires-status="pending">',
    title: 'Gaupa Login'
  },
  [IframeLoginTypes.google]: {
    icon: '<img src="https://vibe.gaupa.xyz/static/GaupaVibeTransparent.png" class="gaupa center" width="60" alt="" data-hires-status="pending">',
    title: 'Gaupa Login'
  },
  [IframeLoginTypes.mail]: {
    icon: '<img src="https://vibe.gaupa.xyz/static/GaupaVibeTransparent.png" class="gaupa center" width="60" alt="" data-hires-status="pending">',
    title: 'Gaupa Login'
  },
  [IframeLoginTypes.discord]: {
    icon: '<img src="https://vibe.gaupa.xyz/static/GaupaVibeTransparent.png" class="gaupa center" width="60" alt="" data-hires-status="pending">',
    title: 'Gaupa Login'
  }
};

type IframeProviderContentWindowProps = {
  id: string;
  url: string;
  anchor?: HTMLElement;
  loginType: IframeLoginTypes;
};

export class IframeProviderContentWindow
  implements IframeProviderContentWindowModel
{
  public contentWindow: Window | null;
  public walletAddress = '';

  private readonly container: HTMLDivElement;
  private readonly header: HTMLDivElement;
  private readonly title: HTMLDivElement;
  private readonly body: HTMLDivElement;
  private readonly iframe: HTMLIFrameElement;
  private loginType = IframeLoginTypes.google;

  public constructor(props: IframeProviderContentWindowProps) {
    const { id, url, anchor, loginType } = props;
    this.loginType = loginType;

    this.container = safeDocument.createElement?.('div');
    this.header = safeDocument.createElement?.('div');
    this.title = safeDocument.createElement?.('div');
    this.body = safeDocument.createElement?.('div');
    this.iframe = safeDocument.createElement?.('iframe');

    if (loginType === IframeLoginTypes.passkey) {
      this.iframe.allow =
        'publickey-credentials-get *; publickey-credentials-create *;';
    }

    this.buildWindow(id, url);
    this.contentWindow = this.iframe.contentWindow;
    this.setupWindow();

    if (anchor) {
      anchor.appendChild(this.container);
    } else {
      safeDocument.body?.appendChild?.(this.container);
    }
  }

  private buildWindow(id: string, url: string) {
    this.container.id = `window-container-${id}`;
    this.iframe.id = id;
    this.iframe.src = url;

    this.container.style.cssText = containerStyle;
    this.header.style.cssText = headerStyle;
    this.body.style.cssText = bodyStyle;
    this.iframe.style.cssText = iframeStyle;

    this.buildContainer();
  }

  private buildHeader() {
    const iframeIcon =
      LoginBranding[this.loginType].icon ||
      '<img src="https://vibe.gaupa.xyz/static/GaupaVibeTransparent.png" class="gaupa center" width="60" alt="" data-hires-status="pending">';

    const toggleIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" zoomAndPan="magnify" viewBox="0 0 36.75 36.000001" height="48" preserveAspectRatio="xMidYMid meet" version="1.2"><defs><clipPath id="4bb5922db7"><path d="M 0.375 0 L 36.132812 0 L 36.132812 35.027344 L 0.375 35.027344 Z M 0.375 0 "/></clipPath><clipPath id="91c1eca6cd"><path d="M 0.375 0 L 35.554688 0 L 35.554688 34.304688 L 0.375 34.304688 Z M 0.375 0 "/></clipPath><clipPath id="8ae80ca073"><path d="M 13 7.824219 L 22.957031 7.824219 L 22.957031 26.796875 L 13 26.796875 Z M 13 7.824219 "/></clipPath></defs><g id="64069603f0"><g clip-rule="nonzero" clip-path="url(#4bb5922db7)"><path style=" stroke:none;fill-rule:nonzero;fill:#ffffff;fill-opacity:1;" d="M 0.375 0 L 36.132812 0 L 36.132812 35.027344 L 0.375 35.027344 Z M 0.375 0 "/></g><g clip-rule="nonzero" clip-path="url(#91c1eca6cd)"><path style=" stroke:none;fill-rule:nonzero;fill:#e4dbc9;fill-opacity:1;" d="M 0.375 0 L 35.617188 0 L 35.617188 34.304688 L 0.375 34.304688 Z M 0.375 0 "/></g><g clip-rule="nonzero" clip-path="url(#8ae80ca073)"><path style=" stroke:none;fill-rule:evenodd;fill:#000000;fill-opacity:1;" d="M 22.785156 18.054688 L 14.777344 26.386719 C 14.386719 26.792969 13.75 26.792969 13.359375 26.386719 C 12.96875 25.980469 12.96875 25.332031 13.359375 24.921875 L 20.671875 17.316406 L 13.359375 9.710938 C 12.96875 9.304688 12.96875 8.644531 13.359375 8.238281 C 13.75 7.832031 14.386719 7.832031 14.777344 8.238281 L 22.792969 16.582031 C 23.1875 16.988281 23.1875 17.648438 22.785156 18.054688 Z M 22.785156 18.054688 "/></g></g></svg>';

    const headingElement = safeDocument.createElement?.('div');
    const iframeIconElement = safeDocument.createElement?.('div');
    const toggleIconElement = safeDocument.createElement?.('div');

    iframeIconElement.innerHTML = iframeIcon;
    toggleIconElement.innerHTML = toggleIcon;
    toggleIconElement.style.cssText = toggleIconElementStyle;
    this.title.innerText = LoginBranding[this.loginType].title;
    this.title.style.cssText = titleElementStyle;

    headingElement.id = 'mx-wallet-iframe-window-toggle-button';
    headingElement.style.cssText = headingElementStyle;
    headingElement.appendChild(iframeIconElement);
    headingElement.appendChild(this.title);
    headingElement.appendChild(toggleIconElement);

    headingElement.onclick = () => {
      if (this.body.style.visibility === 'visible') {
        this.forceHidden();
        return;
      }

      this.forceVisible();
    };

    this.header.appendChild(headingElement);
  }

  private buildContainer() {
    this.container.appendChild(this.header);
    this.container.appendChild(this.body);
    this.body.appendChild(this.iframe);
    this.buildHeader();
  }

  private setupWindow() {
    this.iframe.onload = () => {
      this.contentWindow = this.iframe.contentWindow;

      const event = new CustomEvent(iframeWindowReadyEvent, {
        detail: this.iframe
      });

      this.iframe.dispatchEvent(event);
    };
  }

  private forceVisible() {
    this.body.style.visibility = 'visible';
    this.container.style.visibility = 'visible';
    this.container.style.height = 'calc(100vh - 64px - 8px)';
    this.container.style.transform = 'translateX(0)';
    this.title.style.opacity = '1';
  }

  private forceHidden() {
    this.body.style.visibility = 'hidden';
    this.container.style.height = '80px';
    this.container.style.transform =
      'translateX(calc(min(420px, 100vw - 8px) - 80px)';
    this.title.style.opacity = '0';
  }

  public getContainer(): HTMLDivElement {
    return this.container;
  }

  public getIframe(): HTMLIFrameElement {
    return this.iframe;
  }

  public getContentWindow(): Window | null {
    return this.contentWindow;
  }

  public setUrl(url: string): void {
    this.iframe.setAttribute('src', url);
  }

  public remove(): void {
    this.container.remove();
  }

  public setWalletVisible(visible: boolean): void {
    if (visible) {
      this.forceVisible();
      return;
    }

    this.forceHidden();
  }

  public addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject
  ): void {
    this.iframe.addEventListener(type, listener);
  }
}
