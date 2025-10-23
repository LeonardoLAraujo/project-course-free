import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';
import "ecv-component";
import { FontWeight, IconTypes } from 'ecv-component';
import FreeCourse from '../free-course';

@customElement('course-button-back')
export default class CourseButtonBack extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .buttonBack{
                width: fit-content;
                padding: 0.2rem;
                border-radius: 50%;
                border: 3px solid #000;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
            }

            .buttonBack:hover{
                opacity: 0.8;
            }
        `;
    }

    protected override render(): TemplateResult{
        return html`
            <div class="buttonBack" @click=${() => {FreeCourse.instance.slideBack()}}>
                <ecv-icon .icon=${IconTypes.ArrowBack} .iconStyle=${{size: "25px", weight: FontWeight.Bold}}></ecv-icon>
            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'course-button-back': CourseButtonBack
    }
}