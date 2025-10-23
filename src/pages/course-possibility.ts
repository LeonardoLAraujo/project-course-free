import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';
import { IconTypes } from 'ecv-component';
import "../components/course-button-back";
import IMAGE_EDITION from "../images/edition.png";

@customElement('course-possibility')
export default class CousePossibility extends LitElement{

    static override get styles(): CSSResult{
        return css`
            p,
            h1{
                margin: 0;
                color: #031B30;
            }

            h1{
                font-size: 32px;
                font-weight: 700;
            }

            p{
                font-size: 16px;
                font-weight: 400;
            }

            .possibility__header,
            .possibility,
            .header__introduction,
            .menu__icon,
            .possibility__menu,
            .possibility__content,
            .content__edition{
                display: flex;
            }

            .possibility,
            .header__introduction,
            .possibility__menu{
                flex-direction: column;
            }

            .possibility{
                width: 100%;
                height: 100%;
            }

            .header__introduction{
                width: 100%;    
                align-items: center;
                text-align: center;
                gap: 10px;
                margin: 1rem 0rem;
            }   

            .header__introduction p{
                width: 740px;
            }

            ecv-icon{
                width: fit-content;
            }

            course-button-back{
                margin: 10px;
                height: max-content;
            }

            .possibility__menu{
                height: 100%;
            }

            .menu__icon{
                width: 78px;
                height: 100%;
                justify-content: center;
                align-items: center;
                background-color: #042745;
                box-shadow: 0px 4px 4px 0px #00000040;
                border-top: 1px solid #fff;
                cursor: pointer;
                color: #fff;
                transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
            }

            .menu__icon:first-child{
                border-top: none;
            }

            .menu__icon:hover{
                color: #FF4101;
                background-color: #031B30;
            }

            .menu__icon[actual]{
                color: #FF4101;
                background-color: #031B30;
            }

            .possibility__content{
                width: 100%;
                height: 100%;
                background-color: #031B30;
                gap: 10px;
            }

            .content__edition{
                align-items: center;
                gap: 10px;
            }

            .content__edition img{
                width: 256px;
                height: 469px;
                object-fit: cover;
            }
        `;
    }

    private _generateEditionImage(): TemplateResult{
        return html`
            <div class="content__edition">
                <img src=${IMAGE_EDITION}>
                <div class="edition__introduction">

                </div>
            </div>
        `;
    }

    protected override render(): TemplateResult{
        return html`
            <div class="possibility">
                <div class="possibility__header">
                    <course-button-back></course-button-back>
                    <div class="header__introduction">
                        <h1>Possibilidades</h1>
                        <p>Uma vez que você já sabe que imagens são importantes, logo vem à mente a pergunta: o que posso fazer com imagens no Adobe Photoshop? O programa oferece infinitas possibilidades, mas podemos separar em três vertentes principais: edição, tratamento e manipulação de imagens. </p>
                    </div>
                </div>
                <div class="possibility__content">
                    <div class="possibility__menu">
                        <div class="menu__icon" actual>
                            <ecv-icon .icon=${"mop" as IconTypes} .iconStyle=${{size: "50px"}} ?filled=${true}></ecv-icon>
                        </div>
                        <div class="menu__icon">
                            <ecv-icon .icon=${"photo_camera" as IconTypes} .iconStyle=${{size: "50px"}} ?filled=${true}></ecv-icon>
                        </div>
                        <div class="menu__icon">
                            <ecv-icon .icon=${"ink_pen" as IconTypes} .iconStyle=${{size: "50px"}} ?filled=${true}></ecv-icon>
                        </div>
                    </div>
                    ${this._generateEditionImage()}
                </div>
            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'course-possibility': CousePossibility
    }
}