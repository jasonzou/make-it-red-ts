/// <reference path="types.d.ts" />

function log(msg: string): void {
	Zotero.debug("Make It Red: " + msg);
}

function install(): void {
	log("Installed 2.0");
}

async function startup({ id, version, rootURI }: BootstrapParams): Promise<void> {
	log("Starting 2.0");

	Zotero.PreferencePanes.register({
		pluginID: 'make-it-red@example.com',
		src: rootURI + 'preferences.xhtml',
		scripts: [rootURI + 'preferences.js']
	});

	Services.scriptloader.loadSubScript(rootURI + 'make-it-red.js');
	MakeItRed.init({ id, version, rootURI });
	MakeItRed.addToAllWindows();
	await MakeItRed.main();
}

function onMainWindowLoad({ window }: MainWindowParams): void {
	MakeItRed.addToWindow(window);
}

function onMainWindowUnload({ window }: MainWindowParams): void {
	MakeItRed.removeFromWindow(window);
}

function shutdown(): void {
	log("Shutting down 2.0");
	MakeItRed.removeFromAllWindows();
	(MakeItRed as any) = undefined;
}

function uninstall(): void {
	log("Uninstalled 2.0");
}
