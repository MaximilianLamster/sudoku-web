import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    borderColor: string;
    cellSelectedBorder: string;
    cellSelectedShadow: string;
    cellSameNumberBorder: string;
    cellSameNumberShadow: string;
    cellHighlight: string;
    cellFlashBg: string;
    cellFlashBorder: string;
    cellFlashHover: string;
    textGiven: string;
    textUser: string;
    textUserAccent: string;
    textError: string;
    hintDigit: string;
    buttonText: string;
    buttonBorder: string;
    buttonPressedBg: string;
    buttonActiveText: string;
    buttonActiveBorder: string;
    buttonActiveBg: string;
    buttonActiveShadow: string;
    divider: string;
    backButton: string;
    difficultyLabel: string;
    diffButtonBorder: string;
    diffButtonBorderHover: string;
    diffButtonShadowHover: string;
    diffButtonEasyBg: string;
    diffButtonMediumBg: string;
    diffButtonHardBg: string;
    iconColor: string;
    titleColor: string;
    overlayButtonBg: string;
  }
}
