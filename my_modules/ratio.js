module.exports = getContrastCompliance;


function getContrastCompliance(foreground, background) {
	return {
		contrastRatio: getContrastRatio(foreground, background),
		AALarge: isContrastRatioValid(foreground, background, 'AA_LARGE'),
		AA: isContrastRatioValid(foreground, background, 'AA'),
		AAALarge: isContrastRatioValid(foreground, background, 'AAA_LARGE'),
		AAA: isContrastRatioValid(foreground, background, 'AAA')
	}
}

function getContrastRatio(color1, color2) {
	// Conversion des couleurs en RGB
	const rgb1 = hexToRgb(color1);
	const rgb2 = hexToRgb(color2);
	
	// Calcul de la luminance relative des couleurs
	const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
	const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
	
	// Calcul du contraste selon la formule WCAG 2.0
	const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
	
	return contrast.toFixed(2);
}

function isContrastRatioValid(foreground, background, level) {
	const CONTRAST_RATIO_LEVELS = {
		AA: 4.5,
		AA_LARGE: 3,
		AAA: 7,
		AAA_LARGE: 4.5
	};
	const contrastRatio = getContrastRatio(foreground, background);
	return contrastRatio >= CONTRAST_RATIO_LEVELS[level];
}

function hexToRgb(hex) {
	// Extraction des composantes de couleur R, G et B
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	
	return { r, g, b };
}

function getRelativeLuminance(r, g, b) {
	// Conversion des couleurs en sRGB
	const sr = r / 255;
	const sg = g / 255;
	const sb = b / 255;
	
	// Correction gamma inverse
	const rLinear = (sr <= 0.03928) ? sr / 12.92 : Math.pow((sr + 0.055) / 1.055, 2.4);
	const gLinear = (sg <= 0.03928) ? sg / 12.92 : Math.pow((sg + 0.055) / 1.055, 2.4);
	const bLinear = (sb <= 0.03928) ? sb / 12.92 : Math.pow((sb + 0.055) / 1.055, 2.4);
	
	// Calcul de la luminance relative
	return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}