import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, state } from 'lit/decorators.js';
import DIVISOR_REFERENCE from "../images/divisor_reference.png";

@customElement('course-reference')
export default class CouseReference extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .reference{
                width: 100%;
                height: 100%;
                background-color: #031B30;
                display: flex;
                flex-direction: column;
                position: relative;
            }

            h1, p{
                margin: 0;
            }

            .reference img{
                position: absolute;
                width: 100%;
                -webkit-user-drag: none;
            }
            
            .reference__rectangle,
            .reference img{
                top: 40px;
            }

            h1{
                color: #fff;
                font-size: 48px;
                font-weight: bold;
                width: fit-content;
                margin: 9rem 0rem 3rem 5rem;
            }

            .reference__text{
                display: flex;
                flex-direction: column;
                color: #fff;
                gap: 10px;
                align-items: center;
            }

            .reference__text p{
                width: 80%;
            }

            .reference__text a {
                color: #FF4101;
            }

            .reference__rectangle{
                width: 236px;
                height: 37px;
                background-color: #FF4101;
                position: absolute;
                right: 0;
            }
        `;
    }

    @state()
    private _listReferences: Array<string | TemplateResult> = [
        html`MASSACHUSETTS INSTITUTE OF TECHNOLOGY (Estados Unidos da América). In the blink of an eye. Disponível em: <<a href="http://news.mit.edu/2014/in-the-blink-of-an-eye-0116" target="_blank">http://news.mit.edu/2014/in-the-blink-of-an-eye-0116</a>>. Acesso em: 10 jan. 2020.`,
        html`LEWGOY, Júlia. Pantone divulga qual será a cor de 2019. Exame Abril. São Paulo, p. 1-1. 10 dez. 2018. Disponível em: <<a href="https://exame.com/casual/pantone-divulga-qual-sera-a-cor-de-2019/" target="_blank">https://exame.com/casual/pantone-divulga-qual-sera-a-cor-de-2019/</a>>. Acesso em: 12 jan. 2020.`,
        "RAIMES, Jonathan et BHASKARAN, Lakshmi. Design retrô: 100 anos de design gráfico. Trad. Cláudio Carina. São Paulo: Editora Senac São Paulo, 2007.",
        "FERNANDES, Amaury. Fundamentos da produção gráfica. Rio de Janeiro: Livraria Rubio, 2003. BANKS, Tom Fraser Adam. O guia completo da cor. Trad. Renata Botini. São Paulo: Senac São Paulo, 2007."
    ];

    private _genereteReferences(): Array<TemplateResult> {
        return this._listReferences.map((reference: string | TemplateResult) => html`<p>${reference}</p>`)
    }

    protected override render(): TemplateResult{
        return html`
            <div class="reference">
                <h1>Referências</h1>
                <img src=${DIVISOR_REFERENCE}>
                <div class="reference__rectangle"></div>
                <div class="reference__text">
                    ${this._genereteReferences()}
                </div>
            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'course-reference': CouseReference
    }
}