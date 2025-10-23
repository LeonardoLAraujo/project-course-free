import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, query } from 'lit/decorators.js';
import IMAGE_CEREBRO from "../images/cerebro.png";
import IMAGE_LIGHT from "../images/light.png";
import "../components/course-button";
import "../components/course-button-back";
import "../components/course-card-cerebro";
import { FontWeight, IconTypes } from 'ecv-component';
import FreeCourse from '../free-course';

export type CardCerebro = {
    title: string,
    text: string
}

const CARDS: CardCerebro[] = [
    {title: "40% das pessoas", text: "respondem melhor a estímulos visuais."},
    {title: "50% da sua atividade cerebral", text: " é atividade durante o processo visual."},
    {title: "70% dos seus sensores ", text: "receptivos estão nos olhos."},
    {title: "90% das informações", text: "transmitidas para o  cérebro são visuais."},
];

@customElement('course-cerebro')
export default class NomeClass extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .cerebro{
                width: 100%;
                height: 100%;
                padding: 1rem;
                position: relative;
            }

            .cerebro,
            .header__introduction,
            .cerebro__header,
            .cerebro__light,
            .cerebro__cards,
            .content__introduction,
            .curiosities__close,
            .content__curiosities,
            .cerebro__content,
            .curiosities__information,
            .information__light,
            .information__text,
            .information__link,
            .cerebro__icon{
                display: flex;
            }

            .cerebro,
            .header__introduction,
            .content__introduction,
            .content__curiosities,
            .curiosities__information,
            .information__light,
            .information__text{
                flex-direction: column;
            }

            .header__introduction,
            .cerebro__light,
            .curiosities__close,
            .curiosities__information,
            .cerebro__icon{
                align-items: center;
                justify-content: center;
            }

            .content__introduction{
                width: 100%;
                transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
            }

            h1, p{
                margin: 0;
                font-weight: bold;
                text-align: center;
            }

            h1{
                font-size: 32px;
            }

            p{
                font-size: 20px;
            }

            .header__introduction{
                width: 100%;
                gap: 0.5rem;
            }

            .cerebro__image{
                width: 423px;
                align-self: center;
                margin: 0.7rem 0rem;
            }

            course-button{
                align-self: center;
                margin-top: 0.5rem;
            }

            .cerebro__light{
                width: 58px;
                height: 58px;
                background-color: #031B30;
                border-radius: 50%;
                position: absolute;
                bottom: 47px;
                right: 23px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
                box-shadow: 0px 4px 4px 0px #00000040;
            }

            .cerebro__light:hover{
                opacity: 0.8;
            }

            .cerebro__cards{
                gap: 10px;
                justify-content: center;
                display: none;
            }

            .cerebro__content{
                height: 100%;
                gap: 9px;
            }

            .content__curiosities{
                display: none;
                padding: 1rem;
                height: calc(100% - 32px - 32px);
                background-color: #031B30;
                position: relative;
                margin-top: 2rem;
            }

            .curiosities__close{
                width: 30.75px;
                height: 30.75px;
                border-radius: 50%;
                background-color: #fff;
                position: absolute;
                right: 10px;
                cursor: pointer;
                box-shadow: 0px 4px 4px 0px #00000040;
                transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
            }

            .curiosities__close:hover{
                opacity: 0.7;
            }

            .curiosities__information{
                width: 100%;
                height: calc(100% - 48px);
                gap: 48px;
            }

            .information__light{
                align-items: center;
                gap: 8px;
            }

            .information__light p{
                color: #FF4101;
                font-size: 24px;
                font-weight: 700;
            }

            .information__light img{
                width: 64px;
            }

            .information__text{
                align-items: center;
                gap: 30px;
                color: #717f8a;
            }

            .information__text p{
                font-size: 16px;
            }

            .text__question{
                color: #fff;
                font-weight: 700;
            }

            .information__link{
                align-items: center;
                gap: 4px;
                color: #FF4101;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
            }

            .information__link p{
                font-size: 16px;
                text-decoration: underline;
            }

            .information__link:hover{
                color: #ad2e04;
            }

            .introduction__cerebro{
                margin-top: 0.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .introductionCerebroOpenCards{
                margin-bottom: -5rem;
            }

            .introduction__cerebro div{
                position: relative;
            }

            .cerebro__icon{
                width: 75.86px;
                height: 75.86px;
                border-radius: 50%;
                background-color: #031B30;
                cursor: pointer;
                position: absolute;
                left: 34px;
                top: -179px;
                transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
            }   

            .cerebro__icon:hover{
                background-color: #0b4b83;
            }

            .openCard{
                display: flex;
            }

           @keyframes scale-in-right {
                0% {
                    -webkit-transform: scale(0);
                    transform: scale(0);
                    -webkit-transform-origin: 100% 50%;
                    transform-origin: 100% 50%;
                    opacity: 1;
                }
                100% {
                    -webkit-transform: scale(1);
                    transform: scale(1);
                    -webkit-transform-origin: 100% 50%;
                    transform-origin: 100% 50%;
                    opacity: 1;
                }
            }

            @keyframes scale-out-br {
                0% {
                    -webkit-transform: scale(1);
                    transform: scale(1);
                    -webkit-transform-origin: 100% 100%;
                    transform-origin: 100% 100%;
                    opacity: 1;
                }
                100% {
                    -webkit-transform: scale(0);
                    transform: scale(0);
                    -webkit-transform-origin: 100% 100%;
                    transform-origin: 100% 100%;
                    opacity: 1;
                }
            }

           @keyframes slide-in-top {
                0% {
                    -webkit-transform: translateY(-80px);
                    transform: translateY(-80px);
                    opacity: 0;
                }
                100% {
                    -webkit-transform: translateY(0);
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
    }

    @query(".content__curiosities")
    private _containerCuriosities!: HTMLDivElement;

    @query(".cerebro__cards")
    private _cerebro__cards!: HTMLDivElement;

    @query(".introduction__cerebro")
    private _introductionCerebro!: HTMLDivElement;

    private _generetaCerebro(): Array<TemplateResult> {
        return CARDS.map((card: CardCerebro) => html`<course-card-cerebro .card=${card}></course-card-cerebro>`);
    }       

    private _goToCuriosities(): void {
        window.open("https://veja.abril.com.br/ciencia/estudo-revela-como-cerebro-compacta-e-arquiva-imagens/", "_blank");
    }
    
    private _closeCuriosities(): void {
        this._containerCuriosities.style.animation = "scale-out-br 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both";

        setTimeout(() => {
            this._containerCuriosities.style.display = "none";
        }, 500)
    }

    private _openCuriosities(): void {
        this._containerCuriosities.style.display = "flex";
        this._containerCuriosities.style.animation = "scale-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
    }

    private _openCard(): void {
        this._cerebro__cards.style.animation = "slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
        this._cerebro__cards.classList.toggle("openCard");
        this._introductionCerebro.classList.toggle("introductionCerebroOpenCards");
    }

    protected override render(): TemplateResult{
        return html`
            <div class="cerebro">
                <div class="cerebro__header">
                    <course-button-back></course-button-back>
                    <div class="header__introduction">
                        <h1>Como Nosso Cérebro processa imagens?</h1>
                        <p>Imagens são processadas 60.000 vezes mais</p>
                    </div>
                </div>
                <div class="cerebro__content">
                    <div class="content__introduction">
                        <div class="introduction__cerebro">
                            <div>
                                <img src=${IMAGE_CEREBRO} class="cerebro__image">
                                <div class="cerebro__icon" @click=${this._openCard}>
                                    <ecv-icon .icon=${IconTypes.Add} .iconStyle=${{size: "60px", weight: FontWeight.Bold, color: "#fff"}}></ecv-icon>
                                </div>
                            </div>
                        </div>
                        <div class="cerebro__cards">
                            ${this._generetaCerebro()}
                        </div>
                        <course-button .onPressed=${() => {FreeCourse.instance.applyTransitionNext()}}></course-button>
                        <div class="cerebro__light" @click=${this._openCuriosities}>
                            <img src=${IMAGE_LIGHT}>
                        </div>
                    </div>
                    <div class="content__curiosities">
                        <div class="curiosities__close" @click=${this._closeCuriosities}>
                            <ecv-icon .icon=${IconTypes.Close} .iconStyle=${{weight: FontWeight.Bold}}></ecv-icon>
                        </div>
                        <div class="curiosities__information">
                            <div class="information__light">
                                <img src=${IMAGE_LIGHT}>
                                <p>Curiosidades</p>
                            </div>
                            <div class="information__text">
                                <p class="text__question">
                                    Quer saber mais sobre como o nosso cérebro processa as imagens?
                                </p>
                                <p>
                                    Confira o estudo disponível no site da Veja sobre o assunto.
                                </p>
                            </div>
                            <div class="information__link" @click=${this._goToCuriosities}>
                                <p>Clique aqui</p>
                                <ecv-icon .icon=${IconTypes.ArrowCircleRight}></ecv-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'course-cerebro': NomeClass
    }
}