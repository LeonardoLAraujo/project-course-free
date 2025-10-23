import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('course-button')
export default class CourseButton extends LitElement{

    static override get styles(): CSSResult{
        return css`
            button{
                background-color: #FF4101;
                color: #fff;
                font-size: 20px;
                font-weight: 700;
                border: none;
                width: 168px;
                height: 39px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
                box-shadow: 0px 4px 4px 0px #00000040;
                font-family: RobotoRegular;
            }
            
            button:hover{
                background-color: #ad2e04;
            }
        `;
    }

    @property({attribute: false})
    onPressed: Function = () => {};

    protected override render(): TemplateResult{
        return html`
            <button>Avançar</button>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'course-button': CourseButton
    }
}