import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('course-free')
export default class CourseFree extends LitElement{

    static override get styles(): CSSResult{
        return css``;
    }

    protected override render(): TemplateResult{
        return html`
            <h1>Curso Livre</h1>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'course-free': CourseFree
    }
}