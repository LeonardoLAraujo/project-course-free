import {LitElement, html, css, TemplateResult, CSSResult, PropertyValues} from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import rgbModeImage from '../../images/rgb_mode.png';
import cmykModeImage from '../../images/cmyk_mode.png';
import pantoneModeImage from '../../images/pantone_mode.png';

type RenderData = {
    renderImage: string;
    renderLabelText: string;
    renderTitle: string;
    renderText: TemplateResult | string;
}

@customElement('color-modes')
export default class ColorModes extends LitElement{


    static override get styles(): CSSResult{

        return css`

            :host{
                -webkit-user-select: none;
                user-select: none;
                -webkit-user-drag: none;
            }

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
                top: 118px;
                max-width: 690px;
            }

            .color-modes__painel{
                position: relative;
                width: 819px;
                height: 410px;
                top: 204px;
                left: 38px;
                background-color: #031B30;
                color: white;
            }

            .painel__buttons{
                display: flex;
            }

            .painel__buttons > div{
                
                width: 273px;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0 4px 4px 0 #00000025;
                cursor: pointer;
                font-family: RobotoBold;
            }

            .painel__buttons > div:hover{
                background-color: #031B30!important;
            }

            .painel__buttons > div:not(.selected){
                background-color: #042745;
            }

            .painel__buttons > div.selected{
                background-color: #031B30;
            }

            .painel__info{
                position: relative;
                height: calc(100% - 60px);
            }

            .painel__info > *{
                position: absolute;
            }

            .info__image{
                -webkit-user-drag: none;
            }

            .info__label{
                top: 270px;
                left: 91px;
                font-family: Robotobold;
                font-size: 16px;
            }

            .info__title{
                left: 350px;
                top: 20px;
                font-family: RobotoBold;
                font-size: 24px;
            }

            .info__text{
                left: 350px;
                top: 70px;
                max-width: 429px;
                font-size: 14px;
            }

            course-button{
                position: absolute;
                top: 635px;
                left: 364px;
            }

            .fadeTransition{
                animation-name: fade;
                animation-duration: 1s;
                animation-fill-mode: forwards;
                animation-timing-function: ease-out;
            }

            @keyframes fade {
                0% {
                    opacity: 1;
                }

                50%{
                    opacity: 0;
                }

                100%{
                    opacity: 1;
                }
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
            renderText: html`
                <p>
                    Pantone é uma empresa especializada na produção de tintas padronizadas para impressos em geral. 
                    A chamada escala Pantone é o sistema desenvolvido por eles em que as cores oferecidas são produzidas 
                    sempre com a mesma precisão (combinação perfeitamente calculada entre os pigmentos), garantindo 
                    que os tons sejam sempre iguais.
                </p>
                <p>
                    Empresas de grande porte que precisam padronizar as suas cores utilizam deste padrão, 
                    por ser mais exato que o sistema CMKY que apresenta considerável variação de tom em 
                    cada impressão/impressora.
                </p>
            `
        }
    ];

    @state()
    private _currentRenderData!: RenderData;

    @query('.painel__info')
    private _painelInfo!: HTMLDivElement;

    protected override firstUpdated(_changedProperties: PropertyValues): void {
        
        this._currentRenderData = this._renderDataModes[0];

        this._painelInfo.addEventListener('animationend', () => {
            this._painelInfo.className = 'painel__info';
        });
    }

    private _renderInfo(): TemplateResult {

        return html`
            <div class="painel__info">
                <img class="info__image" src=${this._currentRenderData?.renderImage}>
                <p class="info__label">${this._currentRenderData?.renderLabelText}</p>
                <h2 class="info__title">${this._currentRenderData?.renderTitle}</h2>
                <p class="info__text">${this._currentRenderData?.renderText}</p>
            </div>
        `;
    }

    private _changeColorMode(event: Event): void{
        const currentButton = (event.target as HTMLDivElement)
        const index = parseInt(currentButton.getAttribute("mode-index") as string);
        const painelButtons = this.shadowRoot?.querySelectorAll<HTMLDivElement>('.painel__buttons > div');
        const UPDATE_DATA_DELAY: number = 400;

        if (currentButton.classList.contains('selected')){
            return;
        }

        this._painelInfo.className = 'painel__info fadeTransition';

        setTimeout(() => {
            this._currentRenderData = this._renderDataModes[index];
        }, UPDATE_DATA_DELAY);

        painelButtons?.forEach(button => {
            if (button.classList.contains('selected')){
                button.classList.remove('selected');
            }
        });

        if (!currentButton.classList.contains('selected')){
            currentButton.classList.add('selected');
        }

    }

    protected override render(): TemplateResult{

        const imageTopPosition = this._currentRenderData?.renderTitle === 'RGB' ? '0' :
        this._currentRenderData?.renderTitle === 'CMYK' ? '30' : '86';
        
        const imageLeftPosition = this._currentRenderData?.renderTitle === 'RGB' ? '0' :
        this._currentRenderData?.renderTitle === 'CMYK' ? '30' : '0';

        return html`
        <style>

            .info__image{
                top: ${imageTopPosition}px;
                left: ${imageLeftPosition}px;
            }

        </style>
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
                    <div class="buttons__rgb selected" mode-index="0" @click=${this._changeColorMode}>RGB</div>
                    <div class="buttons__cmyk" mode-index="1" @click=${this._changeColorMode}>CMYK</div>
                    <div class="buttons__pantone" mode-index="2" @click=${this._changeColorMode}>Sistema Pantone</div>
                </div>
                ${this._renderInfo()}
            </div>
            <course-button></course-button>
        </div>
        `;

    }

}

declare global{

   interface HTMLElementTagNameMap{

    'color-modes': ColorModes

   }
}