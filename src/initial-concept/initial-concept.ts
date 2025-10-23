import {html, css, TemplateResult, CSSResult, LitElement} from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('initial-concept')
export default class InitialConcept extends LitElement{


    static override get styles(): CSSResult{

        return css``;

    }

    protected override render(): TemplateResult{

        return html``;

    }
}

declare global{

   interface HTMLElementTagNameMap{

    'initial-concept': InitialConcept

   }
}