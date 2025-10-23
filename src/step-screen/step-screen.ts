import { LitElement, html, css, TemplateResult, CSSResult } from "lit";
import { customElement, property} from "lit/decorators.js";

@customElement('step-screen')
class StepScreen extends LitElement {

    static override styles: CSSResult = css`
        :host{
            display: block;
            width: 100%;
            height: 100%;
        }
    `;

    @property({type: String})
    public color: string = 'white';

    

    public override render(): TemplateResult {
        
        return html`
            <style>

                :host{
                    background-color: ${this.color};
                }

            </style>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'free-course': StepScreen
    }
}