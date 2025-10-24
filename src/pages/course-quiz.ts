import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';
import QUIZ from "../images/quiz.png";
import "../components/course-button";

@customElement('course-quiz')
export default class CourseQuiz extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .quiz{
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                display: flex;
                align-items: flex-end;
                justify-content: center;
            }

            course-button{
                margin-bottom: 4rem;
            }
        `;
    }

    protected override render(): TemplateResult{
        return html`
            <style>
                .quiz{
                    background-image: url(${QUIZ});
                }
            </style>
            <div class="quiz">
                <course-button></course-button>
            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'course-quiz': CourseQuiz
    }
}