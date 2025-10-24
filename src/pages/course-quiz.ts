import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';
import QUIZ from "../images/quiz.png";
import "../components/course-button";
import "../components/course-button-back";

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
                position: relative;
            }

            course-button{
                margin-bottom: 4rem;
            }

            course-button-back{
                position: absolute;
                top: 10px;
                left: 10px;
                background-color: #fff;
                border-radius: 50%;
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
                <course-button-back></course-button-back>
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