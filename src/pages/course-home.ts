import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';
import BACKGROUND_HOME from "../images/home.png";
import "../components/course-button";
import FreeCourse from '../free-course';

@customElement('course-home')
export default class CourseHome extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .home{
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
            }

            course-button{
                margin: 30px;
            }
        `;
    }

    protected override render(): TemplateResult{
        return html`
            <style>
                .home{
                    background-image: url(${BACKGROUND_HOME});
                }
            </style>
            <div class="home">
                <course-button .onPressed=${() => {FreeCourse.instance.slideFront()}}></course-button>
            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'course-home': CourseHome
    }
}