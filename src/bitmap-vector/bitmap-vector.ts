import {html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';
import InitialConcept, { CollapsedButtonData } from '../initial-concept/initial-concept';
import psLogo from '../images/ps_logo.png';
import aiLogo from '../images/ai_logo.png';
import idLogo from '../images/id_logo.png';
import yellowDownArrow from '../images/yellow_dow_arrow.png';

@customElement('bitmap-vector')
export default class BitmapVector extends InitialConcept{


    static override get styles(): CSSResult{

        return css`

            .bitmap-vector{
                display: grid;
                grid-template-areas: 
                'left-side right-side'
                ;
                grid-template-columns: 316px 1fr;
                grid-template-rows: 1fr;
                position: relative;
                width: inherit;
            }

            course-button-back{
                position: absolute;
                left: 22px;
                top: 35px;
                grid-area: left-side;
            }

            .bitmap-vector__leftTitle{
                position: absolute;
                left: 114px;
                top: 10px;
                font-family: RobotoBold;
                font-size: 16px;
                max-width: 122px;
            }

            .bitmap-vector__yellowDownArrow{
                position: absolute;
                left: 237px;
                top: 57px;
            }

            .bitmap-vector__logoContainer{
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 94px;
                left: 19px;
                grid-area: left-side;
            }

            .bitmap-vector__rightTitle{
                font-family: RobotoBold;
                font-family: 20px;
                grid-area: right-side;
                left: 313px;
                top: 47px;
            }

            .bitmap-vector__rightText{
                font-family: RobotoRegular;
                font-size: 14px;
                grid-area: right-side;
                position: absolute;
                top: 80px;
                max-width: 532px;
            }

            .bitmap-vector__rightText strong{
                font-family: RobotoBold;
            }

            .bitmap-vector__collapsedButtonsContainer{
                grid-area: right-side;
                position: absolute;
                top: 242px;
            }

            course-collapsed-button{
                grid-area: right-side;
            }
        `;

    }

    protected override collapsedData: CollapsedButtonData[] = [
        {
            label: "Qual formato de imagem cada programa usa?",
            text: `O Photoshop trabalha preferencialmente com o formato bitmap, 
            o Illustrator com o formato vetorial e o InDesign lida bem com os dois formatos de arquivo.
            `
        },
        {
            label: "Se o InDesign funciona com os dois, porque devo aprender os três programas?",
            text: `Como mencionado anteriormente, 
            cada programa foi desenvolvido para realizar determinado tipo de tarefa com mais agilidade e precisão. 
            Tudo dependerá de qual é o objetivo do projeto a ser realizado. 
            Caso você precise editar uma imagem, nenhum outro programa será tão objetivo e completo quanto o Photoshop. 
            Precisa criar uma revista? É possível fazer isso no Illustrator, 
            porém o InDesign é muito mais equipado e leve para realizar a tarefa.
            `
        },
        {
            label: "Qual a diferença de bitmap para vetor?",
            text: html`
                <p>
                    A palavra bitmap vem dos termos em inglês bit e map, sendo assim, 
                    compreende-se que bitmap trata de um mapa de bits, também conhecidos como pixels. 
                    Todo aparelho que seja emissor de luz (celular, monitor de computador, tablet) 
                    trabalha com os pixels. Os pixels nada mais são do que pequenos pontos de luz 
                    que juntos compõem as imagens como as vemos. Se você pegar alguma imagem e aplicar 
                    o máximo possível de zoom, você verá diversos quadrados coloridos que a compõem.
                </p>
                <p>
                    Ao salvar uma imagem em bitmap, ou até mesmo no momento em que a fotografia é tirada,
                    definimos a quantidade de pixels que ela terá. Se por algum motivo houver a necessidade 
                    de ampliar para alguma finalidade, como um cartaz, perderemos a qualidade, 
                    tornando os quadrados aparentes e reduzindo a resolução.
                </p>
                <p>
                    Já o vetor funciona a base de cálculos matemáticos (curvas de bézier). 
                    Ao desenharmos, damos as coordenadas para o computador de como o desenho deve ser estruturado,
                    sendo assim, mesmo que o tamanho seja alterado, o programa recalcula os valores e redimensiona 
                    a arte preservando a resolução.
                </p> 
            `
        }
    ];

    protected override render(): TemplateResult{

        return html`
            <div class="bitmap-vector">
                <course-button-back></course-button-back>
                <h4 class="bitmap-vector__leftTitle">Aplicativos de Design da Adobe</h4>
                <img class="bitmap-vector__yellowDownArrow" src=${yellowDownArrow}>
                <div class="bitmap-vector__logoContainer">
                    <img src=${psLogo}>
                    <img src=${aiLogo}>
                    <img src=${idLogo}>
                </div>
                <h3 class="bitmap-vector__rightTitle">Bitmap e Vector</h3>
                <div class="bitmap-vector__rightText">
                    <p>Você já sabe que o <strong>Adobe Photoshop</strong> é um editor de imagens, 
                    mas com qual formato exato de imagem que ele trabalha? 
                    Qual a diferença para outros programas como o <strong>Adobe Illustrator</strong> e o <strong>Adobe InDesign</strong>? 
                    Cada programa tem a sua finalidade e funcionamento.</p>
                    <p>
                        O <strong>Adobe Illustrator</strong> trabalha com vetores, 
                        imagens formadas por cálculos matemáticos que podem ser redimensionadas 
                        sem perda de qualidade. Já o <strong>Adobe InDesign</strong> tem como principal função 
                        a criação de projetos editoriais como livros, catálogos e revistas.
                    </p>
                </div>
                <div class="bitmap-vector__collapsedButtonsContainer">
                    ${this.createCollapsedButtons()}
                </div>
            </div>
        `;

    }

}

declare global{

   interface HTMLElementTagNameMap{

    'bitmap-vector': BitmapVector

   }
}