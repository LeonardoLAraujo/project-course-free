import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CardCerebro } from '../pages/course-cerebro';

@customElement('course-card-cerebro')
export default class CourseCardCerebro extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .card{
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 108px;
                height: 135px;
                background-color: #031B30;
                color: #818d97;
                padding: 1rem;
                box-shadow: 0px 4px 4px 0px #00000040;
            }

            .card__title{
                color: #df3c08;
            }

            p{
                margin: 0;
                text-align: center;
            }
        `;
    }

    @property({attribute: false})
    card!: CardCerebro;

    protected override render(): TemplateResult{
        return html`
            <div class="card">
                <p class="card__title">${this.card.title}</p>
                <p>${this.card.text}</p>
            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'course-card-cerebro': CourseCardCerebro
    }
}