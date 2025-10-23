import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';
import './step-screen/step-screen';
import "./pages/course-home";

@customElement('free-course')
export default class FreeCourse extends LitElement{

    static override get styles(): CSSResult{
        return css`
        
            :host{
                display: block;
                width: 895px;
                height: 700px;
            }

            .free-course{
                width: 100%;
                height: 100%;
                border: 1px solid black;
            }
        `;
    }

    protected override render(): TemplateResult{
        return html`
            <div class="free-course">
                <course-home></course-home>
            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'course-free': FreeCourse
    }
}