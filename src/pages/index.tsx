import Link from 'next/link';
import { AcessibilityScroll } from '../components/AccessibilityScroll';
import { Button } from '../components/Button';
import styles from './home.module.scss';

export default function Home() {
  return (
    <>
      <AcessibilityScroll onlyDevices />
      <main>
        <section id="top" className={styles.mainBackground}>
          <div className={styles.contentBackground}>
            <header>
              <div>
                <Link href="/">
                  <a>
                    <img src="/assets/logo.svg" alt="Currículo na Mão" />
                  </a>
                </Link>
              </div>
              <div>
                <div>
                  <button className={styles.iconButton}>
                    <img src="/assets/text-icon-plus.svg" alt="Aumentar Textos" />
                  </button>
                  <button className={styles.iconButton}>
                    <img src="/assets/text-icon.svg" alt="Textos em tamanho padrão" />
                  </button>
                  <button className={styles.iconButton}>
                    <img src="/assets/text-icon-less.svg" alt="Diminuir Textos" />
                  </button>
                  <button className={styles.iconButton}>
                    <img src="/assets/contrast.svg" alt="Contraste" />
                  </button>
                </div>
                <nav>
                  <Link href="/account/create"><a>CRIAR CONTA</a></Link>
                  <Link href="/account"><a>ENTRAR</a></Link>
                </nav>
              </div>
            </header>
            <div className={styles.createAccount}>
              <h1>Crie seu currículo de forma fácil, acessível e gratuita!</h1>
              <p>Preencha suas informações de modo prático e gere seu currículo no modelo de sua escolha.</p>
              <div>
                <Link href="/account"><a>CRIAR MEU CURRÍCULO</a></Link>
                <Link href="#cards">
                  <a>
                    <img src="/assets/arrow-down.svg" alt="" />
                    <small>Saiba Mais</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.cardSection} id="cards">
          <div className={styles.cardBackground}>
            <div className={styles.cardHeader}>
              <h3>É muita praticidade</h3>
              <div>
                <div></div>
                <p>Com os nossos três principais objetivos reunidos buscamos proporcionar uma boa experiência para você. </p>
              </div>
            </div>

            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <div>
                  <img src="/assets/smile.svg" alt="Ícone de sorriso" />
                  <h4>Acessível</h4>
                </div>
                <p>
                  Apenas <strong>0,74%</strong> dos sites brasileiros são acessíveis a pessoas com deficiência. Aqui, a prioridade é a acessibilidade para todo mundo.
                </p>
              </div>
              <div className={styles.card}>
                <div>
                  <img src="/assets/protect.svg" alt="Ícone de aprovado" />
                  <h4>Rápido</h4>
                </div>
                <p>
                  De maneira dinâmica e interativa, alguns cliques e respostas vão produzir automaticamente seu currículo.
                </p>
              </div>
              <div className={styles.card}>
                <div>
                  <img src="/assets/pizza.svg" alt="Ícone de gráfico" />
                  <h4>Inovador</h4>
                </div>
                <p>
                  A diversidade de ferramentas e possibilidades para ajudar sua necessidade é ampla!
                </p>
              </div>
            </div>
          </div>
          <div className={styles.line} />
        </section>
        <section className={styles.aboutContent}>
          <div>
            <h3>Quem somos?</h3>
            <div>
              <img src="/assets/group.png" alt="Ícone de gráfico" />
              <p>
                O Currículo na Mão é um projeto de pesquisa e inovação contemplado pelo Edital N°18 do Programa Institucional de Bolsas de Iniciação Científica para o Ensino Médio com a Pró Reitoria de Ensino do IFRN. Nossos membros são Damião Victor, Liriel Felix e Iago Nobre, estudantes do IFRN - Campus Parnamirim. Quanto a servidores, temos a Professora Glenda Michele, a Intérprete de Libras Rayanna Evellin e o Professor Bruno Emerson, sendo este último o coordenador do projeto.
                <br />
                <br />
                A ideia do Currículo na Mão é criar uma plataforma capaz de montar currículos de maneira descomplicada, interativa e automática para todos. Mas, além disso, respeitando os princípios de acessibilidade e inclusão nessa atividade, principalmente a pessoas surdas e cegas. Acreditamos, também, no poder do currículo como trampolim para a entrada no mundo do trabalho. Assim, ao incluir pessoas com deficiência (PCDs) nesse processos, temos uma chance de resistir à marginalização constante sofrida por esse grupo.
                <br />
                <br />
                Cumprindo essas metas, pretendemos também contribuir para a pesquisa, estudando nossos resultados com a plataforma, aprimorando-a ao máximo e compartilhando os ensinamentos de inclusão, atentando, como finalidade, fazer uma mudança no mundo de trabalho e científico para PCDs.
              </p>
            </div>
          </div>
          <div className={styles.line} />
        </section>
        <section className={styles.recapContainer}>
          <div>
            <img src="/assets/curriculos.png" alt="" />
            <div>
              <h3>Você está a um clique do mundo do trabalho</h3>
              <button>CRIAR MEU CURRÍCULO</button>
            </div>
          </div>
        </section>
      </main >
      <footer className={styles.footerContainer}>
        <div className={styles.footerNavigation}>
          <Link href="/">
            <a>
              <img src="/assets/logo.svg" alt="Currículo na Mão" />
            </a>
          </Link>

          <nav>
            <Link href="/"><a>Instagram</a></Link>
            <Link href="/privacy"><a>Política de Privacidade</a></Link>
          </nav>

          <Link href="/">
            <a className={styles.buttonUp}>
              <img src="/assets/arrow-up.svg" alt="" />
            </a>
          </Link>

        </div>
        <div className={styles.lineBlue}></div>
        <div>
          <p>Instituto Federal do Rio Grande do Norte</p>
          <p>Todos os direitos reservados ®</p>
        </div>
      </footer>
    </>
  )
}
