const fontSelector = (fontName) => {

    if (fontName == 'regular')
        return 'segoeui';
    else if (fontName == 'bold')
        return 'segoeuib';
    else if (fontName == 'medium')
        return 'seguisb';
}
module.exports = fontSelector;