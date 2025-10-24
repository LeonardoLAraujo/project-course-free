import {LitElement, html, css, TemplateResult, CSSResult, PropertyValues} from 'lit';
import { customElement, state } from 'lit/decorators.js';
import rgbModeImage from '../images/rgb_mode.png';
import cmykModeImage from '../images/cmyk_mode.png';
import pantoneModeImage from '../images/pantone_mode.png';

enum ColorModesType {
    RGB,
    CMYK,
    PANTONE
}

type RenderData = {
    renderImage: string;
    renderLabelText: string;
    renderTitle: string;
    renderText: string;

}

@customElement('color-modes')
export default class ColorModes extends LitElement{


    static override get styles(): CSSResult{

        return css`

            .color-modes{
                position: relative;
                width: inherit;
            }

            .color-modes > * {
                position: absolute;
            }

            course-button-back{
                top: 26px;
                left: 26px;
            }

            .color-modes__title{
                margin: 0;
                font-family: RobotoBold;
                font-size: 32px;
                left: 44px;
                top: 80px;
            }

            .color-modes__firstText{
                font-family: RobotoRegular;
                font-size: 14px;
                left: 44px;
                top: 131px;
                max-width: 690px;
            }
        `;

    }

    private _renderDataModes: RenderData[] = [
        {
            renderImage: rgbModeImage,
            renderLabelText: 'Sistema Aditivo',
            renderTitle: 'RGB',
            renderText: `
                A sigla refere-se às cores vermelho (red), verde (green) e azul (blue), 
                respectivamente, em inglês. Este método de cores é utilizado para dispositivos que emitem luz, 
                como computadores, tablets, celulares e televisores. As combinações entre as três cores servem 
                para criar as demais. Podemos concluir que sempre que a arte for criada para o meio digital 
                este sistema deve ser escolhido. Também é conhecido como sistema aditivo de cores.
            `
        },
        {
            renderImage: cmykModeImage,
            renderLabelText: 'Sistema Subtrativo',
            renderTitle: 'CMYK',
            renderText: `
                A sigla refere-se às cores ciano (cyan), magenta (magenta), 
                amarelo (yellow) e preto (black), respectivamente, em inglês. 
                Este sistema de cor é destinado a projetos impressos, 
                sendo as cores da sigla a base para mistura e criação das demais cores. 
                A cor preta é essencial para composição de todas as outras, 
                sendo considerada uma cor chave, o que explica a letra K que a representa na sigla, 
                vinda da palavra em inglês key (chave). Este padrão também é conhecido sistema subtrativo de cores.
            `
        },
        {
            renderImage: pantoneModeImage,
            renderLabelText: '',
            renderTitle: 'Pantone',
            renderText: `
                Pantone é uma empresa especializada na produção de tintas padronizadas para impressos em geral. 
                A chamada escala Pantone é o sistema desenvolvido por eles em que as cores oferecidas são produzidas 
                sempre com a mesma precisão (combinação perfeitamente calculada entre os pigmentos), garantindo 
                que os tons sejam sempre iguais.
                Empresas de grande porte que precisam padronizar as suas cores utilizam deste padrão, 
                por ser mais exato que o sistema CMKY que apresenta considerável variação de tom em 
                cada impressão/impressora.
            `
        }
    ];

    @state()
    private _currentColorMode: ColorModesType = ColorModesType.RGB;

    @state()
    private _currentRenderData!: RenderData;

    protected override firstUpdated(_changedProperties: PropertyValues): void {
        
        this._currentRenderData = this._renderDataModes[0];
    }

    private _renderInfo(): TemplateResult {

        return html`
            <div class="painel__info">
                <img src=${this._currentRenderData?.renderImage}>
                <p>${this._currentRenderData?.renderLabelText}</p>
                <h2>${this._currentRenderData?.renderTitle}</h2>
                <p>${this._currentRenderData?.renderText}</p>
            </div>
        `;
    }

    private _changeColorMode(event: Event): void{
        const currentButton = (event.target as HTMLDivElement)
        const index = parseInt(currentButton.getAttribute("mode-index") as string);

        this._currentRenderData = this._renderDataModes[index];
    }

    protected override render(): TemplateResult{

        return html`
        <div class="color-modes">
            <course-button-back></course-button-back>
            <h1 class="color-modes__title">Modos de Cor</h1>
            <p class="color-modes__firstText">
                Os modos de cor são padrões definidos para os sistemas de cores que constituem uma imagem. 
                Existem diversos sistemas diferentes, falaremos mais sobre eles nos próximos tópicos, 
                apresentando apenas os três principais no momento, 
                sendo eles o <strong>RGB</strong>, o <strong>CMKY</strong> e o sistema <strong>Pantone</strong>. 
                Você já ouviu falar de algum deles?
            </p>
            <div class="color-modes__painel">
                <div class="painel__buttons">
                    <div class="buttons__rgb" mode-index="0" @click=${this._changeColorMode}>RGB</div>
                    <div class="buttons__cmyk" mode-index="1" @click=${this._changeColorMode}>CMYK</div>
                    <div class="buttons__pantone" mode-index="2" @click=${this._changeColorMode}>Sistema Pantone</div>
                </div>
                ${this._renderInfo()}
            </div>
        </div>
        `;

    }


}

declare global{

   interface HTMLElementTagNameMap{

    'color-modes': ColorModes

   }
}