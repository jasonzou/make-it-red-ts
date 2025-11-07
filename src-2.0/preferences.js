window.MakeItRed_Preferences = {
	init: function () {
		Zotero.debug("Make It Red: Initialize preference pane");

		const picker = document.getElementById("make-it-red-color");
		picker.addEventListener("input", (e) => {
			for (let win of Zotero.getMainWindows()) {
				if (!win.ZoteroPane) continue;
				win.document.documentElement.style.setProperty('--make-it-red-style-color', e.target.value);
			}
		});

	}
};