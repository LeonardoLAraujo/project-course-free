import {LitElement, html, css, TemplateResult, CSSResult, PropertyValues} from 'lit';
import { customElement, queryAll, state } from 'lit/decorators.js';
import { IconTypes } from 'ecv-component';
import "../components/course-button-back";
import "../components/course-button";
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
            .content__edition,
            .icons__container,
            .edition__container,
            .edition__introduction,
            .edition__icons{
                display: flex;
            }

            .possibility,
            .header__introduction,
            .possibility__menu,
            .icons__container,
            .edition__container,
            .edition__introduction{
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

            .edition__container{
                gap: 48px;
            }

            .content__edition{
                width: calc(100% - 23px);
                align-items: center;
                gap: 50px;
            }

            .content__edition img{
                width: 256px;
                height: 469px;
                object-fit: cover;
                -webkit-user-drag: none;
            }

            .content__edition p{
                color: #fff;
                width: 95%;
            }

            .edition__icons{
                gap: 2rem;
            }

            .edition__introduction{
                gap: 35px;
            }

            .introduction__title{
                font-size: 30px;
                font-weight: 700;
            }

            .icons__container{
                align-items: center;
                justify-content: center;
                gap: 8px;
            }

            .content__edition .introduction__text{
                width: 81%;
            }

            .icons__container p{
                width: fit-content;
                font-weight: 700;
            }

            course-button{
                align-self: center;
                margin: 1rem 0rem;
            }
        `;
    }   

    @state()
    private _currentTemplateResult!: TemplateResult;

    @queryAll(".menu__icon")
    private _listMenuIcon!: NodeListOf<HTMLDivElement>;

    protected override firstUpdated(_changedProperties: PropertyValues): void {
        this._currentTemplateResult = this._generateEditionImage();
    }

    private _generateIconContainer(icon: IconTypes, text: string){
        return html`
            <div class="icons__container">
                <ecv-icon .icon=${icon} .iconStyle=${{color: "#fff", size: "80px"}}></ecv-icon>
                <p>${text}</p>
            </div>
        `;
    }

    private _generateEditionImage(): TemplateResult{
        return html`
            <div class="edition__container">
                <div class="edition__introduction">
                    <p class="introduction__title">Edição de Imagens</p>
                    <p>Quando você pensa em edição de imagem, qual a primeira coisa que vem à mente? Podemos considerar o que fazemos nas redes sociais antes de postar as fotos, onde cortamos e viramos as imagens, como edições? Sim! Fazer cortes, girar, remover ou adicionar objetos em uma foto ou ajustar as cores, todas estas coisas são consideradas edições de uma imagem.</p>
                </div>
                <div class="edition__icons">
                    ${this._generateIconContainer("arrows_output" as IconTypes, "REDIMENCIONAR")}
                    ${this._generateIconContainer("ink_selection" as IconTypes, "SELECIONAR")}
                    ${this._generateIconContainer("brush" as IconTypes, "RETOCAR")}
                    ${this._generateIconContainer("save" as IconTypes, "SALVAR")}
                </div>
            </div>
        `;
    }

    private _generateTreatmentImage(): TemplateResult{
        return html`
            <div class="edition__container">
                <div class="edition__introduction">
                    <p class="introduction__title">Tratamento de Imagens</p>
                    <p class="introduction__text">Como o próprio nome indica, faremos um processo de recuperação da imagem. Tratar uma imagem refere-se a torná-la o mais semelhante possível de quando foi tirada. Aquela fotografia antiga, gasta pelo tempo, com as cores amareladas, marcas de dobras e pequenas avarias. No Photoshop é possível recuperar essas fotografias, retocar as cores e assim preservar a memória com mais qualidade de forma digital.</p>
                </div>
            </div>
        `;
    }

    private _generateManipulationImage(): TemplateResult{
        return html`
            <div class="edition__container">
                <div class="edition__introduction">
                    <p class="introduction__title">Manipulação de Imagens de Imagens</p>
                    <p class="introduction__text">Como o próprio nome também faz referência, manipular uma imagem consiste em gerar uma composição usando mais de uma imagem para gerar um resultado final que foge da realidade. Este é um recurso muito utilizado no mundo da Publicidade.</p>
                </div>
            </div>
        `;
    }

    private alterMenuCurrent(e: MouseEvent): void {
        const element = e.currentTarget as HTMLDivElement;

        this._listMenuIcon.forEach((menu: HTMLDivElement) => {
            menu.removeAttribute("actual"); 
        });

        element.setAttribute("actual", "");

        switch(element.getAttribute("templat")){
            case "edit":
                this._currentTemplateResult = this._generateEditionImage();
            break;
            case "treatment":
                this._currentTemplateResult = this._generateTreatmentImage();
            break;
            case "manipulation":
                this._currentTemplateResult = this._generateManipulationImage();
            break;
        }

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
                        <div class="menu__icon" actual="actual" templat="edit" @click=${(e: MouseEvent) => {this.alterMenuCurrent(e)}}>
                            <ecv-icon .icon=${"mop" as IconTypes} .iconStyle=${{size: "50px"}} ?filled=${true}></ecv-icon>
                        </div>
                        <div class="menu__icon" templat="treatment" @click=${(e: MouseEvent) => {this.alterMenuCurrent(e)}}>
                            <ecv-icon .icon=${"photo_camera" as IconTypes} .iconStyle=${{size: "50px"}} ?filled=${true}></ecv-icon>
                        </div>
                        <div class="menu__icon" templat="manipulation" @click=${(e: MouseEvent) => {this.alterMenuCurrent(e)}}>
                            <ecv-icon .icon=${"ink_pen" as IconTypes} .iconStyle=${{size: "50px"}} ?filled=${true}></ecv-icon>
                        </div>
                    </div>
                    <div class="content__edition">
                        <img src=${IMAGE_EDITION}>
                        ${this._currentTemplateResult}
                    </div>
                </div>
                <course-button></course-button>
            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'course-possibility': CousePossibility
    }
}