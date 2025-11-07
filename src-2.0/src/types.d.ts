// Type definitions for Zotero 7 Plugin API

// ============================================================================
// Bootstrap Lifecycle Types
// ============================================================================

interface BootstrapParams {
  id: string;
  version: string;
  rootURI: string;
}

interface MainWindowParams {
  window: ZoteroWindow;
}

// ============================================================================
// Plugin Interface
// ============================================================================

interface MakeItRedPlugin {
  id: string | null;
  version: string | null;
  rootURI: string | null;
  initialized: boolean;
  addedElementIDs: string[];

  init(params: BootstrapParams): void;
  log(msg: string): void;
  addToWindow(window: ZoteroWindow): void;
  addToAllWindows(): void;
  storeAddedElement(elem: Element): void;
  removeFromWindow(window: ZoteroWindow): void;
  removeFromAllWindows(): void;
  toggleGreen(window: ZoteroWindow, enabled: boolean): void;
  main(): Promise<void>;
}

// Global plugin instance
declare var MakeItRed: MakeItRedPlugin;

// ============================================================================
// Zotero API Types
// ============================================================================

interface ZoteroWindow extends Window {
  ZoteroPane?: any;
  MozXULElement: {
    insertFTLIfNeeded(ftlFile: string): void;
  };
  document: ZoteroDocument;
}

interface ZoteroDocument extends Document {
  createXULElement(tagName: string): XULElement;
  documentElement: HTMLElement & {
    style: CSSStyleDeclaration;
  };
}

interface ZoteroPrefs {
  get(pref: string, defaultValue?: any): any;
  set(pref: string, value: any, global?: boolean): void;
}

interface ZoteroPreferencePaneOptions {
  pluginID: string;
  src: string;
  scripts: string[];
}

interface ZoteroPreferencePanes {
  register(options: ZoteroPreferencePaneOptions): void;
  unregister(pluginID: string): void;
}

interface ZoteroAPI {
  debug(message: string): void;
  getMainWindows(): ZoteroWindow[];
  Prefs: ZoteroPrefs;
  PreferencePanes: ZoteroPreferencePanes;
}

declare const Zotero: ZoteroAPI;

// ============================================================================
// Mozilla Services API Types
// ============================================================================

interface ServicesScriptLoader {
  loadSubScript(url: string, target?: any): void;
}

interface ServicesIO {
  newURI(uri: string): any;
}

interface ServicesAPI {
  scriptloader: ServicesScriptLoader;
  io: ServicesIO;
}

declare const Services: ServicesAPI;

// ============================================================================
// XUL Element Types
// ============================================================================

interface XULElement extends HTMLElement {
  checked?: boolean;
}
