import {LitElement, html, css, TemplateResult, CSSResult, PropertyValues} from 'lit';
import { customElement, query } from 'lit/decorators.js';
import brainOriginalImage from '../../images/brain_original.png';
import brainEffectImage from '../../images/brain_with_effect.png';
import { IconTypes } from 'ecv-component';

@customElement('interactive-object')
export default class InteractiveObject extends LitElement{


    static override get styles(): CSSResult{

        return css`

            .interactive-object{
                width: 895px;
                height: 700px;
                position: relative;
            }

            .interactive-object > * {
                position: absolute;
            }

            .interactive-object__courseLabel{
                font-family: RobotoRegular;
                font-size: 16px;
                border-bottom: 1px solid black;
                width: fit-content;
            }

            .interactive-object__courseLabel

            .courseLabel__text{
                margin: 16px 0 10px 20px;
            }

            .courseLabel__text strong{
                font-family: RobotoBlackItalic;
            }

            .interactive-object__title{
                top: 16px;
                left: 500px;
                font-size: 40px;
                font-family: RobotoRegular;
            }

            .interactive-object__title strong{
                font-family: RobotoBlackItalic;
            }

            .interactive-object__dragArea{
                width: 760px;
                height: 500px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .interactive-object img {
                width: 760px;
                height: 500px;
                position: absolute;
                -webkit-user-drag: none;
            }

            .interactive-object__brainOriginal{
                clip-path: polygon(0 0, 50% 0, 50% 100%, 0% 100%);
            }

            .dragArea__thumb{
                position: absolute;
                width: fit-content;
                color: white;
                top: 50%;
                display: flex;
                justify-content: center;
                column-gap: 10px;
                cursor: pointer;
            }

            .thumb__back{
                transform: scaleX(-1);
                pointer-events: none;
            }

            .thumb__forward{
                pointer-events: none;
            }

            .thumb__button{
                background-color: white;
                height: 30px;
                width: 10px;
            }

            .interactive-object__instructions{
                border: 1px solid black;
                background-color: #f7f7e7;
                max-width: 450px;
                text-align: center;
                bottom: 62px;
                left: 220px;
            }

            course-button{
                bottom: 10px;
                left: calc(50% - 84px);
            }
        
        `;

    }

    @query('.interactive-object__dragArea')
    private _dragArea!: HTMLDivElement;

    @query('.dragArea__thumb')
    private _dragAreaThumb!: HTMLDivElement;

    @query('.interactive-object__brainOriginal')
    private _brainOriginalImage!: HTMLImageElement;

    private _allowDrag: boolean = false;

    protected override firstUpdated(_changedProperties: PropertyValues): void {

        this._dragAreaThumb.style.left = `calc(50% - 39px)`;
        this._dragArea.addEventListener('mousemove', this._moveObjectInArea.bind(this));
        this._dragArea.addEventListener('mouseup', this._releaseOnThumb.bind(this));
        this._dragAreaThumb.addEventListener('mousedown', this._pressOnThumb.bind(this));
        
    }

    private _moveObjectInArea(event: MouseEvent): void {
        if (!this._allowDrag) return;
            let updatedWidthValue = event.offsetX - 39;
            let widthValueInPercentage = (event.offsetX / (event.target as HTMLDivElement).offsetWidth) * 100;
            this._dragAreaThumb.style.left = `${updatedWidthValue}px`;
            this._brainOriginalImage.style.clipPath = `polygon(0 0, ${widthValueInPercentage}% 0, ${widthValueInPercentage}% 100%, 0% 100%)`;
            this._dragArea.style.cursor = 'grabbing';
    }

    private _releaseOnThumb(): void {
        this._allowDrag = false;
        this._dragAreaThumb.style.pointerEvents = 'initial';
        this._dragArea.style.cursor = 'pointer';
    }

    private _pressOnThumb(): void {
        this._allowDrag = true;
        this._dragAreaThumb.style.pointerEvents = 'none';
    }


    protected override render(): TemplateResult{

        return html`
            <div class="interactive-object">
                <div class="interactive-object__courseLabel">
                    <p class="courseLabel__text">Curso Livre - <strong>Photoshop</strong></p>
                </div>
                <h1 class="interactive-object__title">Objeto <strong>Interativo 1</strong></h1>
                <div class="interactive-object__dragArea">
                    <img class="interactive-object__brainEffect" src=${brainEffectImage}>
                    <img class="interactive-object__brainOriginal" src=${brainOriginalImage}>
                    <div class="dragArea__thumb">
                        <ecv-icon class="thumb__back" .icon=${IconTypes.ArrowForwardIoS}></ecv-icon>
                        <div class="thumb__button"></div>
                        <ecv-icon class="thumb__forward" .icon=${IconTypes.ArrowForwardIoS}></ecv-icon>
                    </div>
                </div>
                <div class="interactive-object__instructions">
                    <p>Arrate o botão para a esquerda ou para a direita para ver a diferença entre <strong>"Sem Efeito"</strong> e <strong>"Com Efeito"</strong></p>
                </div>
                <course-button></course-button>
            </div>
        `;

    }

}

declare global{

   interface HTMLElementTagNameMap{

    'interactive-object': InteractiveObject

   }
}