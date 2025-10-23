import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('course-card-cerebro')
export default class CourseCardCerebro extends LitElement{

    static override get styles(): CSSResult{
        return css``;
    }

    protected override render(): TemplateResult{
        return html`
            <div>

            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'course-card-cerebro': CourseCardCerebro
    }
}