import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';
import IMAGE_CEREBRO from "../images/cerebro.png";
import IMAGE_LIGHT from "../images/light.png";
import "../components/course-button";
import "../components/course-button-back";
import FreeCourse from '../free-course';

@customElement('course-cerebro')
export default class NomeClass extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .cerebro{
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                gap: 5rem;
                padding: 1rem;
                position: relative;
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

            .cerebro__header{
                display: flex;
            }

            .header__introduction{
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }

            .cerebro__image{
                width: 443px;
                align-self: center;
            }

            course-button{
                align-self: center;
            }

            .cerebro__light{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 58px;
                height: 58px;
                background-color: #031B30;
                border-radius: 50%;
                position: absolute;
                bottom: 47px;
                right: 23px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
            }

            .cerebro__light:hover{
                opacity: 0.8;
            }
        `;
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
                <img src=${IMAGE_CEREBRO} class="cerebro__image">
                <course-button></course-button>
                <div class="cerebro__light">
                    <img src=${IMAGE_LIGHT}>
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